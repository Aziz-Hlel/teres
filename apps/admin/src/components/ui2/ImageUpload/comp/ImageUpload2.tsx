import type { DropzoneOptions } from 'react-dropzone';
import { useEffect, useMemo, useState } from 'react';
import useImageUpload from '../use-Image-Upload';
import CircularProgressBar from '../CircularProgressBar ';
import FileUploadComp from './FileUploadComp';
import ImageCropperCom from './ImageCropperCom';
import ImageDisplayedComp from './ImageDisplayedComp';
import { Controller, type Path, type UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type FormWithThumbnail = {
  thumbnailId: string;
  [key: string]: any;
};

interface ImageUploadProps<T extends FormWithThumbnail> {
  initMedia: { id: string; url: string; key: string } | null;
  mediaErrors: (string | undefined)[];
  handleMediaUpload: (newMediaId: string | null) => void;
  aspect?: number | null;
  clearMediaErrors: () => void;
  form: UseFormReturn<T>;
  fieldName: Path<T>;
}

const ImageUpload2 = <T extends FormWithThumbnail>({
  fieldName,
  initMedia,
  mediaErrors,
  handleMediaUpload,
  aspect: aspectProp,
  clearMediaErrors,
  form,
}: ImageUploadProps<T>) => {
  const media = form.getValues(fieldName);
  if (typeof media !== 'string') {
    throw new Error(`Media Upload Component: "${String(fieldName)}" must be a string but got ${typeof media}`);
  }

  const maxSizeInMB = 4;

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const dropZoneConfig: DropzoneOptions = {
    maxFiles: 1,
    maxSize: maxSizeInBytes,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg'],
    },
    multiple: false,
  };
  const [aspect, setAspect] = useState<number | undefined>(undefined);

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
    clearErrors: clearMediaErrors,
    handleMediaUpload,
  });

  useEffect(() => {
    if (aspectProp) return;
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setAspect(img.width / img.height);
    };
  }, [file]);

  const imgUrl: string | undefined = useMemo(() => (file ? URL.createObjectURL(file) : undefined), [file]);

  const hasErrors = mediaErrors.filter((err) => err !== undefined).length > 0;

  return (
    <>
      <div className=" h-105 ">
        <Controller<T>
          name={fieldName}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${fieldName}-input`}>Thumbnail</FieldLabel>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {currentDisplayed === 'fileUpload' && (
          <FileUploadComp
            onFileChange={onFileChange}
            maxSizeInBytes={maxSizeInBytes}
            dropZoneConfig={dropZoneConfig}
            hasErrors={hasErrors}
          />
        )}

        {currentDisplayed === 'copper' && (
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

        {currentDisplayed === 'loading' && (
          <div className="relative w-full h-full flex flex-col justify-start ">
            <div className=" text-sm text-left w-full font-semibold mb-1">Thumbnail</div>
            <div className=" text-sm text-left w-full text-gray-600 font-light mb-4">Loading ...</div>
            <div className="flex justify-center items-center mx-auto gap-2 h-full">
              <span className=" -translate-y-0.5">Loading</span>
              <CircularProgressBar progress={progress} />
            </div>
          </div>
        )}

        {currentDisplayed === 'imgDisplayed' && (
          <ImageDisplayedComp
            img={img}
            maxSizeInBytes={maxSizeInBytes}
            dropZoneConfig={dropZoneConfig}
            onFileChange={onFileChange}
            rollBackToInitImage={rollBackToInitImage}
            hasErrors={hasErrors}
          />
        )}
        {mediaErrors.map((errorMessage, index) => (
          <div key={index} className="text-red-500 text-sm">
            {errorMessage}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUpload2;
