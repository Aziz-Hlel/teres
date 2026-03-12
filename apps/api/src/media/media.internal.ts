import { MediaStatus } from '@/generated/prisma/enums';
import { CreateInternalMedia } from './media.types';

class MediaInternal {
  async generateFakeThumbnail(key: string): Promise<CreateInternalMedia> {
    return {
      baseName: key,
      key,
      fileType: key.split('.')[1],
      mimeType: key.split('.')[1],
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    };
  }
}

export const mediaInternal = new MediaInternal();
