import { useSelectedRow } from '../../context/selected-row-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TableData } from '../../core/core';
import eventService from '@/Api/service/eventService';
import { toast } from 'sonner';
import DeleteDialogView from './DeleteDialogView';

const DeleteDialog = () => {
  const { handleCancel, openDialog, currentRow } = useSelectedRow();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [TableData.MODULE_NAME, 'delete'],
    mutationFn: eventService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TableData.MODULE_NAME], exact: false });
      toast.success(`${TableData.ModuleName} deleted successfully`);
      handleCancel();
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync(currentRow?.id!);
    } catch (error) {
      toast.error(`Failed to delete ${TableData.ModuleName}`);
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
