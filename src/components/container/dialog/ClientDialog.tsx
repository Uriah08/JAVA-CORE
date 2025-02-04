"use client"

import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useCreateClientMutation } from '@/store/api'
import { useToast } from '@/hooks/use-toast'

interface ClientDialogProps {
    onClose: () => void;
  }
const ClientDialog = ({ onClose}: ClientDialogProps) => {

    const [clientName, setClientName] = React.useState("");
    const [error, setError] = React.useState("");
    const { toast } = useToast()

    const [createClient, { isLoading }] = useCreateClientMutation();

    const handleClick = async () => {
        if (clientName.length <= 0) {
            setError("Client name is required!");
            return;
          }
          try {
            const response = await createClient({client: clientName}).unwrap()

            if(!response.success) {
                throw new Error(response.message)
            }
            setClientName("")
            toast({
              title: "Success",
              description: response.message,
            });
            onClose();
          } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            toast({
                title: "Error",
                description: err.data?.message || "An unexpected error occurred.",
            });
          }
          setError("");
      };
    
  return (
    <DialogContent aria-describedby={undefined}>
        <DialogTitle>Add New Client</DialogTitle>
        <Input 
        value={clientName}
        onChange={(e) => {
            setClientName(e.target.value);
            setError("");
          }} 
        type='text' 
        placeholder='Enter Client'/>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className='w-full flex gap-3 justify-end'>
        <DialogClose asChild>
            <Button className="bg-gray-500 hover:bg-gray-600" >Cancel</Button>
        </DialogClose>
        <Button disabled={isLoading} className="bg-main hover:bg-follow" onClick={handleClick}>{isLoading ? 'Adding...': 'Add Client'}</Button>
        </div>
    </DialogContent>
  )
}

export default ClientDialog