import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const SecretaryProtected = ({ children }) => {
    const { secreatry } = useSelector(state => state.auth)

    return secreatry ? children : <Navigate to="/secretary-login" />
}

export default SecretaryProtected




