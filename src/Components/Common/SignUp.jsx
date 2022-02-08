import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticated } from '../../helpers/auth'
import Logo from '../../assets/GREENBUILT all purple.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signUpBusiness } from '../../store/actions/user'

const SignUp = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const navigate = useNavigate()

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

	const formik = useFormik({
		initialValues: {
			name: '',
			phone: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.max(15, 'Must be 15 characters or less')
				.required('Required'),
			phone: Yup.string()
				.max(20, 'Must be 20 characters or less')
				.required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(8, 'Too short').required('Required'),
		}),
		onSubmit: values => {
			const { name, phone, email, password } = values
			dispatch(signUpBusiness({ name, phone, email, password }))
		},
	})

	return (
		<div>
			<div className="min-h-screen bg-purple-1 flex items-center justify-center bg-log bg-center bg-no-repeat bg-cover">
				<div className="w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg p-4">
					<img src={Logo} className="w-20 h-20 mx-auto" alt="" />
					<h1 className="text-xs text-purple-1 pt-3 text-center">
						SignUp with Credentials
					</h1>
					<form className="" onSubmit={formik.handleSubmit}>
						<div className="my-2 flex flex-col">
							<label className="text-sm text-purple-1 py-1.5 font-semibold">
								Name
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
								Phone
							</label>
							<input
								placeholder="Phone Number"
								className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
								type="tel"
								{...formik.getFieldProps('phone')}
							/>
							{formik.touched.phone && formik.errors.phone ? (
								<div>{formik.errors.phone}</div>
							) : null}
						</div>
						<div className="my-2 flex flex-col">
							<label className="text-sm text-purple-1 py-1.5 font-semibold">
								Email
							</label>
							<input
								placeholder="Email"
								className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
								type="email"
								{...formik.getFieldProps('email')}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div>{formik.errors.email}</div>
							) : null}
						</div>
						<div className="my-2 flex flex-col">
							<label className="text-sm text-purple-1 py-1.5 font-semibold">
								Password
							</label>
							<input
								placeholder="Password"
								className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
								type="password"
								{...formik.getFieldProps('password')}
							/>
							{formik.touched.password && formik.errors.password ? (
								<div>{formik.errors.password}</div>
							) : null}
						</div>
						<button
							type="submit"
							className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
						>
							SignUp
						</button>
					</form>
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

export default SignUp
