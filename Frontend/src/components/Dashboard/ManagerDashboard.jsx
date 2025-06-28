import React, { useState } from 'react'
import Header from '../other/Header'
import CreateEmployee from '../other/CreateEmployee'
import CreateTask from '../other/CreateTask'
import ManagerEmployeeList from '../other/ManagerEmployeeList'

const ManagerDashboard = (props) => {
    const [refreshKey, setRefreshKey] = useState(0)

    const handleEmployeeCreated = () => {
        setRefreshKey(prev => prev + 1)
    }

    return (
        <div className='h-screen w-full p-7'>
            <Header changeUser={props.changeUser} userData={props.userData} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <CreateEmployee 
                    managerId={props.userData._id} 
                    onEmployeeCreated={handleEmployeeCreated}
                />
                <CreateTask 
                    managerId={props.userData._id} 
                    key={refreshKey}
                />
            </div>
            <ManagerEmployeeList managerId={props.userData._id} />
        </div>
    )
}

export default ManagerDashboard
