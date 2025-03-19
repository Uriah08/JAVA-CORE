import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

import { useVerifyClientMutation } from '@/store/api';
import { toast } from '@/hooks/use-toast';

interface Props {
    client: {
        id: string;
        name?: string;
        email?: string;
    }
    onClose: () => void
}

const Verify = ({ client, onClose }: Props) => {

    const [ verifyClient, { isLoading: verifyLoading }] = useVerifyClientMutation()

    const handleVerify = async () => {
        try {
          const response = await verifyClient({ id : client.id }).unwrap()

          if(!response.success) {
            throw new Error(response.message)
          }
          toast({
            title: "Client Verified",
            description: response.message,
          });
          onClose();
        } catch (error) {
          const err = error as { data?: { message?: string } };
          toast({
            title: "Error",
            description: err.data?.message || "An unexpected error occurred.",
          });
        }
      }

  return (
    <DialogContent>
        <DialogTitle>Verify Account</DialogTitle>
        <h1>Are you sure you want to verify {client.name}?</h1>
        <div className='flex gap-5 justify-end'>
            <Button disabled={verifyLoading} onClick={handleVerify} className='bg-main hover:bg-follow'>{verifyLoading ? "Verifying..." : "Verify"}</Button>
        </div>
    </DialogContent>
  )
}

export default Verify