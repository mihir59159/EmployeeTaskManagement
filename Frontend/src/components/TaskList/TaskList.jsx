import React, { useContext, useState, useEffect } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { AuthContext } from '../../context/AuthProvider'

const TaskList = ({ data }) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [localTasks, setLocalTasks] = useState(data.tasks || [])

    useEffect(() => {
        setLocalTasks(data.tasks || [])
    }, [data.tasks])

    const handleTaskUpdate = () => {
        // Refresh the global data
        refreshData()
        
        // Update local storage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
        if (loggedInUser) {
            // Find updated user data
            const updatedUser = userData?.find(user => user._id === data._id)
            if (updatedUser) {
                loggedInUser.data = updatedUser
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
            }
        }
    }

    const activeTasks = localTasks.filter(task => !task.withdrawn)

    return (
        <div className='mt-10'>
            <h2 className='text-2xl font-semibold text-white mb-5'>Your Tasks</h2>
            <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5'>
                {activeTasks.length === 0 ? (
                    <div className='w-full text-center py-10'>
                        <p className='text-gray-400 text-lg'>No tasks assigned yet</p>
                        <p className='text-gray-500 text-sm mt-2'>New tasks will appear here when assigned by your manager</p>
                    </div>
                ) : (
                    activeTasks.map((task) => {
                        if (task.active) {
                            return <AcceptTask key={task._id} data={task} employeeId={data._id} onTaskUpdate={handleTaskUpdate} />
                        }
                        if (task.newTask) {
                            return <NewTask key={task._id} data={task} employeeId={data._id} onTaskUpdate={handleTaskUpdate} />
                        }
                        if (task.completed) {
                            return <CompleteTask key={task._id} data={task} employeeId={data._id} />
                        }
                        if (task.failed) {
                            return <FailedTask key={task._id} data={task} employeeId={data._id} />
                        }
                        return null
                    })
                )}
            </div>
        </div>
    )
}

export default TaskList
