import { EventWithThumbnail } from '@/types/getPayload';
import { EventResponse } from '@repo/contracts/schemas/events/eventResponse';
import { mediaService } from '@/media/media.service';
import { EventPageQuery } from '@repo/contracts/schemas/events/EventPageQuery';
import { Page } from '@repo/contracts/types/page/Page';
import { DefaultSearchParams } from '@repo/contracts/types/api/DefaultSeachParams';
import { Pageable } from '@repo/contracts/types/page/Pageable';

export class EventsMapper {
  static toResponse(event: EventWithThumbnail): EventResponse {
    const thumbnail = mediaService.getMediaKeyAndUrl(event.thumbnail);
    return {
      id: event.id,
      description: event.description,
      thumbnail: thumbnail,
      day: event.day,
      type: event.type,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  static toResponses(events: EventWithThumbnail[]): EventResponse[] {
    return events.map(this.toResponse);
  }

  static toPageResponse(params: {
    events: EventWithThumbnail[];
    totalElements: number;
    pagination: DefaultSearchParams;
  }): Page<EventResponse> {
    return {
      content: this.toResponses(params.events),
      pagination: {
        number: params.pagination.page,
        size: params.pagination.size,
        totalElements: params.totalElements,
        totalPages: Math.ceil(params.totalElements / params.pagination.size),
        offset: params.pagination.page * params.pagination.size,
        pageSize: params.events.length,
      },
    };
  }
}
