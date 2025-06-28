// import React, { createContext, useEffect, useState } from 'react'
// import { employeeAPI } from '../services/api'

// export const AuthContext = createContext()

// const AuthProvider = ({ children }) => {
//     const [userData, setUserData] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         fetchEmployees()
//     }, [])

//     const fetchEmployees = async () => {
//         try {
//             const response = await employeeAPI.getAllEmployees()
//             setUserData(response.data)
//         } catch (error) {
//             console.error('Error fetching employees:', error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const refreshData = () => {
//         fetchEmployees()
//     }

//     return (
//         <AuthContext.Provider value={[userData, setUserData, refreshData, loading]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthProvider


import React, { createContext, useEffect, useState } from 'react'
import { authAPI, employeeAPI } from '../services/api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('loggedInUser')
    if (stored) {
      const user = JSON.parse(stored)
      setUserData(user.role === 'admin' ? [] : [user.data])
      refreshData()
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const res = await authAPI.login(email, password)
      const user = res.data
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUserData(user.role === 'admin' ? [] : [user.data])
      if (user.role === 'admin') await refreshData()
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setUserData(null)
    setError(null)
  }

  const refreshData = async () => {
    const stored = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!stored) return

    try {
      if (stored.role === 'admin') {
        const res = await employeeAPI.getAllEmployees()
        setUserData(res.data)
      } else {
        const res = await employeeAPI.getEmployeeById(stored.data._id)
        const updatedUser = { ...stored, data: res.data }
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))
        setUserData([res.data])
      }
    } catch (err) {
      setError('Failed to refresh data')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        login,
        logout,
        loading,
        error,
        refreshData,
        isAuthenticated: () => !!userData,
        clearError: () => setError(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
