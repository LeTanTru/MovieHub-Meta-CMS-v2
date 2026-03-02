import AppConstants from '@/constants/app';
import type { ApiConfigGroup } from '@/types';

const baseHeader = { 'Content-Type': 'application/json' };
const multipartHeader = { 'Content-Type': 'multipart/form-data' };

const defineApiConfig = <T extends ApiConfigGroup>(config: T) => config;

const apiConfig = defineApiConfig({
  auth: {
    login: {
      baseUrl: `${AppConstants.apiUrl}/api/token`,
      method: 'POST',
      headers: baseHeader,
      isRequiredXClientType: true
    },
    logout: {
      baseUrl: `${AppConstants.apiUrl}/v1/auth/logout`,
      method: 'POST',
      headers: baseHeader,
      isRequiredXClientType: true
    },
    refreshToken: {
      baseUrl: `${AppConstants.apiUrl}/api/token`,
      method: 'POST',
      headers: baseHeader,
      isRequiredXClientType: true
    }
  },
  account: {
    createAdmin: {
      baseUrl: `${AppConstants.apiUrl}/v1/account/create-admin`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'ACC_C_AD',
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}/v1/account/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'ACC_D',
      isRequiredXClientType: true
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}/v1/account/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'ACC_V',
      isRequiredXClientType: true
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}/v1/account/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'ACC_L',
      isRequiredXClientType: true
    },
    getProfile: {
      baseUrl: `${AppConstants.apiUrl}/v1/account/profile`,
      method: 'GET',
      headers: baseHeader,
      isRequiredXClientType: true
    },
    updateAdmin: {
      baseUrl: `${AppConstants.apiUrl}/v1/account/update-admin`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'ACC_U_AD',
      isRequiredXClientType: true
    },
    updateProfileAdmin: {
      baseUrl: `${AppConstants.apiUrl}/v1/account/update-profile-admin`,
      method: 'PUT',
      headers: baseHeader,
      isRequiredXClientType: true
    }
  },
  business: {
    checkTenant: {
      baseUrl: `${AppConstants.apiUrl}/v1/business/check-tenant`,
      method: 'GET',
      headers: baseHeader,
      isRequiredXClientType: true
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}/v1/business/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'BUS_C',
      isRequiredXClientType: true
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}/v1/business/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'BUS_V',
      isRequiredXClientType: true
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}/v1/business/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'BUS_L',
      isRequiredXClientType: true
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}/v1/business/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'BUS_U',
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}/v1/business/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'BUS_D',
      isRequiredXClientType: true
    },
    configSns: {
      baseUrl: `${AppConstants.apiUrl}/v1/business/config-sns/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'SNS_CONFIG',
      isRequiredXClientType: true
    }
  },
  customer: {
    autoComplete: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/auto-complete`,
      method: 'GET',
      headers: baseHeader,
      isRequiredXClientType: true
    },
    changeStatus: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/change-status`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'CUS_U',
      isRequiredXClientType: true
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'CUS_C',
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'CUS_D',
      isRequiredXClientType: true
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'CUS_V',
      isRequiredXClientType: true
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'CUS_L',
      isRequiredXClientType: true
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'CUS_U',
      isRequiredXClientType: true
    }
  },
  dbConfig: {
    create: {
      baseUrl: `${AppConstants.apiUrl}/v1/db-config/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'DB_C',
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}/v1/customer/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'DB_D',
      isRequiredXClientType: true
    },
    getByName: {
      baseUrl: `${AppConstants.apiUrl}/v1/db-config/get_by_name`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'DB_V_NAME',
      isRequiredXClientType: true
    },
    getByBusinessId: {
      baseUrl: `${AppConstants.apiUrl}/v1/db-config/get/:businessId`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'DB_V_ST',
      isRequiredXClientType: true
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}/v1/db-config/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'DB_U',
      isRequiredXClientType: true
    }
  },
  group: {
    create: {
      baseUrl: `${AppConstants.apiUrl}/v1/group/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'GR_C',
      isRequiredXClientType: true
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}/v1/group/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'GR_V',
      isRequiredXClientType: true
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}/v1/group/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'GR_L',
      isRequiredXClientType: true
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}/v1/group/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'GR_U',
      isRequiredXClientType: true
    }
  },
  groupPermission: {
    create: {
      baseUrl: `${AppConstants.apiUrl}/v1/group-permission/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'GR_PER_C',
      isRequiredXClientType: true
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}/v1/group-permission/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'GR_PER_V',
      isRequiredXClientType: true
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}/v1/group-permission/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'GR_PER_L',
      isRequiredXClientType: true
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}/v1/group-permission/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'GR_PER_U',
      isRequiredXClientType: true
    },
    updateOrdering: {
      baseUrl: `${AppConstants.apiUrl}/v1/group-permission/update-ordering`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'GR_PER_U',
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}/v1/group-permission/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'GR_PER_U',
      isRequiredXClientType: true
    }
  },
  permission: {
    create: {
      baseUrl: `${AppConstants.apiUrl}/v1/permission/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'PER_C',
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}/v1/permission/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'PER_D',
      isRequiredXClientType: true
    },
    getByIds: {
      baseUrl: `${AppConstants.apiUrl}/v1/permission/get/list-by-ids`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'PER_V',
      isRequiredXClientType: true
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}/v1/permission/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'PER_L',
      isRequiredXClientType: true
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}/v1/permission/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'PER_U',
      isRequiredXClientType: true
    }
  },
  serverProvider: {
    autoComplete: {
      baseUrl: `${AppConstants.apiUrl}/v1/server-provider/auto-complete`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'SVP_AU',
      isRequiredXClientType: true
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}/v1/server-provider/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'SVP_C',
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}/v1/server-provider/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'SVP_D',
      isRequiredXClientType: true
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}/v1/server-provider/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'SVP_U',
      isRequiredXClientType: true
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}/v1/server-provider/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'SVP_V',
      isRequiredXClientType: true
    }
  },
  file: {
    upload: {
      baseUrl: `${AppConstants.mediaUrl}/v1/file/upload`,
      method: 'POST',
      headers: multipartHeader,
      permissionCode: 'FILE_U',
      isUpload: true,
      isRequiredXClientType: true
    },
    delete: {
      baseUrl: `${AppConstants.mediaUrl}/v1/file/delete-file`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'FILE_U_D',
      isRequiredXClientType: true
    }
  },
  sns: {
    getClientToken: {
      baseUrl: `${AppConstants.apiUrl}/v1/sns/get-client-token`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'GET_SNS_CONFIG',
      isRequiredXClientType: true
    },
    sendSignal: {
      baseUrl: `${AppConstants.apiUrl}/v1/sns/send-signal`,
      method: 'POST',
      headers: baseHeader,
      isRequiredXClientType: true
    }
  }
});

export default apiConfig;
