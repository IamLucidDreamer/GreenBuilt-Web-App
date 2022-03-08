import React, { useState } from 'react'
import { Route, Routes, Switch } from 'react-router-dom'
import GenerateQr from '../Component/GenerateQr'
import Products from '../Component/Products'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'
import BusinessDashboardStats from '../Component/BusinessDashboardStats'

const Dashboard = () => {
	const [sideBar, setSideBar] = useState(false)
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-gray-100">
				{/* Header */}
				<div className="relative bg-slate-600 md:pt-32 pb-32 pt-12">
					<div className="px-4 md:px-10 mx-auto w-full">
						<AdminTopBar pageName="Dashboard" />
					</div>
				</div>
				<div className="mx-auto w-full -m-44 z-50">
					<BusinessDashboardStats />
				</div>
			</div>
		</>
	)
}

export default Dashboard
