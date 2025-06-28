import React from 'react'
import Header from '../other/Header'
import CreateManager from '../other/CreateManager'
import AllEmployees from '../other/AllEmployees'
import PromoteToManager from '../other/PromoteToManager'

const AdminDashboard = (props) => {
    return (
        <div className='h-screen w-full p-7'>
            <Header changeUser={props.changeUser} userData={props.userData} />
            <CreateManager />
            <PromoteToManager />
            <AllEmployees />
        </div>
    )
}

export default AdminDashboard


/*

createTask
ManagerEmployeeList
NewTask
AceptTask
CompleteTast
FiledTask
TaskList
AuthProvide
EmployeeDashboard
AdminDashboard--
*/