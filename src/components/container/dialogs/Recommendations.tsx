import { Button } from '@/components/ui/button'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CircleAlert } from 'lucide-react'
import React from 'react'

const Recommendation = () => {
  return (
    <DialogContent>
        <DialogTitle>Add recommendation</DialogTitle>
        <Textarea placeholder='Enter your recommendation...' className='resize-none text-sm'/>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder='Select priority'/>
            </SelectTrigger>
            <SelectContent>
                {[...Array(6)].map((_,index) => (
                  <SelectItem key={index} value={`P${index + 1}`}>
                    P{index + 1}
                  </SelectItem>
                ))}
                </SelectContent>
        </Select>
        <div className='flex flex-col gap-3 border p-3 rounded-lg'>
          <div className='flex gap-3 items-center justify-center'>
          <CircleAlert className='text-zinc-500' size={20}/>
          <h1 className='text-sm font-semibold text-center'>Maintenance Priority Description</h1>
          </div>
          <div className='flex flex-col gap-1 text-sm'>
            <p><span className='font-bold'>P1</span> - Immediate action is recommended.</p>
            <p><span className='font-bold'>P2</span> - Action within a week is recommended.</p>
            <p><span className='font-bold'>P3</span> - Action within a fortnight is recommended.</p>
            <p><span className='font-bold'>P4</span> - Action within a month is recommended.</p>
            <p><span className='font-bold'>P5</span> - Planned maintenance, approximately within 3 months is recommended.</p>
            <p><span className='font-bold'>P6</span> - No actions is required.</p>
          </div>
        </div>
        <div className='flex gap-3 w-full justify-end'>
            <Button variant={'outline'}>Cancel</Button>
            <Button className='bg-main text-white hover:bg-follow'>Add</Button>
        </div>
    </DialogContent>
  )
}

export default Recommendation