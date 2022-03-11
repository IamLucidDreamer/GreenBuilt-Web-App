import React, { useState, useEffect, useMemo } from 'react'
import {
	Button,
	Radio,
	Input,
	Form,
	Row,
	Col,
	Drawer,
	Modal,
	Image,
	message,
	Tabs,
	Alert,
	Switch,
	Tooltip,
	Select,
} from 'antd'
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
import Sidebar from '../Component/Common/Sidebar'
import AdminTopBar from '../Component/Common/AdminTopBar'
import { AlignCenterOutlined, LeftOutlined } from '@ant-design/icons'
import HistoryTable from '../Component/HistoryTable'

const History = () => {
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
						<AdminTopBar pageName="Dashboard / History" />
					</div>
				</div>
				<div className="mx-auto w-full -m-44 z-50">
					{/* <HistoryTable /> */}
				</div>
			</div>
		</div>
	)
}

export { History }
