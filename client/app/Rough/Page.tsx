"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export const FormSchema = z.object({
  newpickupdate: z.date({
    required_error: "A new pickup date is required.",
  }),
  newpickuptime: z.string({
    required_error: "A new pickup time is required.",
  }),
  owneraddress: z.string({
    required_error: "Owner Address is required.",
  }),
  finalprice: z.string({
    required_error: "Final Price is required.",
  }),
  paymentmethod: z.string({
    required_error: "Payment Method is required.",
  }),
});

export function CreateLeadForm({ lead }: { lead: any }) {
  console.log(lead);
  const [progress, setProgress] = useState(1);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    ShowProgress();
    const res = await fetch(`/api/completeMyLead`, {
      method: "POST",
      body: JSON.stringify({
        request: {
          customerid: lead.assignedvendor,
          leadid: lead.id,
          isCompleted: lead.isCompleted,
          city: lead.city,
          pincode: lead.pincode,
          upino: lead.upino,
          bankacno: lead.bankacno,
          bankifsccode: lead.bankifscode,
          bankbeneficiaryname: lead.bankbeneficiaryname,
          bankname: lead.bankname,
          finalgeneratedprice: data.finalprice,
          owneraddress: data.owneraddress,
          paymentmode: data.paymentmethod,
          pickupdate: GetDate({ dateString: data.newpickupdate }),
          pickuptime: data.newpickuptime,
        },
      }),
    });
    const result = await res.json();
    if (result.success) {
      toast({
        title: "Success",
        description: <p className=" text-green-500">{result.message}</p>,
      });
      router.refresh();
    } else {
      toast({
        title: "Unable to update",
        description: <p className=" text-[#dd9999]">{result.message}</p>,
      });
      setIsLoading(false);
    }
  }
  const ShowProgress = () => {
    setIsLoading(true);
    setProgress(8);
    setTimeout(() => setProgress(32), 500);
    setTimeout(() => setProgress(52), 500);
    setTimeout(() => setProgress(67), 500);
    setTimeout(() => setProgress(79), 500);
    setTimeout(() => setProgress(94), 500);
    setTimeout(() => setProgress(100), 500);
    setTimeout(() => setIsLoading(false), 1000);
  };
  return (
    <Form {...form}>
      <Progress
        hidden={!isLoading}
        value={progress}
        className=" fixed  right-0 top-0 z-[80] h-[2px]"
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="owneraddress"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Owner Address</FormLabel>
              <Input
                id="owneraddress"
                // defaultValue="Pune Hills, India"
                onChange={field.onChange}
                value={field.value}
                placeholder="Shivajinagar, Pune 411005, India"
                className="col-span-2"
              />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finalprice"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Final Price</FormLabel>
              <Input
                id="owneraddress"
                // onSelec={field.onChange}
                onChange={field.onChange}
                value={field.value}
                placeholder="5000"
                className="col-span-2"
              />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newpickupdate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>New Pickup Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newpickuptime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>New Pickup Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="!focus-visible:outline-none flex items-center justify-between whitespace-nowrap rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800  dark:bg-neutral-950  dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300">
                  <SelectValue placeholder="Select a pickuptime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="10:00 AM - 01:00 PM">
                      10:00 AM - 01:00 PM
                    </SelectItem>
                    <SelectItem value="01:00 PM - 04:00 PM">
                      01:00 PM - 04:00 PM
                    </SelectItem>
                    <SelectItem value="04:00 PM - 08:00 PM">
                      04:00 PM - 08:00 PM
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentmethod"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Payment Mehtod</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="!focus-visible:outline-none flex items-center justify-between whitespace-nowrap rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800  dark:bg-neutral-950  dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300">
                  <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Cod">COD</SelectItem>
                    <SelectItem value="Upi">UPI</SelectItem>
                    <SelectItem value="Bank">Bank</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          className="w-full !bg-[#82C43C] font-semibold"
          type="submit"
        >
          {isLoading ? "Processing" : "Update"}
        </Button>
      </form>
    </Form>
  );
}

export function GetDate({ dateString }: { dateString: Date }) {
  const year = dateString.getUTCFullYear();
  const month = String(dateString.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateString.getUTCDate()).padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day}`;
  return formattedDateTime;
}