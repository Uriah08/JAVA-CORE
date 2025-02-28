import React from 'react'

const ViewDetails = () => {
  return (
    <div className='p-4 border rounded-lg'>
      <h2 className="text-lg font-semibold">View Details</h2>
      <div className='flex flex-col border w-full mt-3'>

        <div className='flex w-full border-b'>
        <div className='w-1/2 border-r p-1 pl-2'>
          <h1 className='font-medium text-sm'>Header</h1>
        </div>
        <div className='w-1/2 p-1 pl-2'>
          <h1 className='text-sm'>Value</h1>
        </div>
        </div>

        <div className='flex w-full border-b'>
        <div className='w-1/2 border-r p-1 pl-2'>
          <h1 className='font-medium text-sm'>Header</h1>
        </div>
        <div className='w-1/2 p-1 pl-2'>
          <h1 className='text-sm'>Value</h1>
        </div>
        </div>

        <div className='flex w-full'>
        <div className='w-1/2 border-r p-1 pl-2'>
          <h1 className='font-medium text-sm'>Header</h1>
        </div>
        <div className='w-1/2 p-1 pl-2'>
          <h1 className='text-sm'>Value</h1>
        </div>
        </div>

      </div>
    </div>
  )
}

export default ViewDetails