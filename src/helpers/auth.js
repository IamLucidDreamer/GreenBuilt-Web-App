const token = localStorage.getItem('jwt')

export const authenticated = token ? true : false
