import { message } from 'antd';
import { merge } from 'lodash';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';
import Logger from './logger';

export const createFetch = (url, config) => {
  let defaultConfig = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  return fetch(url, merge(defaultConfig, config))
    .then(res => {
      const data = !!res ? res.json() : {};

      if (401 === res.status) {
        message.error(formatMessage({ id: 'errors.invalid.auth' }));
        router.replace('/user/login');
        return false;
      }

      return data;
    })
    .catch(error => Logger.error(error));
};

export const post = async (url, data) => createFetch(url, { method: 'POST', body: data });
