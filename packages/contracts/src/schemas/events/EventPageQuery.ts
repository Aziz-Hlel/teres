import z from 'zod';
import type { EventResponse } from './eventResponse';

export type EventTableRowType = EventResponse;

export type RootKeys = keyof EventTableRowType;
export type EventTableRowKeys = RootKeys;

export const eventColumnFiltersKeys: Set<EventTableRowKeys> = new Set([] as const);

export const eventSortableColumnKeys: EventTableRowKeys[] = ['createdAt', 'type', 'updatedAt'] as const;

export const eventsQueryParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  size: z.coerce.number().int().min(5).max(50).catch(10),
  sort: z.enum(eventSortableColumnKeys).catch('updatedAt'),
  order: z.enum(['asc', 'desc']).catch('desc'),
  search: z.string().trim().catch(''),
});

export type EventTableQueryParams = z.infer<typeof eventsQueryParamsSchema>;
export type RequiredEventTableQueryParams = EventTableQueryParams;

export const eventsDefaultQuery: RequiredEventTableQueryParams = {
  page: 1,
  size: 10,
  sort: 'updatedAt',
  order: 'desc',
  search: '',
};

export type EventPageQuery = z.infer<typeof eventsQueryParamsSchema>;
