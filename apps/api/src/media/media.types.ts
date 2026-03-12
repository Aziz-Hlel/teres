import { MediaStatus } from '@/generated/prisma/enums';

export type CreateInternalMedia = {
  baseName: string;
  key: string;
  fileType: string;
  mimeType: string;
  fileSize: number;
  status: MediaStatus;
};
