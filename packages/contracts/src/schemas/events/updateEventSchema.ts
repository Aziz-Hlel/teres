import z from 'zod';

export const updateEventSchema = z.object({
  description: z.string(),
  thumbnailId: z.uuid({ error: 'Invalid thumbnail' }),
});

export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
