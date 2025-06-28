import React from 'react'

const FailedTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-500 rounded-xl shadow-lg'>
            <div className='flex justify-between items-center mb-3'>
                <h3 className='bg-red-700 text-white text-sm px-3 py-1 rounded font-medium'>{data.category}</h3>
                <h4 className='text-sm font-medium text-gray-200'>{new Date(data.taskDate).toLocaleDateString()}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold text-white mb-3'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-gray-200 leading-relaxed mb-4'>{data.taskDescription}</p>
            <div className='mt-auto'>
                <div className='w-full bg-red-700 rounded font-medium py-2 px-2 text-sm text-center text-white flex items-center justify-center'>
                    <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                    </svg>
                    Task Failed
                </div>
            </div>
        </div>
    )
}

export default FailedTask
