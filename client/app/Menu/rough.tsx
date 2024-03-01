"use client"
import { ComboboxDemo } from '@/components/Combo'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { z } from "zod"

const formSchema = z.object({
  quantity: z.number().min(0).max(50,{
      message: "Quantity cannot be 0.",
  }),
  food:z.string().min(2).max(50,{
    message:"Food name cannot be less than 2 characters."
  }),
  description:z.string()
})



const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      food:"",
      description:""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
  return (
    <div className='p-8 space-y-5'>
      <h1 className='text-center text-gray-300 text-3xl'>Order any Food</h1>
      <div>
        <ComboboxDemo/>
      </div>
      <div className='w-[400px]'>
      <Input type='number' placeholder='Quantity...' />
      </div>
      <div className='w-[400px]'>
        <Input type='text'value={description} placeholder='Description...' />
      </div>
      <div>
        <Button type='submit' onSubmit={onSubmit} >Order</Button>
      </div>
    </div>
  )
}

export default page