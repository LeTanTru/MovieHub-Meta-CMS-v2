import { apiConfig } from '@/constants';

const defineRoute = <T extends Record<string, any>>(routes: T): T => routes;

const route = defineRoute({
  home: {
    path: '/'
  },
  admin: {
    getList: {
      path: '/admin',
      auth: true,
      permissionCode: [apiConfig.account.getList.permissionCode]
    }
  },
  employee: {
    path: '/employee'
  },
  group: {
    getList: {
      path: '/group-permission',
      auth: true,
      permissionCode: [apiConfig.group.getList.permissionCode]
    },
    savePage: {
      path: '/group-permission/:id',
      auth: true,
      permissionCode: [
        apiConfig.group.create.permissionCode,
        apiConfig.group.update.permissionCode
      ]
    }
  },
  login: {
    path: '/login',
    auth: false
  },
  profile: {
    savePage: {
      path: '/profile',
      auth: true
    }
  }
});

export default route;
