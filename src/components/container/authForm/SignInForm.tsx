"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
        localStorage.setItem("reloaded", "false");
        toast({
          title: 'Login Successfully',
          description: 'Redirecting to home page...',
        })
        if (localStorage.getItem("reloaded") === "false") {
          localStorage.setItem("reloaded", "true");
          window.location.reload();
        }
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
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-16 w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Type your username"
                        className="pl-10 py-6 border-b-8 border-red-100 focus:border-main focus:outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Type your password"
                        className="pl-10 py-6 sm:w-[335px] md:w-[480px] lg:w-[445px] border-b-8 border-red-100 focus:border-main focus:outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
