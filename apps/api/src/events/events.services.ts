import { CreateEventSchema } from '@repo/contracts/schemas/events/createEventSchema';
import { UpdateEventSchema } from '@repo/contracts/schemas/events/updateEventSchema';
import { eventsRepo } from './events.repo';
import { EventsMapper } from './events.mapper';
import { mediaService } from '@/media/media.service';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { EventType } from '@/generated/prisma/enums';
import { EventPageQuery } from '@repo/contracts/schemas/events/EventPageQuery';
import { Page } from '@repo/contracts/types/page/Page';
import { EventResponse } from '@repo/contracts/schemas/events/eventResponse';
import { EventOrderByWithRelationInput, EventWhereInput } from '@/generated/prisma/models';

class EventsServices {
  async create(payload: CreateEventSchema) {
    const createdEvent = await eventsRepo.create(payload);
    const eventResponse = EventsMapper.toResponse(createdEvent);
    return eventResponse;
  }

  async update(id: string, payload: UpdateEventSchema) {
    const eventExists = await eventsRepo.isExist(id);
    if (!eventExists) {
      throw new NotFoundError('Event not found');
    }
    const updatedEvent = await eventsRepo.update(id, payload);
    const eventResponse = EventsMapper.toResponse(updatedEvent);
    return eventResponse;
  }

  async getAll() {
    const events = await eventsRepo.getAll();
    const eventResponses = EventsMapper.toResponses(events);
    return eventResponses;
  }

  async getById(id: string) {
    const event = await eventsRepo.getById(id);
    if (!event) {
      throw new NotFoundError('Event not found');
    }
    const eventResponse = EventsMapper.toResponse(event);
    return eventResponse;
  }

  async getPage(queryParams: EventPageQuery): Promise<Page<EventResponse>> {
    const skip = (queryParams.page - 1) * queryParams.size;
    const take = queryParams.size;
    const { search } = queryParams;

    const where: EventWhereInput = {};

    if (search.length > 0) {
      const searchValue = search.toLowerCase();
      where.description = { contains: searchValue, mode: 'insensitive' };
    }

    const orderBy: EventOrderByWithRelationInput = {};

    if (queryParams.sort) {
      orderBy[queryParams.sort] = queryParams.order;
    }

    const { content, totalElements } = await eventsRepo.getPage({ skip, take, where, orderBy });

    const eventPage = EventsMapper.toPageResponse({
      events: content,
      totalElements,
      pagination: queryParams,
    });

    return eventPage;
  }

  async delete(id: string) {
    const event = await eventsRepo.getById(id);
    if (!event) {
      throw new NotFoundError('Event not found');
    }
    if (event.type === EventType.WEEKLY) {
      throw new BadRequestError('Weekly event cannot be deleted');
    }

    if (event.thumbnailId) {
      await mediaService.deleteMediaById(event.thumbnailId);
    }
    await eventsRepo.delete(id);
  }
}

export const eventsServices = new EventsServices();
