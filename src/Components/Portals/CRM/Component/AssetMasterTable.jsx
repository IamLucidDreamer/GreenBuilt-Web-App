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
	PlusOutlined,
} from '@ant-design/icons'
import QS from 'query-string'
import { DataTable } from './Common/Table/Table'
import { useTable } from 'react-table'
import axios from '../../../../helpers/http-helper'
import { HCLayout } from './Common/Layout/HCLayout'
import { innerTableActionBtnDesign } from './Common/InnerTableButtonDesign'
import { Desc } from './Common/Layout/Desc'
import { AddNewAssestForm } from './AddNewAssetForm'
import { toast } from 'react-toastify'
import { CSVLink } from 'react-csv'
import { useCSVReader } from 'react-papaparse'

const AssetMasterTable = () => {
	const token = JSON.parse(localStorage.getItem('jwt'))
	const [Csv, setCsv] = useState(false)

	const { CSVReader } = useCSVReader()

	const { TabPane } = Tabs

	const { TextArea } = Input

	const [asset, setAsset] = useState([])

	const [loading, setLoading] = useState(true)

	const [drawer, setDrawer] = useState(false)

	const [siderProps, setSiderProps] = useState({})

	const [editData, setEditData] = useState({})

	const [editModalVisiblity, setEditModalVisiblity] = useState(false)

	const [title, setTitle] = useState('')

	const [allLabours, setAllLabours] = useState([])

	const [body, setBody] = useState('')

	const [showTrash, setShowTrash] = useState(false)

	const [disableNotificationButton, setDisableNotificationButton] =
		useState(true)

	const [isFilterChanged, setIsFilterChanged] = useState(false)

	const [filters, setFilters] = useState({})

	const [customNotificationModal, setCustomNotificationModal] = useState(false)

	const [selectedIds, setSelectedIds] = useState([])
	const [selectedTempIds, setSelectedTempIds] = useState([])
	const [showForm, setShowForm] = useState(false)

	const refreshTable = queryString => {
		setLoading(true)
		console.log('refreshTable')

		axios
			.get('/user/get-all', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res)
				setAsset(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const requestsCaller = () => {
		setLoading(true)
		console.log('requestCaller')
		console.log(token)
		axios
			.get('/asset/get-all?limit=10', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				const data = res.data.data
				console.log(res)
				data.map(item => {
					item.key = item.id
				})
				console.log(res)
				setAsset(res.data.data)
				console.log(asset)
			})
			.catch(err => {
				console.log(err)
			})
			.finally(setLoading(false))
	}
	const getTrash = val => {
		setShowTrash(val)
		onTableFilterChange({
			isBanned: val,
			direction: undefined,
			lastRecordId: undefined,
		})
		if (val) {
			setFilterChange()
		} else {
			clearFilter('isBanned')
		}
	}

	// const getAllLabourData = () => {
	// 	axios
	// 		.get(
	// 			'/user/get-all',
	// 			{},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		)
	// 		.then(res => {
	// 			console.log(res)
	// 			res.data.user?.map(
	// 				val => (val.isApproved = val?.isApproved ? 'Approved' : 'Pending')
	// 			)
	// 			setBusiness(res.data.user.filter(val => val.role === 2))
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// }

	useEffect(() => {
		requestsCaller()

		//getAllLabourData()
		// request(`/api/count/labourers`, 'GET')
		// 	.then(async data => {
		// 		setTotalLabours(data.totalLabourers)
		// 		setEmpLabours(data.employedLabourers)
		// 		setUnempLabours(data.unemployedLabourers)
		// 		setBannedLabours(data.bannedLabourers)
		// 	})
		// 	.catch(err => {
		// 		throw err
		// 	})

		// const interval = setInterval(requestsCaller, 300000);
		// return () => clearInterval(interval);
	}, [])

	useEffect(() => {
		if (isFilterChanged) {
			refreshTable(QS.stringify(filters))
			setIsFilterChanged(false)
		}
	}, [isFilterChanged])

	const onTableFilterChange = query => {
		setFilters({ ...filters, ...query })
	}

	const clearFilter = type => {
		setFilters({
			...filters,
			[type]: undefined,
			direction: undefined,
			lastRecordId: undefined,
		})
		setIsFilterChanged(true)
	}

	const setFilterChange = () => {
		setIsFilterChanged(true)
		// setFilters({ ...filters, isChanged: true });
	}

	// const finalDelete = record => {
	// 	Modal.confirm({
	// 		title: 'This action is not reversable',
	// 		icon: <ExclamationOutlined />,
	// 		content:
	// 			'Please be careful while deleteting permanently. this action is undoable',
	// 		onOk: () => {
	// 			setLoading(true)
	// 			request(`/api/app-user/delete?userId=${record.userId}`, 'DELETE')
	// 				.then(() => {
	// 					setLabour(labour.filter(labr => labr.userId !== record.userId))
	// 					setLoading(false)
	// 				})
	// 				.catch(err => console.log(err))
	// 		},
	// 		okText: 'Delete',
	// 	})
	// }

	const rowSelection = {
		columnTitle: <div />,
		onChange: (keys, selectedRows) => {
			const temp = []
			selectedRows.map(row => temp.push(row.userId))
			setSelectedTempIds(temp)
		},
	}

	const notificationModal = () => {
		setCustomNotificationModal(true)
		setSelectedIds([...selectedIds, ...selectedTempIds])
		setSelectedTempIds([])
	}

	const sendingNotification = values => {
		// 	values.users = selectedIds
		// 	values.timeStamp = new Date().toJSON()
		// 	setLoading(true)
		// 	request(`/api/notification/custom-users`, 'POST', {
		// 		data: values,
		// 	})
		// 		.then(async () => {
		// 			setCustomNotificationModal(false)
		// 			setLoading(false)
		// 			message.success('Notification Sent')
		// 		})
		// 		.catch(err => {
		// 			setCustomNotificationModal(false)
		// 			setLoading(false)
		// 			throw err
		// 		})
	}

	const actionBtn = [
		<Row gutter={16} className="flex items-center">
			{/* <Col>
				<div className="">
					Trash: &nbsp;
					<Switch defaultChecked={showTrash} onChange={getTrash} />
				</div>
			</Col> */}
			<Col>
				<Button
					type="primary"
					className="flex items-center"
					onClick={() => requestsCaller()}
				>
					<ReloadOutlined />
				</Button>
			</Col>
			<Col>
				<Button
					type="primary"
					className="flex items-center"
					onClick={() => {
						setShowForm(true)
					}}
				>
					<PlusOutlined /> Add New
				</Button>
			</Col>
			<Col>
				{Csv ? (
					<CSVReader
						onUploadAccepted={results => {
							console.log('---------------------------')
							console.log(results)
							console.log('---------------------------')
						}}
					>
						{({
							getRootProps,
							acceptedFile,
							ProgressBar,
							getRemoveFileProps,
						}) => (
							<>
								<div>
									<button type="button" {...getRootProps()}>
										Browse file
									</button>
									<div>{acceptedFile && acceptedFile.name}</div>
									<button {...getRemoveFileProps()}>Remove</button>
								</div>
								<ProgressBar />
							</>
						)}
					</CSVReader>
				) : null}
				<Button className="w-44" type="primary" onClick={() => setCsv(!Csv)}>
					CSV Upload
				</Button>
			</Col>
			<Col>
				<Button className="w-44" type="primary" style={{}}>
					<CSVLink
						filename="Assets.csv"
						data={asset.map(labour => {
							const updatedAsset = { ...labour }

							return updatedAsset
						})}
						onClick={() => {
							message.success('The file is downloading')
						}}
						className="w-44"
					>
						Export to CSV
					</CSVLink>
				</Button>
			</Col>
		</Row>,
	]

	const onEdit = record => {
		setEditModalVisiblity(true)
		setEditData(record)
	}

	const newAssetHide = () => setShowForm(false)

	const onDelete = record => {
		Modal.confirm({
			title: 'Are you sure, you want to Delete this Asset!',
			okText: 'Yes, Delete',
			onOk: () => {
				setLoading(true)
				axios
					.delete(`/asset/delete/${record.assetId}`, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then(res => {
						toast.success(res.data.message)
						requestsCaller()
						setLoading(false)
					})
					.catch(err => {
						setLoading(false)
						toast.error(err.response.data.error)
					})
			},
		})
	}

	// const onUnban = record => {
	// 	Modal.confirm({
	// 		title: 'Are you sure, you want to un-ban this labour',
	// 		okText: 'Yes, Un-ban',
	// 		onOk: () => {
	// 			setLoading(true)
	// 			request(`/api/app-user/restore?userId=${record.userId}`, 'PATCH')
	// 				.then(async () => {
	// 					setLabour(
	// 						labour.map(labour =>
	// 							labour.id === record.id
	// 								? {
	// 										...labour,
	// 										userInfo: { ...labour.userInfo, isBanned: false },
	// 								  }
	// 								: labour
	// 						)
	// 					)

	// 					setBannedLabours(bannedLabours - 1)
	// 					setLoading(false)
	// 				})
	// 				.catch(err => {
	// 					setLoading(false)
	// 					throw err
	// 				})
	// 		},
	// 	})
	// }

	const onDrawerClose = () => {
		setSiderProps({})
		setDrawer(false)
	}
	const onDrawerOpen = record => {
		setSiderProps({
			title: record.name,
			data: record,
		})
		setDrawer(true)
	}

	const onEditModalClose = () => {
		setEditModalVisiblity(false)
		setEditData({})
	}

	const editModalSave = () => {
		// 	setEditModalVisiblity(false)
		// 	setLoading(true)
		// 	request(`/api/app-user?userId=${editData.userId}`, 'PATCH', {
		// 		data: {
		// 			name: editData.userInfo.name,
		// 			gender: editData.userInfo.gender.toString(),
		// 			age: editData.userInfo.age,
		// 		},
		// 	})
		// 		.then(async () => {
		// 			setLabour(
		// 				labour.map(item => (item.id === editData.id ? editData : item))
		// 			)
		// 			setLoading(false)
		// 			setEditData({})
		// 		})
		// 		.catch(err => {
		// 			setLoading(false)
		// 			throw err
		// 		})
	}

	const data = siderProps.data || {}

	const columns = [
		{
			key: 'name',
			title: 'Name',
			render: data => data.name,
			filterDropdown: () => (
				<Row className="p-3 shadow-lg">
					<Col>
						<Input
							placeholder="Search Here"
							value={filters.name}
							autoFocus
							onChange={e => {
								onTableFilterChange({
									name: e.target.value,
									direction: undefined,
									lastRecordId: undefined,
								})
							}}
						/>
					</Col>
					<Col>
						<Button
							onClick={() => {
								setFilterChange()
							}}
							icon={<SearchOutlined />}
							type="primary"
							style={{ borderRadius: 0 }}
						/>
					</Col>
					<Col>
						<Button
							onClick={() => clearFilter('name')}
							icon={<CloseOutlined />}
							type="default"
							style={{ borderRadius: 0, background: 'red', color: 'white' }}
						/>
					</Col>
				</Row>
			),
			filterIcon: () => <SearchOutlined style={{ fontSize: 18 }} />,
		},
		{
			key: 'sourceType',
			title: 'Source Type',
			render: data => data.sourceType,
			filterDropdown: () => (
				<Row className="p-3 shadow-lg">
					<Col>
						<Input
							placeholder="Search Here"
							value={filters.email}
							autoFocus
							onChange={e => {
								onTableFilterChange({
									phone: e.target.value,
									direction: undefined,
									lastRecordId: undefined,
								})
							}}
						/>
					</Col>
					<Col>
						<Button
							onClick={() => {
								setFilterChange()
							}}
							icon={<SearchOutlined />}
							type="primary"
							style={{ borderRadius: 0 }}
						/>
					</Col>
					<Col>
						<Button
							onClick={() => clearFilter('email')}
							icon={<CloseOutlined />}
							type="default"
							style={{ borderRadius: 0, background: 'red', color: 'white' }}
						/>
					</Col>
				</Row>
			),
			filterIcon: () => <SearchOutlined style={{ fontSize: 18 }} />,
		},
		{
			key: 'serviceNo',
			title: 'Service Number',
			render: data => data.serviceNo,
			filterDropdown: () => (
				<Row className="p-3 shadow-lg">
					<Col>
						<Input
							placeholder="Search Here"
							value={filters.phoneNumber}
							autoFocus
							onChange={e => {
								onTableFilterChange({
									phone: e.target.value,
									direction: undefined,
									lastRecordId: undefined,
								})
							}}
						/>
					</Col>
					<Col>
						<Button
							onClick={() => {
								setFilterChange()
							}}
							icon={<SearchOutlined />}
							type="primary"
							style={{ borderRadius: 0 }}
						/>
					</Col>
					<Col>
						<Button
							onClick={() => clearFilter('phone')}
							icon={<CloseOutlined />}
							type="default"
							style={{ borderRadius: 0, background: 'red', color: 'white' }}
						/>
					</Col>
				</Row>
			),
			filterIcon: () => <SearchOutlined style={{ fontSize: 18 }} />,
		},
		{
			key: 'make',
			title: 'Make',
			render: data => data.make,
		},
		{
			key: 'model',
			title: 'Model',
			render: data => data.model,
		},
		{
			key: 'capacity',
			title: 'Capacity',
			render: data => data.capacity,
		},
		{
			key: 'edc',
			title: 'EDC',
			render: data => data.edc,
		},
		{
			key: 'substation',
			title: 'Sub-Station',
			render: data => data.substation,
		},
		{
			key: 'latitude',
			title: 'Latitude',
			render: data => data.latitude,
		},
		{
			key: 'longitude',
			title: 'Longitude',
			render: data => data.longitude,
		},
		// {
		// 	key: 'dateOfBirth',
		// 	title: 'Age',
		// 	render: record => record.userInfo.age,
		// 	// sorter: {
		// 	//   compare: (param1, param2) => param1.userInfo.age - param2.userInfo.age,
		// 	// },
		// },
		// {
		// 	key: 'skill',
		// 	title: 'Skills',
		// 	ellipsis: {
		// 		showTitle: false,
		// 	},
		// 	render: record => (
		// 		<Tooltip
		// 			placement="topLeft"
		// 			title={record.skills ? record.skills.toString() : 'N/A'}
		// 		>
		// 			{record.skills ? record.skills.toString() : 'N/A'}
		// 		</Tooltip>
		// 	),

		// filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
		//   <Row className="p-3 shadow-lg">
		//     <Col>
		//       <Input
		//         placeholder="Search Here"
		//         value={selectedKeys[0]}
		//         autoFocus
		//         onChange={(e) => {
		//           setSelectedKeys(e.target.value ? [e.target.value] : []);
		//           confirm({ closeDropdown: false });
		//         }}
		//         onPressEnter={confirm}
		//         onBlur={confirm}
		//       />
		//     </Col>
		//     <Col>
		//       <Button
		//         onClick={confirm}
		//         icon={<SearchOutlined />}
		//         type="primary"
		//         style={{ borderRadius: 0 }}
		//       />
		//     </Col>
		//   </Row>
		// ),
		// filterIcon: () => <SearchOutlined style={{ fontSize: 18 }} />,
		// onFilter: (value, record) =>
		//   record?.skills?.toString().toLowerCase().includes(value.toLowerCase()),
		// },
		// {
		// 	key: 'status',
		// 	title: 'Status',
		// 	render: record => (record.empStatus ? 'Employed' : 'Unemployed'),
		// 	// filters: [
		// 	//   { text: 'Unemployed', value: 'Unemployed' },
		// 	//   { text: 'Employed', value: 'Employed' },
		// 	// ],
		// 	// onFilter: (value, record) =>
		// 	//   value === 'Employed' ? record.empStatus !== undefined : record.empStatus === undefined,
		// },
		// {
		// 	key: 'createAt',
		// 	title: 'Reg. Date',
		// 	render: record => (
		// 		<Tooltip
		// 			placement="top"
		// 			title={`${new Date(
		// 				record.userInfo?.createdAt
		// 			).toLocaleDateString()} ${new Date(
		// 				record.userInfo?.createdAt
		// 			).toLocaleTimeString()}`}
		// 		>
		// 			{`${new Date(record.userInfo?.createdAt).toLocaleDateString()}`}
		// 		</Tooltip>
		// 	),
		// },
		{
			key: 7,
			title: 'Action',
			width: 200,
			render: record => (
				<div className="flex items-center justify-evenly">
					<EyeOutlined
						title="View"
						//style={innerTableActionBtnDesign}
						onClick={() => {
							onDrawerOpen(record)
						}}
					/>
					{/* <EditOutlined
						title="Edit"
						style={innerTableActionBtnDesign}
						//onClick={() => onEdit(record)}
					/> */}
					<DeleteOutlined
						title="Ban"
						style={innerTableActionBtnDesign}
						onClick={() => onDelete(record)}
					/>
					{/* {showTrash ? (
						<DeleteOutlined
							title="Delete Permanently"
							style={innerTableActionBtnDesign}
							//onClick={() => finalDelete(record)}
						/>
					) : null} */}
				</div>
			),
		},
	]

	const paginationHandler = (direction, lastRecordId) => {
		onTableFilterChange({
			direction,
			lastRecordId,
		})
		setFilterChange()

		setSelectedIds([...selectedIds, ...selectedTempIds])
		setSelectedTempIds([])
	}

	const skillData = data.skills || []
	return (
		<>
			<HCLayout title="Asset Master" actions={actionBtn}>
				{showTrash ? (
					<Alert
						type="warning"
						message="Labour in trash will be removed automatically after 30 days"
						showIcon
					/>
				) : null}
				<div className="overflow-x-scroll">
					<DataTable
						usersData={asset}
						searchable={false}
						differUserRows
						pagination={true}
						loading={loading}
						columns={columns}
					/>
				</div>
				<div className="py-3 bg-purple-1"></div>
				<Drawer
					title={siderProps.title}
					width="750px"
					placement="right"
					onClose={onDrawerClose}
					visible={drawer}
				>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Business / Industry information" key="1">
							<Row>
								<Col span={12} lg={12} md={12} sm={32} xs={32}>
									<Desc title="Name" content={data?.name} />
									<Desc title="Source Type" content={data?.sourceType} />
									<Desc title="Service Number" content={data?.serviceNo} />
									<Desc title="Make" content={data?.make} />
									<Desc title="Model" content={data?.model} />
									<Desc title="Capacity" content={data?.capacity} />
								</Col>
								<Col span={12} lg={12} md={12} sm={32} xs={32}>
									<Desc title="Registered On" content={data?.createdAt} />
									<Desc title="EDC" content={data?.edc} />
									<Desc title="Sub Station" content={data?.substation} />
									<Desc title="Longitude" content={data?.longitude} />
									<Desc title="Latitude" content={data?.latitude} />
								</Col>

								<Col span={32} className="p-3 mt-3">
									<h2>
										<b>Image : </b>
									</h2>
									<Image
										src={data.userInfo?.imageUrl}
										height="200px"
										width="200px"
									/>
								</Col>
							</Row>
						</TabPane>
					</Tabs>
				</Drawer>
				<Modal
					title="Edit Labour"
					visible={editModalVisiblity}
					onCancel={onEditModalClose}
					onOk={editModalSave}
					okText="Update Labour Info"
				>
					<Form.Item label="Name">
						<Input
							title="Name "
							value={editData.userInfo?.name}
							onChange={e => {
								setEditData({
									...editData,
									userInfo: { ...editData.userInfo, name: e.target.value },
								})
							}}
							placeholder="Enter Name"
							required
						/>
					</Form.Item>
					<Form.Item label="Gender">
						<Radio.Group
							onChange={e => {
								setEditData({
									...editData,
									userInfo: {
										...editData.userInfo,
										gender: e.target.value === 'Male' ? 1 : 2,
									},
								})
							}}
							value={editData.userInfo?.gender === 1 ? 'Male' : 'Female'}
						>
							<Radio value="Male">Male</Radio>
							<Radio value="Female">Female</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Age">
						<Input
							title="Age "
							value={editData.userInfo?.age}
							onChange={e => {
								setEditData({
									...editData,
									userInfo: { ...editData.userInfo, age: e.target.value },
								})
							}}
							placeholder="Enter Age"
							required
						/>
					</Form.Item>
				</Modal>
				<Modal
					footer=""
					onCancel={() => setCustomNotificationModal(false)}
					visible={customNotificationModal}
					title="Sending Notification"
				>
					<h2>
						<b>
							{' '}
							Selected users : {selectedIds.length +
								selectedTempIds.length}{' '}
						</b>
					</h2>
					<Form layout="vertical" onFinish={sendingNotification}>
						<Form.Item
							rules={[
								{ required: true, message: 'Enter title for notification' },
							]}
							name="title"
							label="Title"
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="body"
							label="Body"
							rules={[{ required: true, message: 'Enter notification body' }]}
						>
							<Input.TextArea />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Send Notification
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</HCLayout>
			{showForm ? <AddNewAssestForm handleBack={newAssetHide} /> : null}
		</>
	)
}

export { AssetMasterTable }
