import React, { useState, useEffect } from 'react'
import {
	EyeOutlined,
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	BellOutlined,
	ExclamationOutlined,
	CloseOutlined,
	ReloadOutlined,
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
		const token = localStorage.getItem('jwt')
		console.log(token)
		axios
			.get(`/statistics/get-all`, {
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsImV4cCI6MTY2MjM2NzkxNS4zNywiaWF0IjoxNjQ2NDcwMzE1fQ.0JroQYgg7SD10OjuP6DWmUK-Mi_vqnkMncEaa9vavlE`,
				},
			})
			.then(res => {
				setStats(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(setTimeout(() => setLoader(false), 10000))
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
					>
						<ReloadOutlined size="large" />
					</Button>
				</div>
				<div className="flex flex-wrap items-center justify-around">
					<DashboardCard title={'Total Users'} stat={stats.totalEndUsers} />
					<DashboardCard
						title={'Total Industry Types'}
						stat={stats.totalIndustryTypes}
					/>
					<DashboardCard
						title={'Business Users'}
						stat={stats.businessUserCount}
					/>
					<DashboardCard title={'End Users'} stat={stats.userCount} />
					<DashboardCard title={'Total Products'} stat={stats.totalProducts} />
					<DashboardCard title={'Total Assets'} stat={stats.totalAssets} />
					<DashboardCard
						title={"Total QR's Generated"}
						stat={stats.totalQRGenerated}
					/>
					<DashboardCard
						title={"Total QR's Consumed"}
						stat={stats.totalQRConsumed}
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
								'text-white p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full bg-gradient-to-br from-[#4bc834] to-[#1e6100]'
							}
						>
							<EyeOutlined size={''} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
