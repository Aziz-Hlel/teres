import { prisma } from '@/bootstrap/db.init';
import { EventDay, EventType } from '@/generated/prisma/enums';
import { mediaInternal } from '@/media/media.internal';
import { mediaRepo } from '@/media/media.repo';

class EventsInternal {
  async seedExistByDescription(description: string) {
    const event = await prisma.event.findFirst({
      where: {
        description: description,
      },
    });
    return !!event;
  }

  async createWeekly(data: { description: string; day: EventDay; thumbnailKey: string }) {
    const existingThumbnail = await mediaRepo.getById(data.thumbnailKey);
    const thumbnail = await mediaInternal.generateFakeThumbnail(data.thumbnailKey);
    const event = await prisma.event.create({
      data: {
        description: data.description,
        day: data.day,
        type: EventType.WEEKLY,
        ...(existingThumbnail ? { thumbnailId: existingThumbnail.id } : { thumbnail: { create: thumbnail } }),
      },
    });
    return event;
  }

  async createSpecial(data: { description: string; thumbnailKey: string }) {
    const existingThumbnail = await mediaRepo.getById(data.thumbnailKey);
    const thumbnail = await mediaInternal.generateFakeThumbnail(data.thumbnailKey);

    const event = await prisma.event.create({
      data: {
        description: data.description,
        type: EventType.SPECIAL,
        ...(existingThumbnail ? { thumbnailId: existingThumbnail.id } : { thumbnail: { create: thumbnail } }),
      },
    });
    return event;
  }
}

export const eventsInternal = new EventsInternal();
