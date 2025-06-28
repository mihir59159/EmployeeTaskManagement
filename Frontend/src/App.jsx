import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login.jsx'
// import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import ManagerDashboard from './components/Dashboard/ManagerDashboard.jsx'
import { AuthContext } from './context/AuthProvider.jsx'
import { authAPI } from './services/api.js'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'

const App = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  // const {userData, setUserData, refreshData, loading} = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }
  }, [])

  const handleLogin = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      const { role, data } = response.data
      
      setUser(role)
      setLoggedInUserData(data)
      localStorage.setItem('loggedInUser', JSON.stringify({ role, data }))
      
      // if (role === 'employee' || role === 'manager') {
      //   // refreshData() // Refresh employee data
      // }
    } catch (error) {
      alert("Invalid Credentials")
    }
  }

  // if (loading) {
  //   return <div className="flex items-center justify-center h-screen">
  //     <div className="text-white text-xl">Loading...</div>
  //   </div>
  // }

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user === 'admin' ? (
        <AdminDashboard changeUser={setUser} userData={loggedInUserData} />
      ) : user === 'manager' ? (
        <ManagerDashboard changeUser={setUser} userData={loggedInUserData} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
      
    </>
  )
}

export default App
