import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../../helpers/http-helper'
import QRCode from 'react-qr-code'

function GenerateQr() {
	const [cols, setCols] = useState([])
	const [show, setShow] = useState('')

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('jwt'))
		axios
			.get('/product/get-all/corporate', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				setCols(res.data.data)
			})
			.catch(err => {})
	}, [])

	const formik = useFormik({
		initialValues: {
			productId: '',
		},
		validationSchema: Yup.object({
			productId: Yup.string().required('Required'),
		}),
		onSubmit: values => {
			handleGenerateQR(values)
		},
	})

	const handleGenerateQR = values => {
		const token = JSON.parse(localStorage.getItem('jwt'))
		console.log(values.productId)
		axios
			.post(
				`/qr/generate/${values.productId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(res => {
				setShow(res.data.data.qrId)
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<div class="relative rounded-lg overflow-hidden shadow-lg bg-purple-1">
			{/* Generate Qr */}
			<div className="m-4 p-4 bg-white">
				<h1>Generate QR</h1>
				<form className="" onSubmit={formik.handleSubmit}>
					<div className="my-2 flex flex-col">
						<label className="text-sm text-purple-1 py-1.5 font-semibold">
							Select Product
						</label>
						<select
							{...formik.getFieldProps('productId')}
							className="border-2 border-purple-1 rounded-lg"
						>
							<option disabled className="text-red-700">
								Choose the Product
							</option>
							{cols.map(data => {
								return (
									<option value={data.productId} className="text-red-700">
										{data.title}
									</option>
								)
							})}
						</select>
						{formik.touched.productId && formik.errors.productId ? (
							<div>{formik.errors.productId}</div>
						) : null}
					</div>
					<button
						type="submit"
						className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
					>
						Generate QR
					</button>
				</form>
			</div>
			<div
				className={
					show !== ''
						? 'block mb-10 items-center justify-center flex'
						: 'hidden'
				}
			>
				<QRCode value={show} />
			</div>
		</div>
	)
}

export default GenerateQr
