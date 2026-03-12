import { EventDay, MediaStatus } from '@/generated/prisma/enums';
import { eventsRepo } from './events.repo';
import { mediaRepo } from '@/media/media.repo';
import { CreateInternalMedia } from '@/media/media.types';
import { eventsInternal } from './events.internal';

const events: Record<EventDay, { description: string; thumbnail: CreateInternalMedia }> = {
  MONDAY: {
    description: 'Start your week with some great vibes.',
    thumbnail: {
      baseName: 'monday.jpg',
      key: 'events/monday.jpg',
      fileType: 'jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    },
  },
  TUESDAY: {
    description: 'A chill Tuesday evening to unwind.',
    thumbnail: {
      baseName: 'tuesday.jpg',
      key: 'events/tuesday.jpg',
      fileType: 'jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    },
  },
  WEDNESDAY: {
    description: 'Mid-week get together and specials.',
    thumbnail: {
      baseName: 'wednesday.jpg',
      key: 'events/wednesday.jpg',
      fileType: 'jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    },
  },
  THURSDAY: {
    description: 'Getting ready for the weekend.',
    thumbnail: {
      baseName: 'thursday.jpg',
      key: 'events/thursday.jpg',
      fileType: 'jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    },
  },
  FRIDAY: {
    description: 'Friday night party to kick off the weekend.',
    thumbnail: {
      baseName: 'friday.jpg',
      key: 'events/friday.jpg',
      fileType: 'jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    },
  },
  SATURDAY: {
    description: 'The biggest event of the week.',
    thumbnail: {
      baseName: 'saturday.jpg',
      key: 'events/saturday.jpg',
      fileType: 'jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    },
  },
  SUNDAY: {
    description: 'Relaxing Sunday afternoon sessions.',
    thumbnail: {
      baseName: 'sunday.jpg',
      key: 'events/sunday.jpg',
      fileType: 'jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 500,
      status: MediaStatus.CONFIRMED,
    },
  },
};

const eventsInit = async () => {
  for (const eventDay of Object.values(EventDay)) {
    const eventExists = await eventsRepo.isDayExist(eventDay);
    if (!eventExists) {
      await eventsInternal.createWeekly({
        description: events[eventDay].description,
        thumbnailKey: events[eventDay].thumbnail.key,
        day: eventDay,
      });
    }
  }
};

export default eventsInit;
