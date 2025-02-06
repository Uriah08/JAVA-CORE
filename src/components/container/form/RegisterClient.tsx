import React from 'react'
import { useState } from 'react'
import { registerSchema } from '@/schema'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from "lucide-react";
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

import { useRegisterClientMutation } from '@/store/api'

const RegisterClient = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast()
    const [registerClient, {isLoading}] = useRegisterClientMutation()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>){
        try {
            const response = await registerClient(values).unwrap()
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
        name="username"
        render={({ field }) => (
          <FormItem className="w-full relative group">
            <FormLabel>Username</FormLabel>
            <FormControl>
                <Input
                type='text'
                  placeholder="Enter the username"
                  {...field}
                />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full relative group">
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input
                type='email'
                  placeholder="Enter the email"
                  {...field}
                />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="w-full relative group">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the password"
                  {...field}
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
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="w-full relative group">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the password"
                  {...field}
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
      <Button disabled={isLoading} className='bg-main text-white hover:bg-follow'>{isLoading ? 'Creating...' : 'Create Client'}</Button>
        </form>
    </Form>
  )
}

export default RegisterClient