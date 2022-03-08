import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyAPUS5x_xniGsaXBnuo6NmCIpYqGUBxFGM',
	authDomain: 'green-built-auth.firebaseapp.com',
	projectId: 'green-built-auth',
	storageBucket: 'green-built-auth.appspot.com',
	messagingSenderId: '21512135402',
	appId: '1:21512135402:web:34376564f815807f88ad93',
	measurementId: 'G-XCW34KNEK0',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
