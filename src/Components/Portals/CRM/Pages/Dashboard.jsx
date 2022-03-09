import React, { useState } from 'react'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import DashboardStats from '../Component/DashboardStats'
import { AlignCenterOutlined, LeftOutlined } from '@ant-design/icons'

const Dashboard = () => {
	const [show, setShow] = useState(false)

	return (
		<div className="bg-gray-100 min-h-screen">
			<button
				className="fixed top-5 left-2 z-50 w-10 h-10 bg-purple-1"
				onClick={() => setShow(!show)}
			>
				{show ? (
					<LeftOutlined
						style={{ fontSize: '25px', color: '#fff', paddingTop: '25px' }}
					/>
				) : (
					<AlignCenterOutlined style={{ fontSize: '25px', color: '#fff' }} />
				)}
			</button>
			{show ? (
				<div className="origin-center translate-x-100 duration-700 transition duration-150 ease-out">
					<Sidebar />
				</div>
			) : null}
			<div className="relative">
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
		</div>
	)
}

export default Dashboard
