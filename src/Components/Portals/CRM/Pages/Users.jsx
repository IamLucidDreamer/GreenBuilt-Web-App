import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ApproveProduct from '../Component/ApproveProduct'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'
import { BusinessUsers } from '../Component/BusinessUsers'

import Button from '@mui/material/Button'
import { EndUsers } from '../Component/EndUsers'

const Users = () => {
	const [business, setBusiness] = useState(true)
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-blueGray-100">
				{/* Header */}
				<div className="relative bg-slate-600 md:pt-32 pb-32 pt-12">
					<div className="px-4 md:px-10 mx-auto w-full">
						<AdminTopBar
							pageName={business ? 'Dashboard / Business' : 'Dashboard / Users'}
						/>
					</div>
				</div>

				<div className="px-4 md:px-10 mx-auto w-full -m-44 z-50">
					<div className="flex items-center justify-evenly p-4">
						<Button
							variant="contained"
							size="large"
							onClick={() => setBusiness(true)}
							style={{ backgroundColor: '#140035', width: '175px' }}
						>
							Business Users
						</Button>
						<Button
							variant="contained"
							size="large"
							onClick={() => setBusiness(false)}
							style={{ backgroundColor: '#140035', width: '175px' }}
						>
							End Users
						</Button>
					</div>
					{business ? <BusinessUsers /> : <EndUsers />}
				</div>
			</div>
		</>
	)
}

export default Users
