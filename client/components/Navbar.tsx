"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import logo from "../public/foodLogo.png"
import Link from 'next/link';


const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const { isLoaded, isSignedIn, user } = useUser()
  return (
 
   
    <nav className={` px-5 sm:px-8 transition-all md:px-10 pt-2 pb-2 flex justify-between items-center bg-white sticky inset-0 z-10 `} >
      
        <div className='logo'>
            <Image priority={true} src={logo} height={100} width={100} className=' w-[45px] sm:w-[55px] aspect-auto md:w-[60px] cursor-pointer'  alt='logo' />
        </div>
        <div className='flex justify-center items-center gap-5 '>
          {isSignedIn ? <Link href={"/RealMenu"} className='ml-6 text-gray-900 bg-gray-200 px-1 sm:px-2 md:px-3 py-2 rounded hover:brightness-110 transition-all cursor-pointer text-[18px]'>Menu</Link> :
          <Link href={"/sign-in"} className=' text-gray-900 bg-gray-200 px-1 sm:px-2 md:px-3 py-2 rounded hover:brightness-110 transition-all cursor-pointer text-[15px] sm:text-[16px] md:text-[18px]'>Sign-In</Link>
          }
      {  isSignedIn ?  
      <div className='w-[40px] aspect-auto md:w-[60px] '>
        <UserButton  />
        </div>: <span></span> }
          
        </div>
        </nav>

  )
}

export default Navbar