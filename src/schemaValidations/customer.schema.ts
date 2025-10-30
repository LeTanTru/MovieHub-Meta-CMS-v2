import z from 'zod';

export const customerSearchSchema = z.object({
  fullName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  status: z.number().optional().nullable()
});
