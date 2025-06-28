import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { taskAPI, employeeAPI } from '../../services/api'

const CreateTask = ({ managerId }) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [assignTo, setAssignTo] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [managedEmployees, setManagedEmployees] = useState([])

    // Fetch employees managed by this manager
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
            const employees = userData?.filter(emp => 
                emp.role === 'employee' && emp.managedBy === managerId
            ) || []
            setManagedEmployees(employees)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await taskAPI.createTask({
                taskTitle,
                taskDescription,
                taskDate,
                category,
                assignTo, // This should be employee ID now
                assignedBy: managerId
            })
            
            // Reset form
            setTaskTitle('')
            setCategory('')
            setAssignTo('')
            setTaskDate('')
            setTaskDescription('')
            
            // Refresh data
            refreshData()
            await fetchManagedEmployees()
            alert('Task created successfully!')
        } catch (error) {
            alert('Error creating task: ' + (error.response?.data?.message || error.message))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-white'>Create New Task</h2>
                <button 
                    onClick={fetchManagedEmployees}
                    className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm'
                >
                    Refresh Employees
                </button>
            </div>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white'
                            type="text"
                            placeholder='Make a UI design'
                            required
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white'
                            type="date"
                            required
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
                        <select
                            value={assignTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-gray-800 border-[1px] border-gray-400 mb-4 text-white'
                            required
                        >
                            <option value="" className='bg-gray-800'>Select Employee</option>
                            {managedEmployees.map(emp => (
                                <option key={emp._id} value={emp._id} className='bg-gray-800'>
                                    {emp.firstName} ({emp.email})
                                </option>
                            ))}
                        </select>
                        {managedEmployees.length === 0 && (
                            <p className='text-red-400 text-xs'>No employees found. Create employees first.</p>
                        )}
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white'
                            type="text"
                            placeholder='design, dev, etc'
                            required
                        />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400 text-white'
                        placeholder='Enter task description...'
                        required
                    ></textarea>
                    <button
                        type="submit"
                        disabled={loading || managedEmployees.length === 0}
                        className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full disabled:opacity-50'
                    >
                        {loading ? 'Creating...' : 'Create Task'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask
