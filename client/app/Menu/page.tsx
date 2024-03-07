"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { food } from "../../public/constants";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  ChevronUp } from 'lucide-react';




const formSchema = z.object({
  quantity: z.string().min(1,{
    message:"Enter valid number"
  }),
  food: z.string().min(3, {
    message: "First Choose then order"
  }),
  description: z.string().optional()
});

const Page = () => {



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "1",
      food: "",
      description: ""
    },
  });



  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className='p-8 space-y-5  '>
      <h1 className='text-center  text-3xl'>Order any Food</h1>
      <Form {...form} >
        <form className="max-w-md mx-auto w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} >
          <div className='flex  gap-5 items-center'>

       
          <FormField
            control={form.control}
            name="food"
            render={({ field }) => (
              <FormItem  className='flex flex-col'>
                <FormLabel>Food</FormLabel>
                <FormControl >
                  <Select   onValueChange={field.onChange} defaultValue={field.value} >
                    <SelectTrigger  className="max-w-md w-full cursor-pointer ">
                      <SelectValue placeholder="Food" />
                    </SelectTrigger>
                    <SelectContent className='bg-white cursor-pointer'>
                      {food.map((foo: any) => (
                        <SelectItem key={foo.value} className='cursor-pointer hover:font-bold transition' value={foo.value}>{foo.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <FormItem className='mt-[-5px]' defaultValue={field.value}  >
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input value={field.value} onChange={field.onChange}  placeholder="Select quantity" />
                </FormControl>
                <FormDescription>
                  Choose how many want to have
                </FormDescription>
                <FormMessage  className='text-red-500' />
              </FormItem>
            )}
          />
             </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem defaultValue={field.value}  >
                <FormLabel>Description (opt)</FormLabel>
                <FormControl>
                  <Input  value={field.value} onChange={field.onChange}  placeholder="Anything special" />
                </FormControl>
                <FormDescription >
                  Tell us something
                </FormDescription>
                <FormMessage color='red' className='text-red-500' />
              </FormItem>
            )}
          />
          <Button variant={'default'} type='reset'  className='border' >Order More 
          <ChevronUp className="h-4 w-4 ml-2" /></Button>
          <Button variant={'default'}  className='border' type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
