import React, { createContext, useEffect, useState } from 'react'
import { authAPI, employeeAPI } from '../services/api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Initialize auth state
    useEffect(() => {
        initializeAuth()
    }, [])

    const initializeAuth = async () => {
        try {
            const token = localStorage.getItem('token')
            const loggedInUser = localStorage.getItem('loggedInUser')
            
            if (token && loggedInUser) {
                const user = JSON.parse(loggedInUser)
                
                // Verify token is still valid
                try {
                    if (user.role === 'admin') {
                        const employees = await employeeAPI.getAllEmployees()
                        setUserData(employees)
                    } else {
                        // Refresh employee data
                        const refreshedData = await employeeAPI.getEmployeeById(user.data._id)
                        const updatedUser = { ...user, data: refreshedData }
                        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))
                        setUserData([refreshedData])
                    }
                } catch (apiError) {
                    // Token might be expired
                    console.error('Token validation failed:', apiError)
                    logout()
                }
            }
        } catch (error) {
            console.error('Auth initialization error:', error)
            setError('Failed to initialize authentication')
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await authAPI.login(email, password)
            const { token, user } = response
            
            // Store auth data
            localStorage.setItem('token', token)
            localStorage.setItem('loggedInUser', JSON.stringify(user))
            
            // Set user data based on role
            if (user.role === 'admin') {
                const employees = await employeeAPI.getAllEmployees()
                setUserData(employees)
            } else {
                setUserData([user.data])
            }
            
            return { success: true, user }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        setUserData(null)
        setError(null)
    }

    const refreshData = async () => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
            if (!loggedInUser) return
            
            if (loggedInUser.role === 'admin') {
                const employees = await employeeAPI.getAllEmployees()
                setUserData(employees)
            } else {
                const refreshedData = await employeeAPI.getEmployeeById(loggedInUser.data._id)
                const updatedUser = { ...loggedInUser, data: refreshedData }
                localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))
                setUserData([refreshedData])
            }
        } catch (error) {
            console.error('Data refresh failed:', error)
            setError('Failed to refresh data')
        }
    }

    const updateUserData = (newData) => {
        setUserData(newData)
    }

    const getCurrentUser = () => {
        try {
            return JSON.parse(localStorage.getItem('loggedInUser'))
        } catch {
            return null
        }
    }

    const isAuthenticated = () => {
        return !!localStorage.getItem('token') && !!localStorage.getItem('loggedInUser')
    }

    const contextValue = {
        userData,
        setUserData: updateUserData,
        refreshData,
        login,
        logout,
        loading,
        error,
        getCurrentUser,
        isAuthenticated,
        clearError: () => setError(null)
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
