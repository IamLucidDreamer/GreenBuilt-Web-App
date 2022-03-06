import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ApproveProduct from '../Component/ApproveProduct'
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import HeaderStats from '../Component/Common/HeaderStats'
import { BusinessUsers } from '../Component/BusinessUsers'

import Button from '@mui/material/Button'
import { EndUsers } from '../Component/EndUsers'
import { AssetMasterTable } from '../Component/AssetMasterTable'

const AssetMaster = () => {
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-blueGray-100">
				{/* Header */}
				<div className="relative bg-slate-600 md:pt-32 pb-32 pt-12">
					<div className="px-4 md:px-10 mx-auto w-full">
						<AdminTopBar pageName={'Dashboard / Asset Master'} />
					</div>
				</div>

				<div className="px-4 md:px-10 mx-auto w-full -m-44 z-50">
					<AssetMasterTable />
				</div>
			</div>
		</>
	)
}

export default AssetMaster
