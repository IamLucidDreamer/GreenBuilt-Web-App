import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ApproveProduct from '../Component/ApproveProduct'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'
import { ApproveBusiness } from '../Component/ApproveBusiness'

import Button from '@mui/material/Button'
import { AlignCenterOutlined, LeftOutlined } from '@ant-design/icons'

const Approvals = () => {
	const [show, setShow] = useState(false)
	const [approve, setApprove] = useState(false)

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
				<div className="relative bg-slate-600 md:pt-28 pb-32 pt-12">
					<div className="px-4 md:px-10 mx-auto w-full">
						<AdminTopBar
							pageName={
								approve
									? 'Dashboard / Approve Business'
									: 'Dashboard / Approve Product'
							}
						/>
						<div className="flex justify-around">
							<Button
								variant="contained"
								size="large"
								onClick={() => setApprove(true)}
								style={{
									backgroundColor: '#140035',
									width: '200px',
								}}
							>
								Approve Business
							</Button>
							<Button
								variant="contained"
								size="large"
								onClick={() => setApprove(false)}
								style={{
									backgroundColor: '#140035',
									width: '200px',
								}}
							>
								Approve Products
							</Button>
						</div>
					</div>
				</div>
				<div className="mx-auto w-full -m-20 z-50"></div>
				{approve ? <ApproveBusiness /> : <ApproveProduct />}
			</div>
		</div>
	)
}

export default Approvals
