import React, { useState } from 'react'
import { taskAPI } from '../../services/api'

const AcceptTask = ({ data, employeeId, onTaskUpdate }) => {
    const [loading, setLoading] = useState(false)

    const markCompleted = async () => {
        setLoading(true)
        try {
            await taskAPI.updateTaskStatus(employeeId, data._id, 'completed')
            
            // Update local storage and refresh
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
            if (loggedInUser && loggedInUser.data._id === employeeId) {
                window.location.reload()
            }
            
            if (onTaskUpdate) {
                onTaskUpdate()
            }
        } catch (error) {
            alert('Error updating task: ' + (error.response?.data?.message || error.message))
        } finally {
            setLoading(false)
        }
    }

    const markFailed = async () => {
        if (!window.confirm('Are you sure you want to mark this task as failed?')) {
            return
        }
        
        setLoading(true)
        try {
            await taskAPI.updateTaskStatus(employeeId, data._id, 'failed')
            
            // Update local storage and refresh
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
            if (loggedInUser && loggedInUser.data._id === employeeId) {
                window.location.reload()
            }
            
            if (onTaskUpdate) {
                onTaskUpdate()
            }
        } catch (error) {
            alert('Error updating task: ' + (error.response?.data?.message || error.message))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-yellow-400 rounded-xl shadow-lg'>
            <div className='flex justify-between items-center mb-3'>
                <h3 className='bg-red-600 text-white text-sm px-3 py-1 rounded font-medium'>{data.category}</h3>
                <h4 className='text-sm font-medium text-gray-800'>{new Date(data.taskDate).toLocaleDateString()}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold text-white mb-3'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-gray-800 leading-relaxed mb-4'>{data.taskDescription}</p>
            <div className='flex justify-between gap-2 mt-auto'>
                <button 
                    onClick={markCompleted}
                    disabled={loading}
                    className='bg-green-500 hover:bg-green-600 rounded font-medium py-2 px-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white flex-1'
                >
                    {loading ? 'Updating...' : 'Mark Completed'}
                </button>
                <button 
                    onClick={markFailed}
                    disabled={loading}
                    className='bg-red-500 hover:bg-red-600 rounded font-medium py-2 px-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white flex-1'
                >
                    {loading ? 'Updating...' : 'Mark Failed'}
                </button>
            </div>
        </div>
    )
}

export default AcceptTask
