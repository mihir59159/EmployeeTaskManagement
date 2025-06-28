import React, { useState } from 'react'
import { taskAPI } from '../../services/api'

const AcceptTask = ({ data, employeeId }) => {
    const [loading, setLoading] = useState(false)

    const markCompleted = async () => {
        setLoading(true)
        try {
            await taskAPI.updateTaskStatus(employeeId, data._id, 'completed')
            window.location.reload() // Simple refresh for now
        } catch (error) {
            alert('Error updating task: ' + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const markFailed = async () => {
        setLoading(true)
        try {
            await taskAPI.updateTaskStatus(employeeId, data._id, 'failed')
            window.location.reload() // Simple refresh for now
        } catch (error) {
            alert('Error updating task: ' + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='flex justify-between mt-6'>
                <button 
                    onClick={markCompleted}
                    disabled={loading}
                    className='bg-green-500 rounded font-medium py-1 px-2 text-xs disabled:opacity-50'
                >
                    {loading ? 'Updating...' : 'Mark as Completed'}
                </button>
                <button 
                    onClick={markFailed}
                    disabled={loading}
                    className='bg-red-500 rounded font-medium py-1 px-2 text-xs disabled:opacity-50'
                >
                    {loading ? 'Updating...' : 'Mark as Failed'}
                </button>
            </div>
        </div>
    )
}

export default AcceptTask
