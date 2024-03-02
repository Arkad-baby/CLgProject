import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {food}  from "../public/constants"
const FoodDropDown = ( field:any) => {
 

  
  return (

        <Select defaultValue={field.value}  onValueChange={field.onChange}>
  <SelectTrigger className="max-w-md w-full cursor-pointer ">
    <SelectValue placeholder="Food" />
  </SelectTrigger>
  <SelectContent className='bg-white cursor-pointer'>
   { food.map((foo:any)=>(
    <SelectItem className='cursor-pointer hover:font-bold transition' value={foo.value}>{foo.label}</SelectItem>
   ))}
  </SelectContent>
</Select>
   
  )
}

export default FoodDropDown