import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TableData } from '../../core/core';

type Props = {
  dialogOpen: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
  isPending: boolean;
};

const DeleteDialogView = ({ dialogOpen, handleCancel, handleDelete, isPending }: Props) => {
  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={handleCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{TableData.DeleteDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>{TableData.DeleteDialog.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
              {TableData.DeleteDialog.buttons.cancel}
            </AlertDialogCancel>
            <Button onClick={handleDelete} disabled={isPending} className=" bg-red-600 hover:bg-red-500">
              {TableData.DeleteDialog.buttons.submit}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteDialogView;
