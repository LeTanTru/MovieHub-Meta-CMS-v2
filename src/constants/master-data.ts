import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
  KIND_ADMIN,
  KIND_EMPLOYEE,
  KIND_USER,
  STATUS_ACTIVE,
  STATUS_DELETED,
  STATUS_LOCK,
  STATUS_PENDING,
  UPLOAD_AVATAR,
  UPLOAD_LOGO
} from '@/constants/constant';

export const uploadOptions = {
  LOGO: UPLOAD_LOGO,
  AVATAR: UPLOAD_AVATAR
};

export const groupKinds = [
  {
    label: 'ADMIN',
    value: KIND_ADMIN,
    color: '#EF4444'
  },
  {
    label: 'EMPLOYEE',
    value: KIND_EMPLOYEE,
    color: '#3B82F6'
  },
  {
    label: 'USER',
    value: KIND_USER,
    color: '#10B981'
  }
];

export const statusOptions = [
  {
    value: STATUS_ACTIVE,
    label: 'Hoạt động',
    color: '#28a745'
  },
  {
    value: STATUS_PENDING,
    label: 'Đang chờ',
    color: '#ffc107'
  },
  {
    value: STATUS_LOCK,
    label: 'Khóa',
    color: '#fd7e14'
  },
  {
    value: STATUS_DELETED,
    label: 'Đã xóa',
    color: '#dc3545'
  }
];

export const FieldTypes = {
  STRING: 'STRING_TYPE',
  NUMBER: 'NUMBER_TYPE',
  SELECT: 'SELECT',
  AUTOCOMPLETE: 'AUTOCOMPLETE',
  DATE: 'DATE',
  DATE_RANGE: 'DATE_RANGE'
} as const;

export type FieldType = keyof typeof FieldTypes;

export type OptionType = {
  value: string | number;
  label: string;
  [key: string]: string | number;
};

export const genderOptions: OptionType[] = [
  { value: GENDER_MALE, label: 'Nam' },
  { value: GENDER_FEMALE, label: 'Nữ' },
  { value: GENDER_OTHER, label: 'Khác' }
];

export const queryKeys = {
  ACCOUNT: 'account',
  GROUP: 'group',
  CUSTOMER: 'customer',
  GROUP_PERMISSION: 'group-permission'
};
