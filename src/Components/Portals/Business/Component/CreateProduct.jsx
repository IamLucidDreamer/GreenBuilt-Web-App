import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../../helpers/http-helper'

function CreateProduct(props) {
	//Create Products Error With Points providing String in place of number
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			points: '',
			photo: '',
			industryType: '',
			uom: '',
			packingType: '',
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
		<div className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-purple-1 min-h-screen min-w-screen overflow-y-scroll">
			<button
				className="text-white p-2 text-base"
				onClick={() => props.handleBack()}
			>
				Back
			</button>
			<h1 className="text-white text-center text-3xl font-bold pt-10">
				Create New Product
			</h1>
			<div className="m-4 p-3 bg-purple-1 rounded-xl">
				<div className="bg-white p-3 rounded-lg">
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
								Packing Type
							</label>
							<input
								placeholder="Packing Type"
								className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
								{...formik.getFieldProps('packingType')}
							/>
							{formik.touched.packingType && formik.errors.packingType ? (
								<div>{formik.errors.packingType}</div>
							) : null}
						</div>
						<div className="my-2 flex flex-col">
							<label className="text-sm text-purple-1 py-1.5 font-semibold">
								UOM
							</label>
							<input
								placeholder="UOM"
								className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
								{...formik.getFieldProps('uom')}
							/>
							{formik.touched.uom && formik.errors.uom ? (
								<div>{formik.errors.uom}</div>
							) : null}
						</div>
						<div className="my-2 flex flex-col">
							<label className="text-sm text-purple-1 py-1.5 font-semibold">
								Industry Type
							</label>
							<input
								placeholder="Industry Type"
								className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
								{...formik.getFieldProps('industryType')}
							/>
							{formik.touched.industryType && formik.errors.industryType ? (
								<div>{formik.errors.industryType}</div>
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
		</div>
	)
}

export default CreateProduct
