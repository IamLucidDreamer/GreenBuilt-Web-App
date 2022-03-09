import React, { useState, useEffect } from 'react'
import {
	ReloadOutlined,
	BankOutlined,
	BarsOutlined,
	DeploymentUnitOutlined,
	IdcardOutlined,
	QrcodeOutlined,
	CameraOutlined,
	UserOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import Button from '@mui/material/Button'
import axios from '../../../../helpers/http-helper'
import LinearProgress from '@mui/material/LinearProgress'

const DashboardStats = () => {
	const [stats, setStats] = useState('')
	const [loader, setLoader] = useState(false)

	useEffect(() => dataLoader(), [])

	const dataLoader = () => {
		setLoader(true)
		const token = JSON.parse(localStorage.getItem('jwt'))
		axios
			.get(`/statistics/admin/get-all`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				setStats(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(setLoader(false))
	}

	return (
		<>
			{loader ? (
				<div className="w-full mx-auto fixed top-0">
					<LinearProgress />
				</div>
			) : null}
			<div className="relative px-4 py-2">
				<div className="flex justify-end mr-10">
					<Button
						variant="contained"
						className="h-8"
						onClick={() => dataLoader()}
						style={{ backgroundColor: '#140035' }}
					>
						<ReloadOutlined style={{ fontSize: '20px' }} />
					</Button>
				</div>
				<div className="flex flex-wrap items-center justify-around">
					<DashboardCard
						title={'Total Users'}
						stat={stats.totalEndUsers}
						icon={1}
					/>
					<DashboardCard
						title={'Total Industry Types'}
						stat={stats.totalIndustryTypes}
						icon={2}
					/>
					<DashboardCard
						title={'Business Users'}
						stat={stats.businessUserCount}
						icon={3}
					/>
					<DashboardCard title={'End Users'} stat={stats.userCount} icon={4} />
					<DashboardCard
						title={'Total Products'}
						stat={stats.totalProducts}
						icon={5}
					/>
					<DashboardCard
						title={'Total Assets'}
						stat={stats.totalAssets}
						icon={6}
					/>
					<DashboardCard
						title={"Total QR's Generated"}
						stat={stats.totalQRGenerated}
						icon={7}
					/>
					<DashboardCard
						title={"Total QR's Consumed"}
						stat={stats.totalQRConsumed}
						icon={8}
					/>
				</div>
			</div>
		</>
	)
}

export default DashboardStats

// Card Component for Stats
export const DashboardCard = props => {
	return (
		<div className="w-72 md:w-96 lg:w-128">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl mb-6 xl:mb-0 shadow-lg m-4 border-4 border-purple-1">
				<div className="flex-auto p-5">
					<div className="flex flex-wrap items-center justify-between">
						<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
							<h5 className="text-purple-1 uppercase font-medium text-base md:text-xl p-1">
								{props.title}
							</h5>
							<span className="text-2xl md:text-3xl font-bold text-purple-1">
								{props.stat}
							</span>
						</div>
						<div
							className={
								'text-white p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full bg-gradient-to-br from-[#017f02] to-[#06788f]'
							}
						>
							{props.icon === 1 ? (
								<UserOutlined style={{ fontSize: '40px' }} />
							) : null}
							{props.icon === 2 ? (
								<SettingOutlined style={{ fontSize: '40px' }} />
							) : null}
							{props.icon === 3 ? (
								<BankOutlined style={{ fontSize: '40px' }} />
							) : null}
							{props.icon === 4 ? (
								<IdcardOutlined style={{ fontSize: '40px' }} />
							) : null}
							{props.icon === 5 ? (
								<BarsOutlined style={{ fontSize: '40px' }} />
							) : null}
							{props.icon === 6 ? (
								<DeploymentUnitOutlined style={{ fontSize: '40px' }} />
							) : null}
							{props.icon === 7 ? (
								<QrcodeOutlined style={{ fontSize: '40px' }} />
							) : null}
							{props.icon === 8 ? (
								<CameraOutlined style={{ fontSize: '40px' }} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
