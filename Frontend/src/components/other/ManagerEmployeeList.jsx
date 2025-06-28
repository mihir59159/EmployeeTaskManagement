import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { taskAPI, employeeAPI } from '../../services/api'

const ManagerEmployeeList = ({ managerId }) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [managedEmployees, setManagedEmployees] = useState([])

    useEffect(() => {
        fetchManagedEmployees()
    }, [managerId, userData])

    const fetchManagedEmployees = async () => {
        try {
            const response = await employeeAPI.getEmployeesByManager(managerId)
            setManagedEmployees(response.data)
        } catch (error) {
            console.error('Error fetching managed employees:', error)
            // Fallback to context data
            const employees = userData?.filter(user => 
                user.role === 'employee' && user.managedBy === managerId
            ) || []
            setManagedEmployees(employees)
        }
    }

    const withdrawTask = async (employeeId, taskId) => {
        if (!window.confirm('Are you sure you want to withdraw this task?')) {
            return
        }
        
        setLoading(true)
        try {
            await taskAPI.withdrawTask(employeeId, taskId)
            await fetchManagedEmployees() // Refresh the employee list
            refreshData() // Refresh global data
            alert('Task withdrawn successfully!')
        } catch (error) {
            alert('Error withdrawing task: ' + (error.response?.data?.message || error.message))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-white'>My Employees & Their Tasks</h2>
                <button 
                    onClick={fetchManagedEmployees}
                    className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm'
                >
                    Refresh
                </button>
            </div>
            
            {managedEmployees.map((employee) => (
                <div key={employee._id} className='mb-6 border border-gray-600 rounded p-4'>
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <h3 className='text-lg font-semibold text-white'>{employee.firstName}</h3>
                            <p className='text-sm text-gray-400'>{employee.email}</p>
                        </div>
                        <div className='flex gap-4 text-sm'>
                            <span className='text-blue-400 bg-blue-900 px-2 py-1 rounded'>
                                New: {employee.taskCounts?.newTask || 0}
                            </span>
                            <span className='text-yellow-400 bg-yellow-900 px-2 py-1 rounded'>
                                Active: {employee.taskCounts?.active || 0}
                            </span>
                            <span className='text-green-400 bg-green-900 px-2 py-1 rounded'>
                                Completed: {employee.taskCounts?.completed || 0}
                            </span>
                            <span className='text-red-400 bg-red-900 px-2 py-1 rounded'>
                                Failed: {employee.taskCounts?.failed || 0}
                            </span>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {employee.tasks?.filter(task => !task.withdrawn).map((task) => (
                            <div key={task._id} className='bg-gray-800 p-3 rounded border-l-4 border-l-emerald-500'>
                                <div className='flex justify-between items-start mb-2'>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        task.newTask ? 'bg-blue-500 text-white' :
                                        task.active ? 'bg-yellow-500 text-black' :
                                        task.completed ? 'bg-green-500 text-white' :
                                        task.failed ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                                    }`}>
                                        {task.category}
                                    </span>
                                    <span className='text-xs text-gray-400'>{task.taskDate}</span>
                                </div>
                                <h4 className='font-medium text-white mb-1'>{task.taskTitle}</h4>
                                <p className='text-sm text-gray-300 mb-3 line-clamp-2'>{task.taskDescription}</p>
                                <div className='flex justify-between items-center'>
                                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                                        task.newTask ? 'bg-blue-600 text-white' :
                                        task.active ? 'bg-yellow-600 text-white' :
                                        task.completed ? 'bg-green-600 text-white' :
                                        task.failed ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
                                    }`}>
                                        {task.newTask ? 'New Task' :
                                         task.active ? 'In Progress' :
                                         task.completed ? 'Completed' :
                                         task.failed ? 'Failed' : 'Unknown'}
                                    </span>
                                    {(task.newTask || task.active) && (
                                        <button
                                            onClick={() => withdrawTask(employee._id, task._id)}
                                            disabled={loading}
                                            className='bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs disabled:opacity-50 transition-colors'
                                        >
                                            {loading ? 'Withdrawing...' : 'Withdraw'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {employee.tasks?.filter(task => !task.withdrawn).length === 0 && (
                        <div className='text-gray-400 text-center py-8 bg-gray-800 rounded'>
                            <p>No tasks assigned to this employee</p>
                        </div>
                    )}
                </div>
            ))}
            
            {managedEmployees.length === 0 && (
                <div className='text-gray-400 text-center py-8'>
                    <p>No employees under your management</p>
                    <p className='text-sm mt-2'>Create employees first to see them here</p>
                </div>
            )}
        </div>
    )
}

export default ManagerEmployeeList
