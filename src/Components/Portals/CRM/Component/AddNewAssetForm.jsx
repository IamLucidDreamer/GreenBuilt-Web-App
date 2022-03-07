import react from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../../helpers/http-helper'
import { toast } from 'react-toastify'

export const AddNewAssestForm = () => {
	const token = localStorage.getItem('jwt')

	const handleNewAsset = value => {
		const {
			name,
			sourceType,
			serviceNo,
			make,
			model,
			capacity,
			substation,
			latitude,
			longitude,
			edc,
		} = value
		axios
			.post(
				`/asset/upload/3`,
				{
					asset: {
						name,
						sourceType,
						serviceNo,
						make,
						model,
						capacity,
						substation,
						edc,
						latitude,
						longitude,
					},
				},
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsImV4cCI6MTY2MjM2NzkxNS4zNywiaWF0IjoxNjQ2NDcwMzE1fQ.0JroQYgg7SD10OjuP6DWmUK-Mi_vqnkMncEaa9vavlE`,
					},
				}
			)
			.then(res => toast.success(res.data.message))
			.catch(err => {
				console.log(err)
				toast.error(err.response.data.message)
			})
	}

	const formik = useFormik({
		initialValues: {
			name: '',
			sourceType: '',
			serviceNo: '',
			make: '',
			model: '',
			capacity: '',
			edc: '',
			substation: '',
			latitude: '',
			longitude: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Required'),
			sourceType: Yup.string().required('Required'),
			serviceNo: Yup.string().required('Required'),
			make: Yup.string().required('Required'),
			model: Yup.string().required('Required'),
			capacity: Yup.string().required('Required'),
			edc: Yup.string().required('Required'),
			substation: Yup.string().required('Required'),
			latitude: Yup.string().required('Required'),
			longitude: Yup.string().required('Required'),
		}),
		onSubmit: asset => {
			console.log(asset)
			handleNewAsset(asset)
		},
	})

	return (
		<div className="fixed top-0 w-10/12 z-50">
			<div className="min-h-screen bg-purple-1 flex items-center justify-center bg-center bg-no-repeat bg-cover">
				<div className="w-9/12 bg-white rounded-lg p-4 max-h-screen overflow-y-scroll">
					<h1 className="text-lg text-purple-1 pt-3 text-center font-bold">
						Create a New Asset
					</h1>
					<form onSubmit={formik.handleSubmit}>
						<div className="flex justify-evenly">
							<div className="w-10/12 px-4">
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Name
									</label>
									<input
										type="text"
										autocapitalize="word"
										placeholder="Name"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										{...formik.getFieldProps('name')}
									/>
									{formik.touched.name && formik.errors.name ? (
										<div>{formik.errors.name}</div>
									) : null}
								</div>
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Service Number
									</label>
									<input
										placeholder="Service Number"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('serviceNo')}
									/>
									{formik.touched.serviceNo && formik.errors.serviceNo ? (
										<div>{formik.errors.serviceNo}</div>
									) : null}
								</div>

								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Make
									</label>
									<input
										placeholder="Make"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('make')}
									/>
									{formik.touched.make && formik.errors.make ? (
										<div>{formik.errors.make}</div>
									) : null}
								</div>
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Model
									</label>
									<input
										placeholder="Modal"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('model')}
									/>
									{formik.touched.model && formik.errors.model ? (
										<div>{formik.errors.model}</div>
									) : null}
								</div>
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Capacity
									</label>
									<input
										placeholder="Capacity"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('capacity')}
									/>
									{formik.touched.capacity && formik.errors.capacity ? (
										<div>{formik.errors.capacity}</div>
									) : null}
								</div>
							</div>

							<div className="w-10/12 px-4">
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										EDC
									</label>
									<input
										placeholder="EDC"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('edc')}
									/>
									{formik.touched.edc && formik.errors.edc ? (
										<div>{formik.errors.edc}</div>
									) : null}
								</div>
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Sub Station
									</label>
									<input
										placeholder="Sub Station"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('substation')}
									/>
									{formik.touched.substation && formik.errors.substation ? (
										<div>{formik.errors.substation}</div>
									) : null}
								</div>
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Latitude
									</label>
									<input
										placeholder="Latitude"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('latitude')}
									/>
									{formik.touched.latitude && formik.errors.latitude ? (
										<div>{formik.errors.latitude}</div>
									) : null}
								</div>
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Longitude
									</label>
									<input
										placeholder="Longitude"
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										type="tel"
										{...formik.getFieldProps('longitude')}
									/>
									{formik.touched.longitude && formik.errors.longitude ? (
										<div>{formik.errors.longitude}</div>
									) : null}
								</div>
								<div className="my-2 flex flex-col">
									<label className="text-sm text-purple-1 py-1.5 font-semibold">
										Source Type
									</label>
									<select
										className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
										{...formik.getFieldProps('sourceType')}
									>
										<option disabled value="">
											Select UOM
										</option>
										<option value="Wind">Wind</option>
										<option value="Solar">Solar</option>
										<option value="Bio Mass">Bio Mass</option>
										<option value="Hydro Power">Hydro Power</option>
										<option value="Geothermal">Geothermal</option>
									</select>
									{formik.touched.sourceType && formik.errors.sourceType ? (
										<div>{formik.errors.sourceType}</div>
									) : null}
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
						>
							Create New Product
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
