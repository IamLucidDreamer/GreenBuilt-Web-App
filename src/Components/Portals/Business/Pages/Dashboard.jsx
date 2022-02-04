import React, { useState } from 'react'
import { Route, Routes, Switch } from 'react-router-dom'
import GenerateQr from '../Component/GenerateQr'
import Products from '../Component/Products'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'

const Dashboard = () => {
	const [sideBar, setSideBar] = useState(false)
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-blueGray-100">
				<AdminTopBar />
				{/* Header */}
				<div className="-z-50">
					<HeaderStats />
				</div>

				<div className="px-4 md:px-10 mx-auto w-full -m-24 z-50">
					<Products />
					<GenerateQr />
				</div>
			</div>
		</>
	)
}

export default Dashboard
