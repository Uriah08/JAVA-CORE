"use client"

import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

import { useVerifyDeviceMutation, useGetCodeMutation, useGetVerifiedClientQuery } from '@/store/api'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Loading from '@/components/ui/loading'

const VerificationPage = () => {
    const router = useRouter()

    const { data: verify, isLoading: verifyLoading } = useGetVerifiedClientQuery(navigator.userAgent);
    
    React.useEffect(() => {
        if(verify?.success) {
            router.push('/')
        }
    }, [router, verify?.success])
    

    const { toast } = useToast()
    const { data: session } = useSession();
    const [otp, setOtp] = React.useState("");
    const [cooldown, setCooldown] = React.useState(0);

    React.useEffect(() => {
      if (cooldown > 0) {
          const timer = setTimeout(() => {
              setCooldown((prev) => {
                  const newCooldown = prev - 1;
                  if (newCooldown <= 0) {
                      localStorage.removeItem("otpCooldown");
                  } else {
                      localStorage.setItem("otpCooldown", JSON.stringify({ 
                          expiresAt: Date.now() + newCooldown * 1000 
                      }));
                  }
                  return newCooldown;
              });
          }, 1000);
          
          return () => clearTimeout(timer);
      }
  }, [cooldown]);

    React.useEffect(() => {
      const cooldownData = localStorage.getItem("otpCooldown");
      if (cooldownData) {
          const { expiresAt } = JSON.parse(cooldownData);
          const remainingTime = Math.ceil((expiresAt - Date.now()) / 1000);
          if (remainingTime > 0) {
              setCooldown(remainingTime);
          } else {
              localStorage.removeItem("otpCooldown");
          }
      }
  }, []);
  
    const [ verifyDevice, { isError, isLoading }] = useVerifyDeviceMutation()

    const [ getCode ] = useGetCodeMutation()

    const handleSendCode = async () => {
      if (!session?.user.id) return;
  
      try {
          const response = await getCode({ userId: session.user.id }).unwrap();
  
          if(response.remainingTime) {
            setCooldown(response.remainingTime)
          } else {
            setCooldown(60)
          }
      } catch (error) {
        const err = error as { data?: { message?: string } };
        toast({
          title: "Error",
          description: err.data?.message || "An unexpected error occurred.",
        });
      }
  };
   

    React.useEffect(() => {
        if(isError) {
            toast({
                title: 'Invalid OTP',
                description: 'Please enter valid OTP',
            })
        }
    }, [isError, router, session?.user.role, toast])

    React.useEffect(() => {
        if(otp.length === 6) {
            verifyDevice({ otp, userAgent: navigator.userAgent })
            setOtp('')
        }
    }, [otp, verifyDevice,])

    if(verifyLoading || verify?.success) {
        return (
            <Loading/>
        )
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
        <p className='text-xs text-zinc-400 text-center mb-3'>You logged in to new device. Please enter 6 digit Verification Code</p>
        <div className='shadow-lg p-4 rounded-lg border-t-[5px] border-main w-full max-w-[305px] flex justify-center flex-col items-center'>
        <h1 className='text-xl font-semibold text-center mb-5'>2FA Verification</h1>
        {isLoading ? (
            <Skeleton className='h-[40px] w-full'/>
        ) : (
            <InputOTP maxLength={6} value={otp} onChange={(value) => {
                if (/^\d*$/.test(value)) {
                  setOtp(value);
                }
              }}>
        <InputOTPGroup>
            <InputOTPSlot index={0} className='border-zinc-300'/>
            <InputOTPSlot index={1} className='border-zinc-300'/>
            <InputOTPSlot index={2} className='border-zinc-300'/>
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
            <InputOTPSlot index={3} className='border-zinc-300'/>
            <InputOTPSlot index={4} className='border-zinc-300'/>
            <InputOTPSlot index={5} className='border-zinc-300'/>
        </InputOTPGroup>
        </InputOTP>
        )}
        <Button
          onClick={handleSendCode}
          className="bg-main mt-3 hover:bg-follow w-full"
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Wait ${cooldown}s to Send Again` : "Send Verification Code"}
        </Button>
        </div>
    </div>
  )
}

export default VerificationPage