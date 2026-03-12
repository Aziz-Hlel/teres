import { prisma } from '@/bootstrap/db.init';
import { Media } from '@/generated/prisma/client';
import { EventDay, EventType, MediaStatus } from '@/generated/prisma/enums';
import { EventInclude, EventOrderByWithRelationInput, EventWhereInput } from '@/generated/prisma/models';
import { CreateInternalMedia } from '@/media/media.types';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { CreateEventSchema } from '@repo/contracts/schemas/events/createEventSchema';
import { UpdateEventSchema } from '@repo/contracts/schemas/events/updateEventSchema';

class EventsRepo {
  includeThumbnail() {
    return {
      thumbnail: true,
    } as const satisfies EventInclude<DefaultArgs>;
  }

  async isExist(id: string) {
    const event = await prisma.event.findUnique({ where: { id } });
    return !!event;
  }

  async isDayExist(day: EventDay) {
    const event = await prisma.event.findUnique({ where: { day } });
    return !!event;
  }
  async getAll() {
    const events = await prisma.event.findMany({ include: this.includeThumbnail() });
    return events;
  }

  async getById(id: string) {
    const event = await prisma.event.findUnique({ where: { id }, include: this.includeThumbnail() });
    return event;
  }

  async create(data: CreateEventSchema) {
    const event = await prisma.event.create({ data: data, include: this.includeThumbnail() });
    return event;
  }

  async update(id: string, data: UpdateEventSchema) {
    const event = await prisma.event.update({ where: { id }, data: data, include: this.includeThumbnail() });
    return event;
  }

  async delete(id: string) {
    const event = await prisma.event.delete({ where: { id } });
    return event;
  }

  async getPage({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip: number;
    take: number;
    where: EventWhereInput;
    orderBy: EventOrderByWithRelationInput;
  }) {
    const events = prisma.event.findMany({
      skip,
      take,
      where,
      orderBy,
      include: this.includeThumbnail(),
    });
    const eventsCount = prisma.event.count({ where });

    const [content, totalElements] = await Promise.all([events, eventsCount]);

    return { content, totalElements };
  }
}

export const eventsRepo = new EventsRepo();
