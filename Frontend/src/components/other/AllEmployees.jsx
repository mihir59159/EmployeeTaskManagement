import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const TaskListNumbers = ({ data }) => {
    const taskCounts = data?.taskCounts || {
        newTask: 0,
        active: 0,
        completed: 0,
        failed: 0
    }

     const { userData } = useContext(AuthContext);
    
    return (
        <div className='flex mt-10 justify-between gap-5 w-full'>
            <div className='rounded-xl flex-1 py-6 px-6 bg-red-400 text-black'>
                <h2 className='text-3xl font-semibold'>{taskCounts.newTask}</h2>
                <h3 className='text-xl font-medium'>New Task</h3>
            </div>
            <div className='rounded-xl flex-1 py-6 px-6 bg-blue-400 text-black'>
                <h2 className='text-3xl font-semibold'>{taskCounts.completed}</h2>
                <h3 className='text-xl font-medium'>Completed Task</h3>
            </div>
            <div className='rounded-xl flex-1 py-6 px-6 bg-green-400 text-black'>
                <h2 className='text-3xl font-semibold'>{taskCounts.active}</h2>
                <h3 className='text-xl font-medium'>Active Task</h3>
            </div>
            <div className='rounded-xl flex-1 py-6 px-6 bg-yellow-400 text-black'>
                <h2 className='text-3xl font-semibold'>{taskCounts.failed}</h2>
                <h3 className='text-xl font-medium'>Failed Task</h3>
            </div>
        </div>
    )
}

export default TaskListNumbers
