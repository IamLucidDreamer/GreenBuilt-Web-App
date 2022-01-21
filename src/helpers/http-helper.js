import { BASE_URL } from '../config'

const { default: Axios } = require('axios')
const axios = Axios.create({
	baseURL: BASE_URL,
})

export default axios
