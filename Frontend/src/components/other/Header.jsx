import React, { useState } from 'react'

const Header = (props) => {
    const [user, setUser] = useState('')

    const logOutUser = () => {
        localStorage.setItem('loggedInUser', '')
        props.changeUser('')
        window.location.reload()
    }

    return (
        <div className='flex items-end justify-between'>
            <h1 className='text-2xl font-medium'>
                Hello <br />
                <span className='text-3xl font-semibold'>
                    {props.userData?.firstName} 👋
                </span>
            </h1>
            <div className='flex items-center gap-4'>
                <span className='text-lg capitalize bg-gray-700 px-3 py-1 rounded'>
                    {props.userData?.role}
                </span>
                <button 
                    onClick={logOutUser}
                    className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default Header
