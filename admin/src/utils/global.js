import Logger from '@/utils/logger';
import { IdentityEnum } from '@/utils/enum';
import { router } from 'umi';

export const logout = () => {
  Logger.log('logout');

  localStorage.removeItem('token');

  router.replace('/user/login');

  return false;
};

export const IdentityMaps = {
  user: '后台用户',
  investor: '资金方',
  financer: '项目方',
  provider: '服务商',
  tourist: '游客',
};

export const UserStatusMaps = {
  0: '正常',
  1: '待审核',
  2: '已驳回',
  3: '已审核',
  4: '已作废',
};
