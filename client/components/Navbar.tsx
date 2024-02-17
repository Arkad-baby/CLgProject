"use client";
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';
import React from 'react'
import logo from "../public/foodLogo.png"

import Link from 'next/link';


const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  return (
    <div className='px-10 pt-5 flex justify-between items-center '>
        <div className='logo'>
            <Image src={logo} height={100} width={100} className=' w-[40px] aspect-auto md:w-[60px] cursor-pointer'  alt='logo' />
        </div>
      
        <div className=' '>
          {isSignedIn ? <Link href={"/Home"} className='ml-6 text-gray-900 bg-gray-200 px-3 py-2 rounded hover:brightness-110 transition-all cursor-pointer text-[18px]'>Home</Link> :
          <Link href={"/sign-in"} className=' text-gray-900 bg-gray-200 px-3 py-2 rounded hover:brightness-110 transition-all cursor-pointer text-[18px]'>Sign-In</Link>
          }
          
          
        </div>

    </div>
  )
}

export default Navbar