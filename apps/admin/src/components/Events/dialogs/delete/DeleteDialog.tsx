import { useSelectedRow } from '../../context/selected-row-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TableData } from '../../core/core';
import eventService from '@/Api/service/eventService';
import { toast } from 'sonner';
import DeleteDialogView from './DeleteDialogView';
import { isAxiosError } from 'axios';
import { ApiError } from '@/Api/ApiError';

const DeleteDialog = () => {
  const { handleCancel, openDialog, currentRow } = useSelectedRow();

  if (!currentRow) throw new Error('No row selected');

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [TableData.MODULE_NAME, 'delete'],
    mutationFn: eventService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TableData.MODULE_NAME], exact: false });
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync(currentRow.id);
      toast.success(`${TableData.ModuleName} deleted successfully`);
      handleCancel();
    } catch (error) {
      isAxiosError(error) && console.log('is axios erro');
      if (error instanceof ApiError && error.status === 400) {
        toast.error('Weekly events cannot be deleted');
      } else {
        toast.error(`Failed to delete ${TableData.ModuleName}`);
      }

      handleCancel();
    }
  };
  const dialogOpen = openDialog === 'delete';

  return (
    <DeleteDialogView
      dialogOpen={dialogOpen}
      handleCancel={handleCancel}
      handleDelete={handleDelete}
      isPending={isPending}
    />
  );
};

export default DeleteDialog;
