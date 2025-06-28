import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllEmployees = () => {
    const [userData] = useContext(AuthContext)

    const allUsers = userData?.filter(user => user.role !== 'admin') || []

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <h2 className='text-xl font-semibold mb-4 text-white'>All Employees & Managers</h2>
            <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
                <h2 className='text-lg font-medium w-1/6'>Name</h2>
                <h3 className='text-lg font-medium w-1/6'>Email</h3>
                <h3 className='text-lg font-medium w-1/6'>Role</h3>
                <h5 className='text-lg font-medium w-1/6'>New Task</h5>
                <h5 className='text-lg font-medium w-1/6'>Active Task</h5>
                <h5 className='text-lg font-medium w-1/6'>Completed</h5>
                <h5 className='text-lg font-medium w-1/6'>Failed</h5>
            </div>
            <div className=''>
                {allUsers.map((user) => (
                    <div key={user._id} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
                        <h2 className='text-lg font-medium w-1/6 text-white'>{user.firstName}</h2>
                        <h3 className='text-lg font-medium w-1/6 text-gray-300'>{user.email}</h3>
                        <h3 className='text-lg font-medium w-1/6 text-yellow-400 capitalize'>{user.role}</h3>
                        <h5 className='text-lg font-medium w-1/6 text-blue-400'>{user.taskCounts?.newTask || 0}</h5>
                        <h5 className='text-lg font-medium w-1/6 text-yellow-400'>{user.taskCounts?.active || 0}</h5>
                        <h5 className='text-lg font-medium w-1/6 text-white'>{user.taskCounts?.completed || 0}</h5>
                        <h5 className='text-lg font-medium w-1/6 text-red-600'>{user.taskCounts?.failed || 0}</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllEmployees
