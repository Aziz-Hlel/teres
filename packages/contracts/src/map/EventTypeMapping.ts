import type { EventType } from '../types/enums/enums';

const EventTypeMapping: Record<EventType, string> = {
  WEEKLY: 'Weekly Event',
  SPECIAL: 'Special Event',
};
export default EventTypeMapping;
