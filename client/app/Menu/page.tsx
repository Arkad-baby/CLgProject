import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import { food } from "../../public/constants";
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FoodDropDown from '@/components/FoodDropDown';




const formSchema = z.object({
  quantity: z.number().min(1).max(50).nonnegative({
    message: "Quantity must be between 1 and 50.",
  }),
  food: z.string().min(3, {
    message:"First Choose then order"
  }),
  description: z.string().optional()
});

const Page = () => {



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      food: "",
      description: ""
    },
  });



  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className='p-8 space-y-5 '>
      <h1 className='text-center  text-3xl'>Order any Food</h1>
      <Form {...form} >
        <form className="max-w-md w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} >
          <FormField
            control={form.control}
            name="food"
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Food</FormLabel>
                <FormControl>
                  <FoodDropDown  />
                </FormControl>
                <FormDescription>
                  Choose what you want to have
                </FormDescription>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="Select quantity"  />
                </FormControl>
                <FormDescription>
                  Choose how many want to have
                </FormDescription>
                <FormMessage color='red' className='text-red-500' />
              </FormItem>
            )}
          />
          <Button variant={'default'} className='border' type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
