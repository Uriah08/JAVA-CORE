import React from 'react'
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useUpdateJobMutation } from '@/store/api';
import { useToast } from '@/hooks/use-toast';

interface Props {
    defaultReviewer: string;
    id: string;
    onClose: () => void
  }
const Reviewer = ({ defaultReviewer, id, onClose }: Props) => {
  const { toast } = useToast();
    const [updateJob, { isLoading }] = useUpdateJobMutation();
    const [reviewer, setReviewer] = React.useState(defaultReviewer);
    
    const handleUpdate = async () => {
      try {
        const response = await updateJob({reviewer,id}).unwrap()
        if(!response.success) {
          throw new Error(response.message)
        }
        toast({
          title: "Success",
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
          <DialogTitle>Assign Reviewer</DialogTitle>
          <Select onValueChange={setReviewer} defaultValue={defaultReviewer}>
            <SelectTrigger>
              <SelectValue>{reviewer || defaultReviewer}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Reviewer 1">Reviewer 1</SelectItem>
              <SelectItem value="Reviewer 2">Reviewer 2</SelectItem>
              <SelectItem value="Reviewer 3">Reviewer 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-full flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleUpdate} disabled={isLoading} className="bg-main hover:bg-follow">{isLoading ? 'Assigning...' : 'Assign'}</Button>
          </div>
        </DialogContent>
  )
}

export default Reviewer