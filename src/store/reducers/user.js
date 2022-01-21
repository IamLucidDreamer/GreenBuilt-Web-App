import { LOGIN } from '../constants/index'

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN: {
			return action.payload
		}
		default:
			return state
	}
}

export default userReducer
