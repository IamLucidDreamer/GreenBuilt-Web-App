import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import axios from '../../../../helpers/http-helper'

function Products() {
	const [cols, setCols] = useState([])

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('jwt'))
		axios
			.get('/product/get-all/admin', {
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

	const handleApproveProduct = ({ productId }) => {
		if (productId) {
			const token = JSON.parse(localStorage.getItem('jwt'))
			axios
				.put(
					`/product/approve/${productId}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then(res => {
					const data = res.data?.data
					const inx = cols?.findIndex(val => val.id === data.id)
					cols.splice(inx, 1)
					setCols(prev => [...prev, { ...data, isApproved: 'Approved' }])
				})
				.catch(err => {})
		}
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
							Product Tables
						</h3>
					</div>
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
									{row.cells
										.filter(val => val.column.Headers !== 'Product')
										.map(cell => {
											return (
												<td
													{...cell.getCellProps()}
													className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
												>
													{cell.render('Cell')}
												</td>
											)
										})}
									<td>
										{row?.values?.isApproved === 'Pending' ? (
											<button
												className="px-5 py-2 rounded-lg shadow-lg bg-green-700"
												onClick={() =>
													handleApproveProduct({
														productId: row?.values?.productId,
													})
												}
											>
												Approve
											</button>
										) : null}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
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
	{
		Headers: 'Product',
		accessor: 'productId',
	},
]
