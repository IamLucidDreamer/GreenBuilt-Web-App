import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import axios from '../../../../helpers/http-helper'

function ApproveBusinessUsers() {
	console.log('Hello2')
	const [cols, setCols] = useState([])

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('jwt'))
		axios
			.get('/user/get-all', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res)
				res.data.user?.map(
					val => (val.isApproved = val?.isApproved ? 'Approved' : 'Pending')
				)
				setCols(res.data.user.filter(val => val.role === 2))
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

	const handleApproveUsers = ({ productId }) => {
		if (productId) {
			const token = JSON.parse(localStorage.getItem('jwt'))
			axios
				.post(
					`/user/approve/${productId}`,
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
				'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg p-3 rounded-xl ' +
				(color === 'light' ? 'bg-white' : 'bg-purple-1 text-purple-1')
			}
		>
			<div className="bg-white p-3 rounded-lg">
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
											.filter(val => val.column.Headers !== 'UserId')
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
													className="px-5 py-2 rounded-lg shadow-lg bg-gradient-to-br from-[#4bc834] to-[#1e6100] text-white"
													onClick={() =>
														handleApproveUsers({
															productId: row?.values?.id,
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
		</div>
	)
}

export default ApproveBusinessUsers

const COLOUMNS = [
	{
		Headers: 'Id',
		accessor: 'id',
	},
	{
		Headers: 'Name',
		accessor: 'name',
	},
	{
		Headers: 'Email',
		accessor: 'email',
	},
	{
		Headers: 'Status',
		accessor: 'isApproved',
	},
]
