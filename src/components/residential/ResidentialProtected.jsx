import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ResidentialProtected = ({ children }) => {

    const { residential } = useSelector(state => state.auth)

    return residential ? children : <Navigate to="/residential-login" />
}

export default ResidentialProtected