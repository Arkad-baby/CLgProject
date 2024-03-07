"use client";
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

const Page = () => {

  const [formData, setFormData] = useState({
    userName: '',
    Email: '',
    uuid: '',
    hasImage: null,
    imageUrl: null
  });

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      checkUser(user);
    }
  }, [isSignedIn, user]);

  const createUser = async (user: any) => {
    const { fullName, emailAddresses, id, hasImage, imageUrl } = user;
    const email = emailAddresses.length > 0 ? emailAddresses[0].emailAddress : '';

    setFormData({
      userName: fullName,
      Email: email,
      uuid: id,
      hasImage: hasImage,
      imageUrl: imageUrl
    });

    // Make a POST request
    const res = await fetch('http://localhost:3939/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: fullName,
        Email: email,
        uuid: id,
        hasImage: hasImage,
        imageUrl: imageUrl
      }),
    })

  }


  const checkUser = async (user: any) => {
    const { id } = user;

    // Make a get request
    const res = await fetch(`http://localhost:3939/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status != 200) {
      createUser(user);
    }

  }
  return (
    
      <div>
      
        <h1 className='text-center text-3xl md:text-3xl mt-[20px]'>I am<br /><span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500'>Hungry</span></h1>
      </div>


   
  );
};

export default Page;
