import Logger from '@/utils/logger';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { isArray, isEmpty } from 'lodash';
import { router } from 'umi';

export const logout = () => {
  localStorage.removeItem('token');

  router.replace('/user/login');

  return false;
};

export const getTreeData = (data, root) =>
  data.map(item => {
    item.__typename && delete item.__typename;

    if (item.children) {
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
