import React from 'react'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { changePasswordSchema } from '@/schema'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useToast } from '@/hooks/use-toast';

import { useChangePasswordMutation } from '@/store/api';

const ChangePassword = () => {

  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, {isLoading}] = useChangePasswordMutation()

  const form = useForm<z.infer <typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof changePasswordSchema>){
    console.log(values);
    try {
      const response = await changePassword(values).unwrap()
      if(!response.success) {
        throw new Error(response.message)
      }
      toast({
        title: "Success",
        description: response.message,
      });
      form.reset()
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast({
        title: "Error",
        description: err.data?.message || "An unexpected error occurred.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 mt-10 flex flex-col">
      <FormField
        control={form.control}
        name="currentPassword"
        render={({ field }) => (
          <FormItem className="w-full lg:w-1/2 relative group">
            <FormLabel>Current Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  {...field}
                  className='text-sm'
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 group-hover:flex hidden items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-zinc-400" /> : <Eye className="w-5 h-5 text-zinc-400" />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="newPassword"
        render={({ field }) => (
          <FormItem className="w-full lg:w-1/2 relative group">
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Set new password"
                  {...field}
                  className='text-sm'
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 group-hover:flex items-center hidden"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-zinc-400" /> : <Eye className="w-5 h-5 text-zinc-400" />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="w-full lg:w-1/2 relative group">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Set your confirm password"
                  {...field}
                  className='text-sm'
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 group-hover:flex hidden items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-zinc-400" /> : <Eye className="w-5 h-5 text-zinc-400" />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button disabled={isLoading} className='bg-main hover:bg-follow duration-200 transition-all w-fit'>{isLoading ? 'Loading...' : 'Change Password'}</Button>
      </form>
    </Form>
  )
}

export default ChangePassword