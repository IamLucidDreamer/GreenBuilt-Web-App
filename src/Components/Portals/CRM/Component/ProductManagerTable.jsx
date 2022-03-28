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
import CreateProduct from '../../Business/Component/CreateProduct'

const ProductManagerTable = () => {
	const token = JSON.parse(localStorage.getItem('jwt'))

	const { TabPane } = Tabs

	const { TextArea } = Input

	const [product, setProduct] = useState([])

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
			.get('/product/get-all/admin', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res)
				setProduct(res.data.data)
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
			.get('/product/get-all/admin', {
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
				setProduct(res.data.data)
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
			{/* <Col>
				{userContext.access['download'][0] ? (
					<Button className="w-44" type="primary" style={{ border: 'none' }}>
						<CSVLink
							filename="Labourers.csv"
							data={allLabours.map(labour => {
								const updatedLabour = { ...labour }
								updatedLabour.expLevel = ``.concat(
									`${updatedLabour.labour?.expLevel} years`
								)
								updatedLabour.gender =
									updatedLabour.gender === 1 ? 'Male' : 'Female'
								updatedLabour.locale =
									updatedLabour.locale === 3
										? 'ta'
										: updatedLabour.locale === 2
										? 'hi'
										: 'en'
								updatedLabour.phone = `=""`.concat(updatedLabour.phone, `""`)
								if (updatedLabour.bankDetails !== undefined) {
									if (updatedLabour.bankDetails?.aadhaarNo)
										updatedLabour.aadhaarNo = `=""`.concat(
											updatedLabour.bankDetails?.aadhaarNo,
											`""`
										)
									if (updatedLabour.bankDetails?.bankAccountNo)
										updatedLabour.bankAccountNo = `=""`.concat(
											updatedLabour.bankDetails?.bankAccountNo,
											`""`
										)
									if (updatedLabour.bankDetails?.ifscCode)
										updatedLabour.ifscCode = updatedLabour.bankDetails?.ifscCode
									if (updatedLabour.bankDetails?.backAadhaarPhoto)
										updatedLabour.backAadhaarPhoto =
											updatedLabour.bankDetails?.backAadhaarPhoto
									if (updatedLabour.bankDetails?.frontAadhaarPhoto)
										updatedLabour.frontAadhaarPhoto =
											updatedLabour.bankDetails?.frontAadhaarPhoto
								}
								updatedLabour.isBanned = !updatedLabour.isBanned
									? 'false'
									: 'true'
								delete updatedLabour.id
								delete updatedLabour.labour
								delete updatedLabour.bankDetails
								delete updatedLabour.role
								return updatedLabour
							})}
							onClick={() => {
								message.success('The file is downloading')
							}}
							className="w-44"
						>
							Export to CSV
						</CSVLink>
					</Button>
				) : null}
			</Col> */}
		</Row>,
	]

	const onEdit = record => {
		setEditModalVisiblity(true)
		setEditData(record)
	}

	// const onDelete = record => {
	// 	Modal.confirm({
	// 		title: 'Are you sure, you want to Ban this labour',
	// 		okText: 'Yes, Ban',
	// 		onOk: () => {
	// 			setLoading(true)
	// 			request(`/api/app-user?userId=${record.userId}`, 'DELETE')
	// 				.then(async () => {
	// 					setLabour(
	// 						labour.map(labour =>
	// 							labour.id === record.id
	// 								? {
	// 										...labour,
	// 										userInfo: { ...labour.userInfo, isBanned: true },
	// 								  }
	// 								: labour
	// 						)
	// 					)

	// 					setBannedLabours(bannedLabours + 1)
	// 					setLoading(false)
	// 				})
	// 				.catch(err => {
	// 					setLoading(false)
	// 					throw err
	// 				})
	// 		},
	// 	})
	// }

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

	const newProductHide = () => setShowForm(false)

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
			key: 'title',
			title: 'Title',
			render: data => data.title,
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
			key: 'industryType',
			title: 'Industry Type',
			render: data => data.industryType,
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
			key: 'packingType',
			title: 'Packing Type',
			render: data => data.packingType,
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
			key: 'description',
			title: 'Description',
			render: data => data.description,
		},
		{
			key: 'packingType',
			title: 'Packing Type',
			render: data => data.packingType,
		},
		{
			key: 'uom',
			title: 'UOM',
			render: data => data.uom,
		},
		{
			key: 'isApproved',
			title: 'Status',
			render: data => (data.isApproved ? 'Approved' : 'Pending'),
		},
		{
			key: 'customerName',
			title: 'Customer Name',
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
					<DeleteOutlined
						title="Ban"
						style={innerTableActionBtnDesign}
						//onClick={() => onDelete(record)}
					/>
					{showTrash ? (
						<DeleteOutlined
							title="Delete Permanently"
							style={innerTableActionBtnDesign}
							//onClick={() => finalDelete(record)}
						/>
					) : null}
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
			<HCLayout title="Product Manager" actions={actionBtn}>
				{showTrash ? (
					<Alert
						type="warning"
						message="Labour in trash will be removed automatically after 30 days"
						showIcon
					/>
				) : null}
				<div className="overflow-x-scroll">
					<DataTable
						usersData={product}
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
									<Desc title="Company Name" content={data?.name} />
									<Desc title="Phone Number" content={data?.phone} />
									<Desc title="Email" content={data?.email} />
									<Desc
										title="Approval Status"
										content={data?.isApproved ? 'Approved' : 'Not Approved'}
									/>
								</Col>
								<Col span={12} lg={12} md={12} sm={32} xs={32}>
									<Desc title="Registered On" content={data?.createdAt} />
									<Desc title="Eb Service Number" content={data?.ebServiceNo} />
									<Desc title="Industry Type" content={data?.industryType} />
									<Desc title="GSTIN" content={data?.gstin} />
									{data.empStatus !== undefined ? (
										<div>
											<Desc
												title="Mill Owner Name"
												content={
													data.empStatus?.mill?.millOwner?.userInfo?.name
												}
											/>
											<Desc
												title="Mill Owner Phone No."
												content={
													data.empStatus?.mill?.millOwner?.userInfo?.phone
												}
											/>
										</div>
									) : (
										''
									)}
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
			{showForm ? <CreateProduct handleBack={newProductHide} /> : null}
		</>
	)
}

export { ProductManagerTable }
