import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from './Components/Navigation'
import { store } from './store/store'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<Provider store={store}>
			{/* ToastContainer is Controlling all the Notifications  */}
			<ToastContainer />
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		</Provider>
	)
}

export default App
