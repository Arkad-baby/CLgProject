import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {food}  from "../public/constants"
const FoodDropDown = ( ) => {
    const [selectedFood, setSelectedFood] = useState(""); // State to store the selected food

    const handleFoodSelection = (event:any) => {
        setSelectedFood(event.target.value); // Update the state with the selected food
        console.log(selectedFood)
    };
  return (

        <Select value={selectedFood} >
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