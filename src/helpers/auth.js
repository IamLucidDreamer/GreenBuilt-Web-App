const token = localStorage.getItem('jwt')

export const authenticated = token => (token ? true : false)
