import type { CreateEventSchema } from '@repo/contracts/schemas/events/createEventSchema';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';
import type { EventResponse } from '@repo/contracts/schemas/events/eventResponse';
import type { Page } from '@repo/contracts/types/page/Page';
import type { UpdateEventSchema } from '@repo/contracts/schemas/events/updateEventSchema';
import type { SimpleApiResponse } from '@repo/contracts/types/api/SimpleApiResponse.dto';

const eventService = {
  getPage: async (searchParams: { [k: string]: string | number | Array<string> }) =>
    await apiService.getThrowable<Page<EventResponse>>(apiRoutes.events.getPage(), { params: searchParams }),

  create: async (data: CreateEventSchema) =>
    await apiService.postThrowable<EventResponse>(apiRoutes.events.create(), data),

  update: async (id: string, data: UpdateEventSchema) =>
    await apiService.putThrowable<EventResponse>(apiRoutes.events.update(id), data),

  delete: async (id: string) => await apiService.delete<SimpleApiResponse>(apiRoutes.events.delete(id)),
};

export default eventService;
