import React from 'react'
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useUpdateJobMutation } from '@/store/api';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

interface Props {
    defaultStatus: string;
    route: string
    id: string;
    onClose: () => void
  }
const Status = ({defaultStatus, id, route, onClose}: Props) => {
    const { toast } = useToast();
    const [updateJob, { isLoading }] = useUpdateJobMutation();
    const [status, setStatus] = React.useState("");
    const handleUpdate = async () => {
      try {
        const response = await updateJob({status,id,route}).unwrap()
        if(!response.success) {
          throw new Error(response.message)
        }
        toast({
          title: "Success",
          description: response.message,
        });
        setStatus("")
        onClose();
      } catch (error) {
        const err = error as { data?: { message?: string } };
        toast({
          title: "Error",
          description: err.data?.message || "An unexpected error occurred.",
        });
      }
      setStatus("")
    }
  return (
    <DialogContent>
        <DialogTitle>Assign Reviewer</DialogTitle>
                  <Select onValueChange={setStatus} defaultValue={defaultStatus}>
                    <SelectTrigger>
                      <SelectValue>{status || "Select Status"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Waiting for Analysis"> <div className='flex gap-3 items-center'><div className='h-3 w-3 bg-main rounded-full'/> Waiting for Analysis</div></SelectItem>
                      <SelectItem value="Being Analysed"> <div className='flex gap-3 items-center'><div className='h-3 w-3 bg-orange-500 rounded-full'/> Being Analysed</div></SelectItem>
                      <SelectItem value="Being Reviewed"> <div className='flex gap-3 items-center'><div className='h-3 w-3 bg-yellow-500 rounded-full'/> Being Reviewed</div></SelectItem>
                      <SelectItem value="Report Submitted"> <div className='flex gap-3 items-center'><div className='h-3 w-3 bg-green-500 rounded-full'/> Report Submitted</div></SelectItem>
                    </SelectContent>
                  </Select>
                  {defaultStatus === "Report Submitted" || status === "Report Submitted" && (
                    <div className='flex flex-col gap-3 w-full p-2 bg-[#eee8e8] rounded-lg'>
                      <div className='flex gap-3 justify-center'>
                        <AlertCircle className='text-yellow-700'/>
                        <h1 className='text-yellow-700 font-medium'>Take Note</h1>
                      </div>
                      <p className='text-sm px-2'>
                      The job&apos;s finish date will be <span>automatically updated to today&apos;s date. </span>
                      <span className="text-red-600">This action cannot be undone.</span>
                      </p>
                    </div>
                  )}
                  <div className="w-full flex justify-end gap-3">
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                    <Button onClick={handleUpdate} disabled={isLoading || defaultStatus === "Report Submitted"} className="bg-main hover:bg-follow">{isLoading ? 'Updating...' : 'Update'}</Button>
                  </div>
    </DialogContent>
  )
}

export default Status