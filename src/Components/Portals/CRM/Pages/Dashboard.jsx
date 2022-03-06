import React from 'react'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import DashboardStats from '../Component/DashboardStats'

const Dashboard = () => {
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
					<DashboardStats />
				</div>
			</div>
		</>
	)
}

export default Dashboard
