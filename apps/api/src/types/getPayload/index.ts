import { EventGetPayload, ProductGetPayload } from '@/generated/prisma/models';

export type ProductWithThumbnail = ProductGetPayload<{ include: { thumbnail: true } }>;
export type EventWithThumbnail = EventGetPayload<{ include: { thumbnail: true } }>;
