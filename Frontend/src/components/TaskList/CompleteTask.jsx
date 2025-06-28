import React from 'react'

const CompleteTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl shadow-lg'>
            <div className='flex justify-between items-center mb-3'>
                <h3 className='bg-green-700 text-white text-sm px-3 py-1 rounded font-medium'>{data.category}</h3>
                <h4 className='text-sm font-medium text-gray-800'>{new Date(data.taskDate).toLocaleDateString()}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold text-white mb-3'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-gray-800 leading-relaxed mb-4'>{data.taskDescription}</p>
            <div className='mt-auto'>
                <div className='w-full bg-green-600 rounded font-medium py-2 px-2 text-sm text-center text-white flex items-center justify-center'>
                    <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                    Task Completed
                </div>
            </div>
        </div>
    )
}

export default CompleteTask
