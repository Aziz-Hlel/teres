import { useSelectedRow } from '../../context/selected-row-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';
import { MODULE_NAME } from '../../core/core';
import { updateEventSchema, type UpdateEventSchema } from '@repo/contracts/schemas/events/updateEventSchema';
import eventService from '@/Api/service/eventService';
import FormUI from '../shared/FormUI';

const UpdateDialog = () => {
  const { handleCancel, currentRow, openDialog } = useSelectedRow();

  if (!currentRow) throw new Error('No current row');

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MODULE_NAME, 'update'],
    mutationFn: eventService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MODULE_NAME], exact: false });
      handleCancel();
    },
  });

  if (!currentRow) return null;

  const defaultValues: UpdateEventSchema = {
    description: currentRow.description,
    thumbnailId: currentRow.thumbnail?.id ?? '',
  };

  const form = useForm<UpdateEventSchema>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: defaultValues,
  });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      handleCancel();
    }
  };

  const onSubmit: SubmitHandler<UpdateEventSchema> = async (data) => {
    try {
      await mutateAsync({ id: currentRow.id, data });
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const dialogIsOpen = openDialog === 'edit';
  console.log(form.formState.errors);

  const thumbnailErrors = [form.formState.errors.thumbnailId?.message];

  const clearMediaErrors = () => {
    form.clearErrors('thumbnailId');
  };

  const handleThumbnailUpload = (newMediaId: string | null) => {
    form.setValue(
      'thumbnailId',
      newMediaId ?? '',
      newMediaId ? { shouldDirty: true, shouldValidate: true } : undefined,
    );
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={dialogIsOpen}>
      <DialogContent className="sm:max-w-106.25 h-[calc(100dvh-4rem)] flex flex-col overflow-hidden  ">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full">
          <DialogHeader>
            <DialogTitle className=" text-center">Update Product</DialogTitle>
            <DialogDescription className=" text-center">Fill the form below to update the product.</DialogDescription>
            <Separator />
          </DialogHeader>
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 overscroll-contain scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400">
            <FieldGroup>
              <FormUI
                form={form}
                initMedia={currentRow.thumbnail}
                thumbnailErrors={thumbnailErrors}
                clearMediaErrors={clearMediaErrors}
                handleThumbnailUpload={handleThumbnailUpload}
              />
            </FieldGroup>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className=" w-28" disabled={isPending}>
              {isPending ? <Spinner /> : <span>Save changes</span>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
