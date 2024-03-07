"use client";
import RunningSelect from '@/components/RunningSelect';
import React from 'react'
const page =  ({ params }: { params: { name: string } })=> {
  
  console.log(params)
  return (
    <div className='w-[100vw] overflow-hidden' >
      <h1>  {params.name}</h1>
      <RunningSelect/>
    </div>
  )
}

export default page