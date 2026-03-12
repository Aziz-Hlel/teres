import { Request, Response } from 'express';
import { SimpleApiResponse } from '@repo/contracts/types/api/SimpleApiResponse.dto';
import { eventsServices } from './events.services';
import getParam from '@/utils/getParam';
import { EventResponse } from '@repo/contracts/schemas/events/eventResponse';
import { eventsQueryParamsSchema } from '@repo/contracts/schemas/events/EventPageQuery';
import { Page } from '@repo/contracts/types/page/Page';

class EventsController {
  async create(req: Request, res: Response<EventResponse>) {
    const event = await eventsServices.create(req.body);
    res.status(201).json(event);
  }

  async update(req: Request, res: Response<EventResponse>) {
    const eventId = getParam(req, 'id');
    const event = await eventsServices.update(eventId, req.body);
    res.status(200).json(event);
  }

  async getById(req: Request, res: Response<EventResponse>) {
    const eventId = getParam(req, 'id');
    const event = await eventsServices.getById(eventId);
    res.status(200).json(event);
  }

  async getPage(req: Request, res: Response<Page<EventResponse>>) {
    const query = eventsQueryParamsSchema.parse(req.query);
    const events = await eventsServices.getPage(query);
    res.status(200).json(events);
  }

  async getAll(req: Request, res: Response<EventResponse[]>) {
    const events = await eventsServices.getAll();
    res.status(200).json(events);
  }

  async delete(req: Request, res: Response<SimpleApiResponse>) {
    const eventId = getParam(req, 'id');
    await eventsServices.delete(eventId);
    res.status(200).json({ message: 'Event deleted' });
  }
}

export const eventsController = new EventsController();
