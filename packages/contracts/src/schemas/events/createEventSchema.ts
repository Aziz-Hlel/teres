import z from 'zod';

export const createEventSchema = z.object({
  description: z.string(),
  thumbnailId: z.uuid({ error: 'Invalid thumbnail' }),
});

export type CreateEventSchema = z.infer<typeof createEventSchema>;
