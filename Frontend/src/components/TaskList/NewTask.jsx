import React, { useState } from 'react'
import { taskAPI } from '../../services/api'

const NewTask = ({ data, employeeId, onTaskUpdate }) => {
    const [loading, setLoading] = useState(false)

    const acceptTask = async () => {
        setLoading(true)
        try {
            await taskAPI.updateTaskStatus(employeeId, data._id, 'active')
            
            // Update local storage with new user data
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
            if (loggedInUser && loggedInUser.data._id === employeeId) {
                // Refresh the page to get updated data
                window.location.reload()
            }
            
            if (onTaskUpdate) {
                onTaskUpdate()
            }
        } catch (error) {
            alert('Error accepting task: ' + (error.response?.data?.message || error.message))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl shadow-lg'>
            <div className='flex justify-between items-center mb-3'>
                <h3 className='bg-red-600 text-white text-sm px-3 py-1 rounded font-medium'>{data.category}</h3>
                <h4 className='text-sm font-medium text-gray-800'>{new Date(data.taskDate).toLocaleDateString()}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold text-white mb-3'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-gray-100 leading-relaxed mb-4'>{data.taskDescription}</p>
            <div className='mt-auto'>
                <button 
                    onClick={acceptTask}
                    disabled={loading}
                    className='bg-green-500 hover:bg-green-600 rounded font-medium py-2 px-4 text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white'
                >
                    {loading ? 'Accepting...' : 'Accept Task'}
                </button>
            </div>
        </div>
    )
}

export default NewTask
