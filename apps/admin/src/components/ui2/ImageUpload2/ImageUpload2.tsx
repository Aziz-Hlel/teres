import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import type { MediaResponse } from '@repo/contracts/schemas/media/MediaResponse';
import { useEffect, useMemo } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { Controller, type FieldValues, type Path, type UseFormReturn } from 'react-hook-form';
import CircularProgressBar from './helper/CircularProgressBar ';
import { useGetAspect } from './hooks/use-get-aspect';
import useImageUpload from './hooks/use-Image-Upload';
import { mediaState } from './types/MediaState';
import FileUploadComp from './ui/FileUploadComp';
import ImageCropperCom from './ui/ImageCropperCom';
import ImageDisplayedComp from './ui/ImageDisplayedComp';

interface ImageUploadProps<T extends FieldValues> {
  initMedia: MediaResponse | null;
  mediaErrors: (string | undefined)[];
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  options?: {
    /**
     * Maximum size of the file in MB
     */
    maxSize?: number;
    /**
     * Aspect ratio of the image, if null or not set, it will use the aspect ratio of the uploaded image
     */
    aspect?: number | null;
  };
}

const isString = <T extends FieldValues>(media: unknown, fieldName: Path<T>): media is string => {
  if (typeof media !== 'string') {
    throw new Error(`Media Upload Component: "${String(fieldName)}" must be a string but got ${typeof media}`);
  }
  return true;
};
const ImageUpload2 = <T extends FieldValues>({
  fieldName,
  initMedia,
  mediaErrors,
  options,
  form,
}: ImageUploadProps<T>) => {
  const media = form.getValues(fieldName);

  isString(media, fieldName);

  const maxSizeInMB = 4;
  const maxSizeInBytes = (options?.maxSize ?? maxSizeInMB) * 1024 * 1024;

  const dropZoneConfig: DropzoneOptions = {
    maxFiles: 1,
    maxSize: maxSizeInBytes,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg'],
    },
    multiple: false,
  };

  const clearErrors = () => form.clearErrors(fieldName);
  const handleMediaUpload = (newMediaId: string | null) => {
    form.setValue(
      fieldName,
      newMediaId ?? ('' as any), //*
      newMediaId ? { shouldDirty: true, shouldValidate: true } : undefined,
    );
    clearErrors();
  };

  const {
    currentDisplayed,
    file,
    img,
    progress,
    zoom,
    crop,
    Crop_OptimizeImage,
    rollBackToInitImage,
    handleCancel,
    onZoomChange,
    onCropChange,
    onCropComplete,
    onFileChange,
  } = useImageUpload({
    media: initMedia,
    clearErrors,
    handleMediaUpload,
  });

  const { aspect } = useGetAspect({ file, aspectProp: options?.aspect });
  const imgUrl: string | undefined = useMemo(() => (file ? URL.createObjectURL(file) : undefined), [file]);

  const hasErrors = mediaErrors.filter((err) => err !== undefined).length > 0;

  const setError = (message: string) => {
    form.setError(fieldName, { message });
  };

  console.log({ formErrors: form.formState.errors[fieldName], fieldName });

  // useEffect(() => {
  //   form.setError(fieldName, { message: 'zibbii' });
  // }, []);

  return (
    <>
      <div className=" h-105 ">
        <Controller<T>
          name={fieldName}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${fieldName}-input`}>Thumbnail</FieldLabel>
              <FieldDescription>
                {currentDisplayed === mediaState.UPLOAD_FILE && 'Select an image to upload.'}
                {currentDisplayed === mediaState.CROP && 'Crop Image to 9:16'}
                {currentDisplayed === mediaState.UPLOADING_MEDIA && 'Uploading Media...'}
                {currentDisplayed === mediaState.READY && 'Uploaded Image'}
              </FieldDescription>

              {currentDisplayed === mediaState.UPLOAD_FILE && (
                <FileUploadComp
                  onFileChange={onFileChange}
                  maxSizeInBytes={maxSizeInBytes}
                  dropZoneConfig={dropZoneConfig}
                  hasErrors={hasErrors}
                  setError={setError}
                />
              )}

              {currentDisplayed === mediaState.CROP && (
                <ImageCropperCom
                  imgUrl={imgUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={onCropChange}
                  onZoomChange={onZoomChange}
                  handleCancel={handleCancel}
                  Crop_OptimizeImage={Crop_OptimizeImage}
                  onCropComplete={onCropComplete}
                />
              )}

              {currentDisplayed === mediaState.UPLOADING_MEDIA && (
                <div className="relative w-full h-full flex flex-col justify-start ">
                  <div className="flex justify-center items-center mx-auto gap-2 h-full">
                    <span className=" -translate-y-0.5">Loading</span>
                    <CircularProgressBar progress={progress} />
                  </div>
                </div>
              )}

              {currentDisplayed === mediaState.READY && (
                <ImageDisplayedComp
                  img={img}
                  maxSizeInBytes={maxSizeInBytes}
                  dropZoneConfig={dropZoneConfig}
                  onFileChange={onFileChange}
                  rollBackToInitImage={rollBackToInitImage}
                  hasErrors={hasErrors}
                  setError={setError}
                />
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </>
  );
};

export default ImageUpload2;
