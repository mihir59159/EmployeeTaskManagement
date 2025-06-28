import React, { useContext } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 mt-10'>
            {data.tasks?.map((task) => {
                if (!task.withdrawn) {
                    if (task.active) {
                        return <AcceptTask key={task._id} data={task} employeeId={data._id} />
                    }
                    if (task.newTask) {
                        return <NewTask key={task._id} data={task} employeeId={data._id} />
                    }
                    if (task.completed) {
                        return <CompleteTask key={task._id} data={task} employeeId={data._id} />
                    }
                    if (task.failed) {
                        return <FailedTask key={task._id} data={task} employeeId={data._id} />
                    }
                }
                return null
            })}
        </div>
    )
}

export default TaskList
