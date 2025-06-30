import React, { useContext, useState } from 'react'
import { taskAPI } from '../../services/api'
import { AuthContext } from '../../context/AuthProvider';

const NewTask = ({ data, employeeId }) => {
    const [loading, setLoading] = useState(false)
      const { loadUser } = useContext(AuthContext);

    const acceptTask = async () => {
        try {
            await taskAPI.updateTaskStatus(employeeId, data._id, 'active')
              await loadUser();
        } catch (error) {
            alert('Error accepting task: ' + (error.response?.data?.message || error.message))
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
                 
                    className='bg-green-500 hover:bg-green-600 rounded font-medium py-2 px-4 text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white'
                >
                    Accept Task
                </button>
            </div>
        </div>
    )
}

export default NewTask
