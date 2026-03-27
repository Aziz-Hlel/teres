import { useEffect, useState } from 'react';

interface IUseGetAspect {
  file: File | null;
  aspectProp?: number | null;
}

export const useGetAspect = ({ file, aspectProp }: IUseGetAspect) => {
  const [aspect, setAspect] = useState<number>(aspectProp ?? 1);

  useEffect(() => {
    if (aspectProp) return;
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setAspect(img.width / img.height);
    };
  }, [file, aspectProp]);

  return { aspect };
};
