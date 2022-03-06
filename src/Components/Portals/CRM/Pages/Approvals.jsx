import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ApproveProduct from '../Component/ApproveProduct'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'
import { ApproveBusiness } from '../Component/ApproveBusiness'

import Button from '@mui/material/Button'
import { EndUsers } from '../Component/EndUsers'

const Approvals = () => {
	const [product, setProduct] = useState(false)
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-blueGray-100">
				{/* Header */}
				<div className="relative bg-slate-600 md:pt-32 pb-32 pt-12">
					<div className="px-4 md:px-10 mx-auto w-full">
						<AdminTopBar
							pageName={
								product
									? 'Dashboard / Product Approval'
									: 'Dashboard / Business Approval'
							}
						/>
					</div>
				</div>

				<div className="px-4 md:px-10 mx-auto w-full -m-44 z-50">
					<div className="flex items-center justify-evenly p-4">
						<Button
							variant="contained"
							size="large"
							onClick={() => setProduct(false)}
						>
							Business Users
						</Button>
						<Button
							variant="contained"
							size="large"
							onClick={() => setProduct(true)}
						>
							End Users
						</Button>
					</div>
					{product ? <ApproveProduct /> : <ApproveBusiness />}
				</div>
			</div>
		</>
	)
}

export default Approvals
