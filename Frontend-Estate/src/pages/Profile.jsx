import React from 'react'
import {useSelector} from 'react-redux';
export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-5'>
         <img className='rounded-full h-24 w-24 cursor-pointer self-center mt-4' src={currentUser?.avatar} alt={currentUser?.name} />
          <input type="text" id='username' placeholder='username' value={currentUser?.username} className='border-2 border-gray-300 rounded-md p-2' />
          <input type="email" id='email' placeholder='Email' value={currentUser?.email} className='border-2 border-gray-300 rounded-md p-2' />
          <input type="password" id='password' placeholder='Password' value={currentUser?.password} className='border-2 border-gray-300 rounded-md p-2' />
          <button type='submit' className='bg-blue-500 text-white p-2 rounded-md hover:opacity-80 disabled:opacity-60 transition-colors'>Update</button>
          <div className='flex justify-between'>
          <span className='text-red-700 cursor-pointer hover:opacity-60'>Delete Account</span>
          <span className='text-red-700 cursor-pointer hover:opacity-60'>Sign out</span>   
          </div>
       </form>
      </div>
  )
}
