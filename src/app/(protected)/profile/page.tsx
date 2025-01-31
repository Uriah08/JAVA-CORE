"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const ProfilePage = () => {

  const { data: session } = useSession()
  return (
    <div className='w-full p-5 flex flex-col pr-8 gap-5'>
        <div className='w-full rounded-xl bg-white flex flex-col p-3 shadow-lg'>
            {JSON.stringify(session)}
        </div>
    </div>
  )
}

export default ProfilePage