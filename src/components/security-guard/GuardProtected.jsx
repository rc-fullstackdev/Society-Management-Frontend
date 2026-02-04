import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const GuardProtected = ({ children }) => {

    const { securityGuard } = useSelector(state => state.auth)

    return securityGuard ? children : <Navigate to="/guard-login" />
}

export default GuardProtected