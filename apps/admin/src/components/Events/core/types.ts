import {
  eventColumnFiltersKeys,
  eventsDefaultQuery,
  eventSortableColumnKeys,
  eventsQueryParamsSchema,
  type EventTableRowType,
  type RequiredEventTableQueryParams,
} from '@repo/contracts/schemas/events/EventPageQuery';

export type TableRowType = EventTableRowType;

export type TableRowKeys = EventTableRowType;

export const columnFiltersKeys = eventColumnFiltersKeys;

export const sortableColumnKeys = eventSortableColumnKeys;

export const queryParamsSchema = eventsQueryParamsSchema;

export type RequiredTableQueryParams = RequiredEventTableQueryParams;

export const defaultQuery = eventsDefaultQuery;
