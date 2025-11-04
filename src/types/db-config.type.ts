import { dbConfigSchema } from '@/schemaValidations';
import { ServerProviderResType } from '@/types/server-provider.type';
import z from 'zod';

export type DbConfigBodyType = z.infer<typeof dbConfigSchema>;

export type DbConfigResType = {
  id: string;
  name: string;
  url: string;
  username: string;
  password: string;
  driverClassName: string;
  initialize: boolean;
  maxConnection: number;
  serverProviderDto: ServerProviderResType;
};
