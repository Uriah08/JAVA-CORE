import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

import { useUpdateJobMutation } from '@/store/api';
import { useToast } from '@/hooks/use-toast';

interface Props {
  defaultAnalyst: string;
  id: string;
  onClose: () => void;
}

const Analyst = ({ defaultAnalyst, id, onClose }: Props) => {
  const { toast } = useToast();
  const [updateJob, { isLoading }] = useUpdateJobMutation();
  const [analyst, setAnalyst] = React.useState(defaultAnalyst);

  const handleUpdate = async () => {
    try {
      const response = await updateJob({analyst,id}).unwrap()
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
      <DialogTitle>Assign Analyst</DialogTitle>
      <Select onValueChange={setAnalyst} defaultValue={defaultAnalyst}>
        <SelectTrigger>
          <SelectValue>{analyst || defaultAnalyst}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Analyst 1">Analyst 1</SelectItem>
          <SelectItem value="Analyst 2">Analyst 2</SelectItem>
          <SelectItem value="Analyst 3">Analyst 3</SelectItem>
        </SelectContent>
      </Select>
      <div className="w-full flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleUpdate} disabled={isLoading} className="bg-main hover:bg-follow">{isLoading ? 'Assigning...' : 'Assign'}</Button>
      </div>
    </DialogContent>
  );
};

export default Analyst;
