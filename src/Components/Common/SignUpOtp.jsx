import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticated } from '../../helpers/auth'
import Logo from '../../assets/logoGreenbuilt.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signUpBusiness } from '../../store/actions/user'
// Firebase Imports
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../helpers/firebase'
import { ConfirmationResult } from 'firebase/auth'

const SignUpOtp = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const navigate = useNavigate()

	const [form, setForm] = useState(1)

	useEffect(() => {
		if (authenticated) {
			if (user?.role === 2) {
				navigate('/business/dashboard')
			}
			if (user?.role === 3) {
				navigate('/admin/dashboard')
			}
		} else {
			navigate('/')
		}
	}, [user])

	function setUpRecaptha(number) {
		const recaptchaVerifier = new RecaptchaVerifier(
			'recaptcha-container',
			{},
			auth
		)
		recaptchaVerifier.render()
		return signInWithPhoneNumber(auth, number, recaptchaVerifier)
	}

	const getOTP = async (name, phoneNumber) => {
		console.log(name, phoneNumber)
		const number = phoneNumber
		try {
			const response = await setUpRecaptha(number)
			if (response) {
				setForm(3)
			}
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

	const formik = useFormik({
		initialValues: {
			name: '',
			phoneNumber: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.max(15, 'Must be 15 characters or less')
				.required('Required'),
			phoneNumber: Yup.string().required('Required'),
			// .min(10, 'Must be more than 10 characters'),
		}),
		onSubmit: values => {
			const { name, phoneNumber } = values
			getOTP(name, phoneNumber)
			setForm(2)
		},
	})

	return (
		<div>
			<div className="min-h-screen bg-purple-1 flex items-center justify-center bg-log bg-center bg-no-repeat bg-cover">
				<div className="w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg p-4 max-h-screen overflow-y-scroll">
					<img src={Logo} className="w-9/12 mx-auto" alt="" />
					<h1 className="text-xs text-purple-1 pt-3 text-center">
						SignUp with Credentials
					</h1>
					{form === 1 || form === 2 ? (
						<form className="" onSubmit={formik.handleSubmit}>
							<div className="my-2 flex flex-col">
								<label className="text-sm text-purple-1 py-1.5 font-semibold">
									Industry / Business Name
								</label>
								<input
									type="text"
									autocapitalize="word"
									placeholder="Name"
									className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
									{...formik.getFieldProps('name')}
								/>
								{formik.touched.name && formik.errors.name ? (
									<div>{formik.errors.name}</div>
								) : null}
							</div>
							<div className="my-2 flex flex-col">
								<label className="text-sm text-purple-1 py-1.5 font-semibold">
									Phone Number
								</label>
								<input
									placeholder="Phone Number"
									className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
									type="tel"
									{...formik.getFieldProps('phoneNumber')}
								/>
								{formik.touched.phoneNumber && formik.errors.phoneNumber ? (
									<div>{formik.errors.phoneNumber}</div>
								) : null}
							</div>
							<div id="recaptcha-container"></div>
							{form === 1 ? (
								<button
									type="submit"
									className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
								>
									SignUp
								</button>
							) : null}
						</form>
					) : null}
					<div className="flex items-center justify-center">
						<div id="recaptcha-container"></div>
					</div>
					{form === 3 ? <OtpScreen /> : null}
					<h1 className="text-xs text-purple-1 pt-2 text-center">
						Already have an account ?{' '}
						<Link to="../login" className="font-bold hover:underline">
							{' '}
							Log In
						</Link>
					</h1>
				</div>
			</div>
		</div>
	)
}

export default SignUpOtp

const OtpScreen = () => {
	const formik = useFormik({
		initialValues: {
			otp: '',
		},
		validationSchema: Yup.object({
			otp: Yup.string().required('Required'),
		}),
		onSubmit: values => {
			const { otp } = values
			console.log(otp)
			getVerify(otp)
		},
	})

	const getVerify = otp => {
		// ConfirmationResult.confirm(otp)
		// 	.then(result => {
		// 		// User signed in successfully.
		// 		const user = result.user
		// 		// ...
		// 	})
		// 	.catch(error => {
		// 		// User couldn't sign in (bad verification code?)
		// 		// ...
		// 	})
	}
	return (
		<form className="" onSubmit={formik.handleSubmit}>
			<div className="my-2 flex flex-col">
				<label className="text-sm text-purple-1 py-1.5 font-semibold">
					Enter OTP
				</label>
				<input
					type="text"
					autocapitalize="word"
					placeholder="Enter OTP"
					className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
					{...formik.getFieldProps('otp')}
				/>
				{formik.touched.otp && formik.errors.otp ? (
					<div>{formik.errors.otp}</div>
				) : null}
			</div>
			<button
				type="submit"
				className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
			>
				Verify
			</button>
		</form>
	)
}
