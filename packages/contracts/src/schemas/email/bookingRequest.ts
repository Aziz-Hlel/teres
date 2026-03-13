import z from 'zod';
import { atmosphereEnum } from './atmosphereEnum';
import { guestsEnum } from './guestsEnum';

export const bookingRequestSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must contain at least 2 characters').max(100),

  lastName: z.string().trim().min(2, 'Last name must contain at least 2 characters').max(100),

  email: z.email('Invalid email address').trim(),

  phone: z.string().min(6, 'Phone number is too short').max(30, 'Phone number is too long').trim(),

  date: z.string().min(1, 'Please select a date').trim(),

  time: z.string().min(1, 'Please select a time').trim(),

  guests: z.enum(guestsEnum),

  atmosphere: z.enum(atmosphereEnum),

  notes: z.string().trim().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;
