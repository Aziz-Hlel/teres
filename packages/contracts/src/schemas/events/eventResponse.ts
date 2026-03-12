import type { EventDay, EventType } from '../../types/enums/enums';
import type { MediaResponse } from '../media/MediaResponse';

export type EventResponse = {
  id: string;
  description: string;
  thumbnail: MediaResponse | null;
  day: EventDay | null;
  type: EventType;
  createdAt: Date;
  updatedAt: Date;
};
