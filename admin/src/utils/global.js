import Logger from '@/utils/logger';
import { router } from 'umi';

export const logout = () => {
  Logger.log('logout');

  localStorage.removeItem('token');

  router.replace('/user/login');
};
