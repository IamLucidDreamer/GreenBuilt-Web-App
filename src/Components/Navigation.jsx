import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Main/Home'
import Login from './Common/Login'
import SignUp from './Common/SignUp'
import BusinessDashboard from './Portals/Business/Pages/Dashboard'
import AdminDashboard from './Portals/CRM/Pages/Dashboard'
import { useSelector } from 'react-redux'
import ProductPage from './Portals/Business/Pages/ProductPage'
import CreateProduct from './Portals/Business/Pages/CreateProduct'
import GenerateqrPage from './Portals/Business/Pages/GenerateqrPage'

const Navigation = () => {
	const token = localStorage.getItem('jwt')
	const user = useSelector(state => state.user)
	const authenticated = token => (token ? true : false)
	const navigate = useNavigate()
	const handleUnAuth = () => navigate('/login')
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />

			{/* Handling the Business Routes */}

			{user?.role === 2 && authenticated ? (
				<>
					<Route path="/business/dashboard" element={<BusinessDashboard />} />
					<Route path="/business/product" element={<ProductPage />} />
					<Route path="/business/addnewproduct" element={<CreateProduct />} />
					<Route path="/business/generateqr" element={<GenerateqrPage />} />
				</>
			) : null}

			{/* Handling the Admin Routes */}

			{user?.role === 3 && authenticated ? (
				<Route path="/admin/dashboard" element={<AdminDashboard />} />
			) : (
				() => handleUnAuth()
			)}
			<Route path="*" element={<Login />} />
		</Routes>
	)
}

export default Navigation
