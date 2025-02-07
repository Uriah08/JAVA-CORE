"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import ChangePassword from '@/components/container/form/ChangePassword'
import RegisterClient from '@/components/container/form/RegisterClient'

const ProfilePage = () => {

  const { data: session } = useSession()
  return (
    <div className='w-full p-5 flex flex-col lg:flex-row gap-5'>
      <div className='flex flex-col w-full lg:w-2/3 gap-5'>
      <div className='rounded-xl bg-white flex flex-col p-5 shadow-lg '>
        <h1 className='text-2xl font-bold'>User Management</h1>
        <div className='flex gap-3 items-center mt-5'>
        <h1 className='text-main text-3xl font-bold'>{session?.user.email}</h1>
        <h1 className='bg-main px-3 py-1 font-semibold text-white rounded-full'>{session?.user.role}</h1>
        </div>
          <h1 className='text-2xl text-main'>{session?.user.name}</h1>
      </div>
      <div className='rounded-xl bg-white flex flex-col p-5 shadow-lg'>
      <h1 className='text-2xl font-bold'>Search Client</h1>
      </div>
      <div className='rounded-xl bg-white flex flex-col p-5 shadow-lg'>
      <h1 className='text-2xl font-bold'>Change password</h1>
      <ChangePassword/>
      </div>
        </div>
        <div className='w-full lg:w-1/3 rounded-xl bg-white flex flex-col p-5 shadow-lg h-fit'>
        <h1 className='text-2xl font-bold'>Register Client</h1>
        <RegisterClient/>
        </div>
    </div>
  )
}

export default ProfilePage