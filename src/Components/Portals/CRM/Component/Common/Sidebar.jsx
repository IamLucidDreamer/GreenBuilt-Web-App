import React, { useState } from 'react'
import Logo from '../../../../../assets/logoGreenbuilt.png'
import { Link } from 'react-router-dom'

function Sidebar() {
	const [collapseShow, setCollapseShow] = React.useState('hidden')
	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-purple-1 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Toggler */}
					<button
						className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
						type="button"
						onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
					>
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-4 h-4 ml-1"
							viewBox="0 0 24 24"
							className={`w-7 h-7 text-red-900 rotate-180`}
						>
							<path d="M5 12h14M12 5l7 7-7 7"></path>
						</svg>
					</button>
					{/* Brand */}
					<Link
						className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
						to="/"
					>
						<img src={Logo} alt="" className="w-10/12  mx-auto" />
					</Link>

					<div
						className={
							'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
							collapseShow
						}
					>
						{/* Collapse header */}
						<div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
							<div className="flex flex-wrap">
								<div className="w-6/12">
									<Link
										className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
										to="/"
									>
										Notus React
									</Link>
								</div>
								<div className="w-6/12 flex justify-end">
									<button
										type="button"
										className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
										onClick={() => setCollapseShow('hidden')}
									>
										<svg
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											class="w-4 h-4 ml-1"
											viewBox="0 0 24 24"
											className={`w-7 h-7 text-red-900 rotate-180`}
										>
											<path d="M5 12h14M12 5l7 7-7 7"></path>
										</svg>
									</button>
								</div>
							</div>
						</div>

						<hr className="my-4 md:min-w-full" />
						<ul className="md:flex-col md:min-w-full flex flex-col list-none">
							<li className="items-center">
								<Link
									className={
										'text-xs uppercase py-3 font-bold block ' +
										(window.location.href.indexOf('/business/dashboard') !== -1
											? 'text-white hover:text-lightBlue-600'
											: 'text-white hover:text-blueGray-500')
									}
									to="/business/dashboard"
								>
									Dashboard
								</Link>
							</li>

							<li className="items-center">
								<Link
									className="text-xs uppercase py-3 font-bold block text-white hover:text-blue-600"
									to="/admin/dashboard/users"
								>
									Users
								</Link>
							</li>

							<li className="items-center">
								<Link
									className="text-xs uppercase py-3 font-bold block text-white hover:text-blue-600"
									to="/admin/dashboard/approvals"
								>
									Approvals
								</Link>
							</li>

							<li className="items-center">
								<Link
									className="text-xs uppercase py-3 font-bold block text-white hover:text-blue-600"
									to="/admin/dashboard/assetmanager"
								>
									Asset Manager
								</Link>
							</li>
							<li className="items-center">
								<Link
									className={
										'text-xs uppercase py-3 font-bold block ' +
										(window.location.href.indexOf('/business/history') !== -1
											? 'text-white hover:text-lightBlue-600'
											: 'text-white hover:text-blueGray-500')
									}
									to="/business/history"
								>
									<i
										className={
											'fas fa-map-marked mr-2 text-sm ' +
											(window.location.href.indexOf('/business/history') !== -1
												? 'opacity-75'
												: 'text-blueGray-300')
										}
									></i>{' '}
									Points Manager
								</Link>
								<Link
									className="text-xs uppercase py-3 font-bold block text-white hover:text-blue-600"
									to="/admin/dashboard/productmanager"
								>
									Product Manager
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}

export default Sidebar
