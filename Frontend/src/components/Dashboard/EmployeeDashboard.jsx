import React, { useContext, useState, useEffect } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = () => {
    const { userData, refreshData, loading, error, getCurrentUser } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        const user = getCurrentUser()
        setCurrentUser(user)
        
        // Auto-refresh data every 30 seconds
        const interval = setInterval(() => {
            handleRefresh()
        }, 30000)

        return () => clearInterval(interval)
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            await refreshData()
        } catch (error) {
            console.error('Refresh failed:', error)
        } finally {
            setRefreshing(false)
        }
    }

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            const { logout } = useContext(AuthContext)
            logout()
            window.location.href = '/login'
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-[#1C1C1C] flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4'></div>
                    <p className='text-white text-lg'>Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='min-h-screen bg-[#1C1C1C] flex items-center justify-center'>
                <div className='text-center bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md'>
                    <div className='text-red-400 text-xl mb-2'>⚠️ Error</div>
                    <p className='text-red-300 mb-4'>{error}</p>
                    <button 
                        onClick={handleRefresh}
                        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors'
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    if (!userData || userData.length === 0) {
        return (
            <div className='min-h-screen bg-[#1C1C1C] flex items-center justify-center'>
                <div className='text-center'>
                    <p className='text-white text-lg mb-4'>No user data available</p>
                    <button 
                        onClick={handleRefresh}
                        className='bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition-colors'
                    >
                        Refresh Data
                    </button>
                </div>
            </div>
        )
    }

    const employeeData = userData[0]

    return (
        <div className='p-10 bg-[#1C1C1C] min-h-screen'>
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h1 className='text-3xl font-bold text-white'>Employee Dashboard</h1>
                    <p className='text-gray-400 mt-1'>Welcome back, {employeeData.firstName}!</p>
                </div>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className='bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50 flex items-center gap-2'
                    >
                        <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                        </svg>
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className='bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors'
                    >
                        Logout
                    </button>
                </div>
            </div>

            <Header data={employeeData} />
            <TaskListNumbers data={employeeData} />
            <TaskList data={employeeData} />
            
            {/* Status indicator */}
            <div className='fixed bottom-4 right-4'>
                <div className='bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    Auto-refresh active
                </div>
            </div>
        </div>
    )
}

export default EmployeeDashboard
