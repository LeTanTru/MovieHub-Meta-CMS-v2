import z from 'zod';

export const dbConfigSchema = z.object({
  businessId: z.string().nonempty('Bắt buộc'),
  driverClassName: z.string().nonempty('Bắt buộc'),
  initialize: z.boolean(),
  maxConnection: z.number({ error: 'Bắt buộc' }),
  password: z.string().nonempty('Bắt buộc'),
  serverProviderId: z.string().nonempty('Bắt buộc'),
  url: z.string().nonempty('Bắt buộc'),
  username: z.string().nonempty('Bắt buộc'),
  host: z.string().nonempty('Bắt buộc'),
  port: z.number({ error: 'Bắt buộc' }),
  dbName: z.string().nonempty('Bắt buộc')
});
