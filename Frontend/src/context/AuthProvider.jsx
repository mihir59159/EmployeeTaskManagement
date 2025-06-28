import React, { createContext, useEffect, useState } from 'react'
import { employeeAPI } from '../services/api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = async () => {
        try {
            const response = await employeeAPI.getAllEmployees()
            setUserData(response.data)
        } catch (error) {
            console.error('Error fetching employees:', error)
        } finally {
            setLoading(false)
        }
    }

    const refreshData = () => {
        fetchEmployees()
    }

    return (
        <AuthContext.Provider value={[userData, setUserData, refreshData, loading]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
