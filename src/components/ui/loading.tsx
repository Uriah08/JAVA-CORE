import React from 'react'

const Loading = () => {
  return (
    <div className='w-full flex-col gap-2 absolute h-[100vh] flex items-center justify-center'>
      <div className="loading">
    <svg width="64px" height="48px">
        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
      <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
    </svg>
  </div>
  <h1 className='text-main text-sm text-center font-light'>Working...</h1>
  </div>
  )
}

export default Loading