import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useGetClientsQuery } from '@/store/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Verify from '../dialogs/Verify'

const VerifyClient = () => {

    const [ open, setOpen ] = useState(false)

    const { data: dataClients, isLoading: clientLoading } = useGetClientsQuery()
    const clients = dataClients?.clients?.filter(client => !client.emailVerified) || [];

  return (
    <div className='mt-5 gap-3 flex flex-col max-h-[350px] overflow-auto'>
        {clientLoading ? (
            <>
                <Skeleton className='w-full h-[50px]'/>
                <Skeleton className='w-full h-[50px]'/>
                <Skeleton className='w-full h-[50px]'/>
            </>
        ) : (
            clients.length !== 0 ? (
                clients.map((client) => {
                    const sanitizedClient = {
                        ...client,
                        name: client.name ?? undefined,
                        email: client.email ?? undefined,
                    };
                    return (
                        <div key={client.id} className='flex justify-between items-center rounded-md p-3 border'>
                            <div className='flex flex-col'>
                                <h1 className='text-base font-medium'>{sanitizedClient.name}</h1>
                                <h1 className='text-sm text-zinc-600'>{sanitizedClient.email}</h1>
                            </div>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button className='bg-main hover:bg-follow'>Verify</Button>
                                </DialogTrigger>
                                <Verify client={sanitizedClient} onClose={() => setOpen(false)}/>
                            </Dialog>
                        </div>
                    );
                })
            ) : (
                <h1 className='font-bold text-xl text-zinc-300 text-center w-full my-5'>All Clients Are Verified</h1>
            )
        )}
    </div>
  )
}

export default VerifyClient