import { toast } from 'react-toastify'
import axios from '../../helpers/http-helper'
import { IS_AUTH, LOGIN } from '../constants'

const setUserDetails = data => ({
	type: LOGIN,
	payload: data,
})

const setAuth = data => ({
	type: IS_AUTH,
	payload: data,
})

export const login =
	({ email, password }) =>
	dispatch => {
		axios
			.post('/signin', {
				email,
				password,
			})
			.then(res => {
				res?.data?.data?.role === 1 || res?.data?.data?.role === 2
					? toast.warning('CRM Portal is for Admins only.')
					: toast.success(res?.data?.message)
				dispatch(setUserDetails(res?.data?.data))
				dispatch(setAuth(true))
				if (window !== undefined) {
					localStorage.setItem('jwt', JSON.stringify(res?.data?.token))
				}
			})
			.catch(err => toast.error(err?.response?.data?.error))
	}

export const signUpBusiness =
	({ name, phoneNumber, email, password, ebServiceNo, gstin, industryType }) =>
	dispatch => {
		axios
			.post('/signUp?userType=2', {
				name,
				phoneNumber,
				email,
				password,
				ebServiceNo,
				gstin,
				industryType,
			})
			.then(res => {
				toast.success(res.data.message)
				dispatch(login({ email, password }))
			})
			.catch(err => toast.error(err.response.data.error))
	}

export const logout = () => {
	return dispatch => {
		localStorage.removeItem('jwt')
		dispatch(setUserDetails(null))
		axios.get('/signout')
		toast.success('User Logged out')
	}
}
