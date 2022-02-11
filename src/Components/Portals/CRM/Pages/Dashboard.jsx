import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ApproveProduct from '../Component/ApproveProduct'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'
import ApproveBusinessUsers from '../Component/ApproveBusinessusers'

const Dashboard = () => {
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-blueGray-100">
				<AdminTopBar />
				{/* Header */}
				<div className="-z-50">
					<HeaderStats />
				</div>
				{console.log('Hello1')}
				<div className="px-4 md:px-10 mx-auto w-full -m-24 z-50">
					<ApproveBusinessUsers />
					<ApproveProduct />
				</div>
			</div>
		</>
	)
}

export default Dashboard
