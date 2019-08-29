import { Q_FETCH_CURRENT_USER, Q_GET_ORG_DESCENDANTS } from '@/gql';
import Auth from '@/utils/access-control';
import client from '@/utils/apollo-client';
import Logger from '@/utils/logger';
import { CondOperator, RequestQueryBuilder } from '@nestjsx/crud-request';
import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import { router } from 'umi';

export const fetchCurrentUser = async () => {
  return await client.query({
    query: Q_FETCH_CURRENT_USER,
    notifyOnNetworkStatusChange: true,
  });
};

export const getOrgDescendants = async id => {
  return await client.query({
    query: Q_GET_ORG_DESCENDANTS,
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });
};

export const getUserInfo = async () => {
  const { data } = await fetchCurrentUser();

  if (data) {
    const orgTrees = data.orgTrees;
    const user = data.me || {};
    const role = user.role;
    const org = user.org;

    let grants = {};

    if (role && role.grants) {
      grants = JSON.parse(role.grants);
    }

    const grantsObj = {};
    grantsObj[role.id] = grants;

    if (org) {
      const { data } = await getOrgDescendants(org.id);

      Auth.org = org.id;

      if (data) {
        Auth.orgDescendants = data.orgDescendants;
        Auth.orgDescendantsTrees = data.orgDescendantsTrees;
      }
    }

    Auth.isSuperAdmin = user.isSuperAdmin;
    Auth.user = user;
    Auth.orgTrees = orgTrees;

    Auth.role = role.id;
    Auth.setGrants(grantsObj);

    return user;
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem('token');

  router.replace('/user/login');

  return false;
};

export const filterOrg = resource => {
  if (Auth.user) {
    if (Auth.isSuperAdmin) return Auth.orgTrees;
    if (!Auth.org) return [];

    let permission = Auth.can(Auth.role).readAny(resource);

    if (permission.granted) return Auth.orgDescendantsTrees;

    permission = Auth.can(Auth.role).readOwn(resource);
    if (permission.granted) return [Auth.user.org];
  }

  return [];
};

export const paramsAuth = (resource, params) => {
  if (Auth.isSuperAdmin) return params;

  if (Auth.org) {
    let permission = Auth.can(Auth.role).readAny(resource);
    if (permission.granted) {
      if (params.filter) {
        if (params.filter.findIndex(item => item.field === 'org.id') >= 0) {
          return params;
        }
      }

      return mergeParams(params, {
        filter: [
          {
            field: 'org.id',
            operator: CondOperator.IN,
            value: Auth.orgDescendants.map(item => item.id),
          },
        ],
      });
    }

    permission = Auth.can(Auth.role).readOwn(resource);
    if (permission.granted) {
      return mergeParams(params, {
        filter: [
          {
            field: 'own.id',
            operator: CondOperator.EQUALS,
            value: Auth.user.id,
          },
        ],
      });
    }
  }

  return mergeParams(params, {
    filter: [
      {
        field: 'create_at',
        operator: CondOperator.EQUALS,
        value: moment('1900-01-01').format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
  });
};

export const getTreeData = (data, root) =>
  data.map(item => {
    item.__typename && delete item.__typename;

    if (item.children && item.children.length > 0) {
      return {
        ...item,
        key: item.id,
        value: item.id,
        root,
        children: getTreeData(item.children, root || item),
        dataRef: item,
      };
    }

    return {
      ...item,
      key: item.id,
      value: item.id,
      root,
      children: [],
      dataRef: item,
    };
  });

export const mergeParams = (params, partialParams) => {
  let newParams = { ...params };

  const keys = Object.keys(partialParams);

  keys.forEach(key => {
    if (partialParams[key]) {
      newParams[key] = partialParams[key];

      if (['filter', 'or', 'join', 'sort'].includes[key]) {
        if (!!params[key]) {
          Logger.log(`params ${key}:`, params[key]);

          const oldParams = params[key]
            .filter(item => partialParams[key].findIndex(temp => temp.field === item.field) < 0)
            .map(item => item);

          if (oldParams.length > 0) {
            newParams[key] = [...newParams[key], ...oldParams];
          }
        }
      }

      if (isArray(newParams[key])) {
        if (['filter', 'or'].includes(key)) {
          newParams[key] = newParams[key].filter(item => !isEmpty(item.value));
        }

        if (['join', 'sort'].includes(key)) {
          newParams[key] = newParams[key].filter(item => !isEmpty(item.field));
        }
      }
    }
  });

  return newParams;
};

export const buildingQuery = params => {
  return RequestQueryBuilder.create(params).query();
};

export const IdentityMaps = {
  user: '后台用户',
  investor: '资金方',
  financer: '项目方',
  provider: '服务商',
  tourist: '游客',
};

export const IFModeMaps = {
  equity: '股权',
  claim: '债权',
};

export const ProjectStatusMaps = {
  pending: '待审核',
  rejected: '已驳回',
  checked: '已审核',
  waiting: '待分配',
  following: '待跟进',
  cancelled: '已作废',
  finished: '已完成',
};

export const UserStatusMaps = {
  0: '正常',
  1: '待审核',
  2: '已驳回',
  3: '已审核',
  4: '已作废',
};

export const UserLevelMaps = {
  0: 'V0',
  1: 'V1',
  2: 'V2',
};

export const UserTypeMaps = {
  personal: '个人',
  enterprise: '企业',
};
