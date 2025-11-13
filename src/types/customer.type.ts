import {
  customerSchema,
  customerSearchSchema
} from '@/schemaValidations/customer.schema';
import { BaseSearchType } from '@/types/search.type';
import z from 'zod';

export type CustomerResType = {
  id: string;
  status: number;
  kind: number;
  username: string;
  phone: string;
  fullName: string;
  email: string;
  group: {
    id: string;
    status: number;
    modifiedDate: string;
    createdDate: string;
    name: string;
    description: string;
    kind: number;
    subKind: number;
    isSystemRole: boolean;
  };
  avatarPath: string;
  logoPath: string;
};

export type CustomerSearchType = z.infer<typeof customerSearchSchema> &
  BaseSearchType;

export type ChangeStatusCustomerBodyType = {
  id: string;
  status: number;
};

export type CustomerBodyType = z.infer<ReturnType<typeof customerSchema>>;
