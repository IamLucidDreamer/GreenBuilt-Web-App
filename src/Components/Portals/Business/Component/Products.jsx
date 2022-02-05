import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import axios from '../../../../helpers/http-helper'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Products() {
	const [cols, setCols] = useState([])

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('jwt'))
		axios
			.get('/product/get-all/corporate', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				res.data.data?.map(
					val => (val.isApproved = val?.isApproved ? 'Approved' : 'Pending')
				)
				setCols(res.data.data)
			})
			.catch(err => {})
	}, [])

	const columns = useMemo(() => COLOUMNS, [])
	const data = useMemo(() => cols, [cols])

	const tableInstance = useTable({
		columns,
		data,
	})

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance
	const color = 'dark'

	//Create Products Error With Points providing String in place of number
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			points: '',
			photo: '',
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			points: Yup.string().required('Required'),
			photo: Yup.string().required('Required'),
		}),
		onSubmit: values => {
			values.points = 10
			handleCreateProduct(values)
		},
	})

	const handleCreateProduct = values => {
		const token = JSON.parse(localStorage.getItem('jwt'))
		const data = {}
		data.product = { ...values }
		console.log(data)
		axios
			.post('/product/create', data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res.data)
			})
			.catch(err => {})
	}

	return (
		<div
			className={
				'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ' +
				(color === 'light' ? 'bg-white' : 'bg-blue-600 text-white')
			}
		>
			<div className="rounded-t mb-0 px-4 py-3 border-0">
				<div className="flex flex-wrap items-center">
					<div className="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3
							className={
								'font-semibold text-lg ' +
								(color === 'light' ? 'text-blueGray-700' : 'text-white')
							}
						>
							Products Tables
						</h3>
					</div>
					<button className="px-5 py-2 rounded-lg shadow-lg bg-green-700">
						ADD PRODUCT
					</button>
				</div>
			</div>
			<div className="block w-full overflow-x-auto">
				<table
					{...getTableProps()}
					className="items-center w-full bg-transparent border-collapse"
				>
					<thead>
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th
										{...column.getHeaderProps}
										className={
											'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
											(color === 'light'
												? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
												: 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
										}
									>
										{column.render('Headers')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map(row => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td
												{...cell.getCellProps()}
												className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
											>
												{cell.render('Cell')}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<div className="m-4 p-4 bg-yellow-300">
				<form className="" onSubmit={formik.handleSubmit}>
					<div className="my-2 flex flex-col">
						<label className="text-sm text-purple-1 py-1.5 font-semibold">
							title
						</label>
						<input
							placeholder="Title"
							className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
							{...formik.getFieldProps('title')}
						/>
						{formik.touched.title && formik.errors.title ? (
							<div>{formik.errors.title}</div>
						) : null}
					</div>
					<div className="my-2 flex flex-col">
						<label className="text-sm text-purple-1 py-1.5 font-semibold">
							Description
						</label>
						<input
							placeholder="Description"
							className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
							{...formik.getFieldProps('description')}
						/>
						{formik.touched.description && formik.errors.description ? (
							<div>{formik.errors.description}</div>
						) : null}
					</div>
					<div className="my-2 flex flex-col">
						<label className="text-sm text-purple-1 py-1.5 font-semibold">
							Points
						</label>
						<input
							placeholder="Points"
							className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
							{...formik.getFieldProps('points')}
						/>
						{formik.touched.points && formik.errors.points ? (
							<div>{formik.errors.points}</div>
						) : null}
					</div>
					<div className="my-2 flex flex-col">
						<label className="text-sm text-purple-1 py-1.5 font-semibold">
							Photo
						</label>
						<input
							placeholder="Points"
							className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
							{...formik.getFieldProps('photo')}
						/>
						{formik.touched.photo && formik.errors.photo ? (
							<div>{formik.errors.photo}</div>
						) : null}
					</div>
					<button
						type="submit"
						className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
					>
						Create Product
					</button>
				</form>
			</div>
		</div>
	)
}

export default Products

const COLOUMNS = [
	{
		Headers: 'Id',
		accessor: 'id',
	},
	{
		Headers: 'Product Name',
		accessor: 'title',
	},
	{
		Headers: 'Description',
		accessor: 'description',
	},
	{
		Headers: 'Points',
		accessor: 'points',
	},
	{
		Headers: 'Status',
		accessor: 'isApproved',
	},
]
