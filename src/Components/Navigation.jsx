import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Main/Home'
import Login from './Common/Login'
import SignUp from './Common/SignUp'
import Dashboard from './Portals/Business/Pages/Dashboard'
import { useSelector } from 'react-redux'

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
				<Route path="/business/dashboard" element={<Dashboard />} />
			) : null}

			{/* Handling the Admin Routes */}

			{user?.role === 3 && authenticated ? (
				<Route path="/admin/dashboard" element={<Dashboard />} />
			) : (
				() => handleUnAuth()
			)}
			<Route path="*" element={<Login />} />
		</Routes>
	)
}

export default Navigation
