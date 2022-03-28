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
import { BusinessUsers } from './Portals/CRM/Component/BusinessUsers'
import Users from './Portals/CRM/Pages/Users'
import Approvals from './Portals/CRM/Pages/Approvals'
import AssetMaster from './Portals/CRM/Pages/AssetMaster'
import ProductManager from './Portals/CRM/Pages/ProductManager'
import SignUpOtp from './Common/SignUpOtp'
import { History } from './Portals/Business/Pages/History'
import Documents from './Portals/Business/Pages/Documents'
import GenerationPlan from './Portals/Business/Pages/GenerationPlan'

const Navigation = () => {
	const token = localStorage.getItem('jwt')
	const user = useSelector(state => state.user)
	const authenticated = token => (token ? true : false)
	console.log(authenticated)
	const navigate = useNavigate()
	const handleUnAuth = () => navigate('/login')
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUpOtp />} />

			{/* Handling the Admin Routes */}

			{user?.role === 3 && authenticated ? (
				<>
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
					<Route path="/admin/dashboard/users" element={<Users />} />
					<Route path="/admin/dashboard/approvals" element={<Approvals />} />
					<Route
						path="/admin/dashboard/assetmanager"
						element={<AssetMaster />}
					/>
					<Route
						path="/admin/dashboard/productmanager"
						element={<ProductManager />}
					/>
				</>
			) : (
				() => handleUnAuth()
			)}
			<Route path="*" element={<Login />} />
		</Routes>
	)
}

export default Navigation
