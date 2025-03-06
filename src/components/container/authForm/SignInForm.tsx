"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { User, LockKeyhole } from "lucide-react";

import { loginSchema } from "@/schema";
import { z } from "zod";

import { useLoginUserMutation } from "@/store/api";

import { useToast } from "@/hooks/use-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

interface ErrorData {
  message: string;
}
const SignInForm = () => {

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await loginUser(values)
      
      if(response.error){
        const error = response.error as FetchBaseQueryError;

      if (error.data && (error.data as ErrorData).message) {
        throw new Error((error.data as ErrorData).message);
      } else {
        localStorage.setItem("redirected", "false");
        toast({
          title: 'Login Successfully',
          description: 'Redirecting to home page...',
        })
        window.location.reload();
      }
      }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast({
        title: 'Login Failed',
        description: error.message,
      })
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-white sm:rounded-lg shadow-md p-5 sm:p-10 w-full sm:max-w-[500px] mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Type your username"
                        className="pl-10 py-6 focus-visible:ring-0 border-b-4 border-zinc-300 focus:border-main border-t-0 border-x-0 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Type your password"
                        className="pl-10 py-6 focus-visible:ring-0 border-b-4 border-zinc-300 focus:border-main border-t-0 border-x-0 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
