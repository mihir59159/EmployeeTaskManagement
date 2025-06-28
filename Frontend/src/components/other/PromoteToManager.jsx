import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { employeeAPI } from '../../services/api'

const PromoteToManager = () => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const employees = userData?.filter(user => user.role === 'employee') || []

    const promoteToManager = async (employeeId) => {
        setLoading(true)
        try {
            await employeeAPI.updateRole(employeeId, 'manager')
            refreshData()
            alert('Employee promoted to manager successfully!')
        } catch (error) {
            alert('Error promoting employee: ' + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <h2 className='text-xl font-semibold mb-4 text-white'>Promote Employee to Manager</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {employees.map((employee) => (
                    <div key={employee._id} className='border border-gray-600 p-4 rounded'>
                        <h3 className='text-lg font-medium text-white'>{employee.firstName}</h3>
                        <p className='text-gray-400 text-sm'>{employee.email}</p>
                        <p className='text-gray-400 text-sm'>Role: {employee.role}</p>
                        <button
                            onClick={() => promoteToManager(employee._id)}
                            disabled={loading}
                            className='mt-2 bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded text-sm disabled:opacity-50'
                        >
                            Promote to Manager
                        </button>
                    </div>
                ))}
            </div>
            {employees.length === 0 && (
                <p className='text-gray-400'>No employees available for promotion.</p>
            )}
        </div>
    )
}

export default PromoteToManager
