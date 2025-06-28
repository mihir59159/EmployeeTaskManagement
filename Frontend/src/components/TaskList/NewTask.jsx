import React, { useState } from 'react'
import { taskAPI } from '../../services/api'

const NewTask = ({ data, employeeId }) => {
    const [loading, setLoading] = useState(false)

    const acceptTask = async () => {
        setLoading(true)
        try {
            await taskAPI.updateTaskStatus(employeeId, data._id, 'active')
            window.location.reload() // Simple refresh for now
        } catch (error) {
            alert('Error accepting task: ' + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='mt-4'>
                <button 
                    onClick={acceptTask}
                    disabled={loading}
                    className='bg-green-500 rounded font-medium py-2 px-4 text-sm w-full disabled:opacity-50'
                >
                    {loading ? 'Accepting...' : 'Accept Task'}
                </button>
            </div>
        </div>
    )
}

export default NewTask
