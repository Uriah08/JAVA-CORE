import { Button } from '@/components/ui/button'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { symbols } from '@/schema'
import Image from 'next/image'

const Comments = () => {
  return (
    <DialogContent>
        <DialogTitle>Add comments</DialogTitle>
        <Textarea placeholder='Enter your comment...' className='resize-none text-sm'/>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder='Select severity'/>
            </SelectTrigger>
            <SelectContent>
                {symbols.map((symbol) => (
                    <SelectItem key={symbol.image} value={symbol.label}>
                        <div className='flex gap-3'>
                            <Image src={`/severity/${symbol.image}.png`} width={40} height={40} alt='Symbol' className="w-5 object-cover"/>
                            {symbol.label}
                        </div>
                    </SelectItem>
                ))}
                  
                </SelectContent>
        </Select>
        <div className='flex gap-3 w-full justify-end'>
            <Button variant={'outline'}>Cancel</Button>
            <Button className='bg-main text-white hover:bg-follow'>Add</Button>
        </div>
    </DialogContent>
  )
}

export default Comments