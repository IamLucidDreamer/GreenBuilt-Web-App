import axios from '../../helpers/http-helper'
import { LOGIN } from '../constants'

const setUserDetails = data => ({
	type: LOGIN,
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
				dispatch(setUserDetails(res.data))
			})
			.catch(err => console.log({ err }))
	}
