"use client";
import React from 'react'
import {menu} from "../public/constants"
import Image from 'next/image';
import Link from 'next/link';
const RunningSelect = () => {

  return (
    <div>
        <h1 className='text-center text-3xl' >Menu</h1>
    <div className='menu-container track  flex flex-nowrap justify-center items-center gap-5 px-8  py-6'>

 
        {menu.map((item:any)=>(
            <Link href={`/RealMenu/${item.value}`}  className='border flex rounded-lg h-[350px] w-[350px] flex-col justify-center items-center space-y-3 ' key={item.value} >
                    <Image style={{ borderRadius: '50%' }} className='border ' height={350} width={350} alt={item.value} src={item.img} ></Image>
                    <h1>{item.value}</h1>
                    <h1>Rs.{item.price}</h1>
            </Link>
        ))}
    </div>
    </div>
  )
}

export default RunningSelect