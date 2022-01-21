import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/common/Login'
import SignUp from './components/common/SignUp'
import Home from './components/main/Home'
import Dashboard from './components/portals/business/pages/Dashboard'
import { store } from './store/store'

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />\
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
