import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup.js'

const Signup = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const {loading, signup} = useSignup()

  const handleGenderCheckbox = (gender) => {
    setInputs({... inputs, gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Sign Up
          <span className='text-blue-500'> Chat App</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Johndoe_79' className='w-full input input-bordered h-10'
              value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10'
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password : e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" placeholder='Re-Enter Password' className='w-full input input-bordered h-10'
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({...inputs, confirmPassword : e.target.value})}
            />
          </div>

          <GenderCheckbox onCheckboxChange = {handleGenderCheckbox} selectedGender = {inputs.gender} />

          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 inline-block'>Already have an account? Login</Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Let's Chat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup 