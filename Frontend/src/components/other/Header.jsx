import React, { useState } from 'react'

const Header = (props) => {
    const [user, setUser] = useState('')

    const logOutUser = () => {
        localStorage.removeItem('loggedInUser')
        if (props.changeUser) {
            props.changeUser('')
        }
        window.location.reload()
    }

    return (
        <div className='flex items-end justify-between mb-6 text-black'>
            <h1 className='text-2xl font-medium '>
                Hello <br />
                <span className='text-3xl font-semibold'>
                    {props.userData?.firstName || props.data?.firstName} 👋
                </span>
            </h1>
            <div className='flex items-center gap-4'>
                <div className='text-right'>
                    {/* <span className='text-lg capitalize bg-gray-700 px-3 py-1 rounded text-white'>
                        {props.userData?.role || props.data?.role}
                    </span> */}
                    {props.userData?.email || props.data?.email && (
                        <p className='text-sm text-gray-400 mt-1'>
                            {props.userData?.email || props.data?.email}
                        </p>
                    )}
                </div>
                <button 
                    onClick={logOutUser}
                    className='bg-red-600 hover:bg-red-700 text-base font-medium text-white px-5 py-2 rounded-sm transition-colors'
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default Header
