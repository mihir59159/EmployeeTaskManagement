// import React from 'react'
import Header from '../other/Header'
import CreateManager from '../other/CreateManager'
import AllEmployees from '../other/AllEmployees'
import PromoteToManager from '../other/PromoteToManager'
import DePromoteToEmployee from '../other/DePromoteToEmployee'

const AdminDashboard = (props) => {
    console.log(props.userData)
    return (
        <div className='h-screen w-full p-7'>
            <Header changeUser={props.changeUser} userData={props.userData} />
            <CreateManager />
            <PromoteToManager />
            <DePromoteToEmployee/>
            {/* <AllEmployees data={props.userData}/> */}
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
AllEmpolyee
TaskListNumbers
Header
PromoteToManager
*/