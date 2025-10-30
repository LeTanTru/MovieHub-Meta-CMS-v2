import apiConfig from '@/constants/api-config';
import route from '@/routes';
import { MenuItem } from '@/types';
import { Settings, User } from 'lucide-react';

const menuConfig: MenuItem[] = [
  {
    key: 'account-management',
    label: 'Quản lý tài khoản',
    icon: User,
    permissionCode: [apiConfig.account.getList.permissionCode],
    children: [
      {
        key: 'account-list',
        label: 'Tài khoản',
        path: route.account.getList.path,
        permissionCode: [apiConfig.account.getList.permissionCode]
      }
      // {
      //   key: 'employee-list',
      //   label: 'Nhân viên',
      //   path: route.employee.path
      // }
    ]
  },
  {
    key: 'system-management',
    label: 'Quản lý hệ thống',
    icon: Settings,
    permissionCode: [
      apiConfig.group.getList.permissionCode,
      apiConfig.groupPermission.getList.permissionCode,
      apiConfig.permission.getList.permissionCode
    ],
    children: [
      {
        key: 'permission',
        label: 'Quyền',
        path: route.group.getList.path,
        permissionCode: [apiConfig.group.getList.permissionCode]
      }
    ]
  }
];

export default menuConfig;
