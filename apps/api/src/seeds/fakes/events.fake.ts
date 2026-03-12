import { eventsInternal } from '@/events/events.internal';
import { eventsRepo } from '@/events/events.repo';
import { MediaStatus } from '@/generated/prisma/enums';
import { mediaRepo } from '@/media/media.repo';

const fakeSpecialEventsEvents: { desciption: string; thumbnailKey: string }[] = [
  {
    desciption: 'Special Event 1',
    thumbnailKey: 'special-event1.png',
  },
  {
    desciption: 'Special Event 2',
    thumbnailKey: 'special-event2.jpg',
  },
  {
    desciption: 'Special Event 3',
    thumbnailKey: 'special-event3.jpg',
  },
];

const seedSpecialEvents = async () => {
  for (const event of fakeSpecialEventsEvents) {
    const eventExists = await eventsInternal.seedExistByDescription(event.desciption);
    if (!eventExists) {
      eventsInternal.createSpecial({
        description: event.desciption,
        thumbnailKey: event.thumbnailKey,
      });
    }
  }
};

export default seedSpecialEvents;
