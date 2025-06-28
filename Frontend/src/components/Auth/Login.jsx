import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email, password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='border-2 rounded-xl border-emerald-600 p-20'>
                <form 
                    onSubmit={submitHandler}
                    className='flex flex-col items-center justify-center'
                >
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-xl py-2 px-6 rounded-full placeholder:text-gray-400' 
                        type="email" 
                        placeholder='Enter your email'
                    />
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-xl py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' 
                        type="password" 
                        placeholder='Enter password' 
                    />
                    <button 
                        className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-xl py-2 px-8 w-full rounded-full placeholder:text-white'
                    >
                        Log in
                    </button>
                </form>
                <div className='mt-4 text-center text-gray-400'>
                    <p className='text-sm'>Demo Credentials:</p>
                    <p className='text-xs'>Admin: admin@me.com / 123</p>
                    <p className='text-xs'>Manager: manager@me.com / 123</p>
                    <p className='text-xs'>Employee: e@e.com / 123</p>
                </div>
            </div>
        </div>
    )
}

export default Login
