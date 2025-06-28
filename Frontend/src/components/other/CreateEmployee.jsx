import React, { useState } from 'react'
import { employeeAPI } from '../../services/api'

const CreateEmployee = ({ managerId, onEmployeeCreated }) => {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await employeeAPI.createEmployee({
                firstName,
                email,
                password,
                createdBy: managerId,
                managedBy: managerId
            })

            // Reset form
            setFirstName('')
            setEmail('')
            setPassword('')
            
            // Notify parent component
            if (onEmployeeCreated) {
                onEmployeeCreated()
            }
            
            alert('Employee created successfully!')
        } catch (error) {
            alert('Error creating employee: ' + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <h2 className='text-xl font-semibold mb-4 text-white'>Create New Employee</h2>
            <form onSubmit={submitHandler}>
                <div className='mb-4'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>First Name</h3>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400'
                        type="text"
                        placeholder='Employee Name'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Email</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400'
                        type="email"
                        placeholder='employee@example.com'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400'
                        type="text"
                        placeholder='Password'
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className='bg-green-500 py-2 hover:bg-green-600 px-5 rounded text-sm w-full disabled:opacity-50'
                >
                    {loading ? 'Creating...' : 'Create Employee'}
                </button>
            </form>
        </div>
    )
}

export default CreateEmployee
