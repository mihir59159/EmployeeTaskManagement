import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { taskAPI } from '../../services/api'

const ManagerEmployeeList = ({ managerId }) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const managedEmployees = userData?.filter(user => 
        user.role === 'employee' && user.managedBy === managerId
    ) || []

    const withdrawTask = async (employeeId, taskId) => {
        setLoading(true)
        try {
            await taskAPI.withdrawTask(employeeId, taskId)
            refreshData()
            alert('Task withdrawn successfully!')
        } catch (error) {
            alert('Error withdrawing task: ' + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <h2 className='text-xl font-semibold mb-4 text-white'>My Employees & Their Tasks</h2>
            
            {managedEmployees.map((employee) => (
                <div key={employee._id} className='mb-6 border border-gray-600 rounded p-4'>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='text-lg font-semibold text-white'>{employee.firstName}</h3>
                        <div className='flex gap-4 text-sm'>
                            <span className='text-blue-400'>New: {employee.taskCounts?.newTask || 0}</span>
                            <span className='text-yellow-400'>Active: {employee.taskCounts?.active || 0}</span>
                            <span className='text-green-400'>Completed: {employee.taskCounts?.completed || 0}</span>
                            <span className='text-red-400'>Failed: {employee.taskCounts?.failed || 0}</span>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {employee.tasks?.filter(task => !task.withdrawn).map((task) => (
                            <div key={task._id} className='bg-gray-800 p-3 rounded'>
                                <div className='flex justify-between items-start mb-2'>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        task.newTask ? 'bg-blue-500' :
                                        task.active ? 'bg-yellow-500' :
                                        task.completed ? 'bg-green-500' :
                                        task.failed ? 'bg-red-500' : 'bg-gray-500'
                                    }`}>
                                        {task.category}
                                    </span>
                                    <span className='text-xs text-gray-400'>{task.taskDate}</span>
                                </div>
                                <h4 className='font-medium text-white mb-1'>{task.taskTitle}</h4>
                                <p className='text-sm text-gray-300 mb-2'>{task.taskDescription}</p>
                                <div className='flex justify-between items-center'>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        task.newTask ? 'bg-blue-600 text-white' :
                                        task.active ? 'bg-yellow-600 text-white' :
                                        task.completed ? 'bg-green-600 text-white' :
                                        task.failed ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
                                    }`}>
                                        {task.newTask ? 'New' :
                                         task.active ? 'Active' :
                                         task.completed ? 'Completed' :
                                         task.failed ? 'Failed' : 'Unknown'}
                                    </span>
                                    {(task.newTask || task.active) && (
                                        <button
                                            onClick={() => withdrawTask(employee._id, task._id)}
                                            disabled={loading}
                                            className='bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs disabled:opacity-50'
                                        >
                                            Withdraw
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {employee.tasks?.filter(task => !task.withdrawn).length === 0 && (
                        <p className='text-gray-400 text-center py-4'>No tasks assigned</p>
                    )}
                </div>
            ))}
            
            {managedEmployees.length === 0 && (
                <p className='text-gray-400 text-center py-4'>No employees under your management</p>
            )}
        </div>
    )
}

export default ManagerEmployeeList
