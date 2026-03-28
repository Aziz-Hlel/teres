import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload2 from '@/components/ui2/ImageUpload2/ImageUpload2';
import type { CreateEventSchema } from '@repo/contracts/schemas/events/createEventSchema';
import type { MediaResponse } from '@repo/contracts/schemas/media/MediaResponse';
import { Controller, type UseFormReturn } from 'react-hook-form';

const FormUI = ({
  form,
  initMedia,
  thumbnailErrors,
}: {
  form: UseFormReturn<CreateEventSchema>;
  initMedia: MediaResponse | null;
  thumbnailErrors: (string | undefined)[];
}) => {
  return (
    <>
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`description-input`}>Description</FieldLabel>
            <Textarea {...field} id={`description-input`} aria-invalid={fieldState.invalid} placeholder="Description" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <ImageUpload2
        options={{
          aspect: null,
          maxSize: 5,
        }}
        initMedia={initMedia}
        mediaErrors={thumbnailErrors}
        form={form}
        fieldName="thumbnailId"
      />
    </>
  );
};

export default FormUI;
