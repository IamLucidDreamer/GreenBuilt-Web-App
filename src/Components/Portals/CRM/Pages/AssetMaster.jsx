import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ApproveProduct from '../Component/ApproveProduct'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'
import { BusinessUsers } from '../Component/BusinessUsers'

import Button from '@mui/material/Button'
import { EndUsers } from '../Component/EndUsers'
import { AssetMasterTable } from '../Component/AssetMasterTable'

import { AlignCenterOutlined, LeftOutlined } from '@ant-design/icons'

const AssetMaster = () => {
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
						<AdminTopBar pageName={'Dashboard / Asset Manager'} />
					</div>
				</div>
				<div className="mx-auto w-full -m-44 z-50">
					<AssetMasterTable />
				</div>
			</div>
		</div>
	)
}

export default AssetMaster
