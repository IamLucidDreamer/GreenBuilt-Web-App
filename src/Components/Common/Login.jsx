import React, { useEffect, useReducer, useState } from 'react'
import Logo from '../../assets/logoGreenbuilt.png'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../store/actions/user'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authenticated } from '../../helpers/auth'

const Login = () => {
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

	const dispatch = useDispatch()
	const handleLogin = loginValue => {
		dispatch(login(loginValue))
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(6, 'Too short').required('Required'),
		}),
		onSubmit: values => {
			handleLogin(values)
		},
	})
	return (
		<>
			<div className="min-h-screen bg-purple-1 flex items-center justify-center bg-log bg-center bg-no-repeat bg-cover">
				<div className="w-1/3 bg-white rounded-lg p-4">
					<img src={Logo} className="w-9/12 mx-auto" alt="" />

					<h1 className="text-xs text-purple-1 pt-3 text-center">
						LogIn with Credentials
					</h1>
					<form className="" onSubmit={formik.handleSubmit}>
						<div className="my-2 flex flex-col">
							<label className="text-sm text-purple-1 py-1.5 font-semibold">
								Email
							</label>
							<input
								placeholder="Email"
								className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
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
							LogIn
						</button>
					</form>
					<h1 className="text-xs text-purple-1 pt-2 text-center">
						New around here ?{' '}
						<Link to="../signup" className="font-bold hover:underline">
							{' '}
							Sign Up
						</Link>
					</h1>
				</div>
			</div>
		</>
	)
}

export default Login
