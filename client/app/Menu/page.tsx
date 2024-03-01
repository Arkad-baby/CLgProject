"use client"

import { ComboboxDemo } from '@/components/Combo';
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  quantity: z.number().min(1).max(50).nonnegative({
      message: "Quantity must be between 1 and 50.",
  }),
  food: z.string().min(2).max(50, {
    message: "Food name must be between 2 and 50 characters."
  }),
  description: z.string()
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='p-8 space-y-5'>
      <h1 className='text-center text-gray-300 text-3xl'>Order any Food</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="food"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  );
};

export default Page;
