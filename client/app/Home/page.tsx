"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from '@clerk/nextjs'
import React from 'react'



const page = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded || !isSignedIn) {
  return null;
}

return (
<div> 
   <h1 className='text-center text-3xl'>Real Application begins Here!</h1>
   <h1> Hello, {user.firstName} welcome  </h1>
 
    <div className='w-[40px] aspect-auto md:w-[60px] '>
        <UserButton  />
        </div>
        </div>
)
}



export default page