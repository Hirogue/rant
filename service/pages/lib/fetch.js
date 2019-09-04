import { message } from 'antd';
import { merge } from 'lodash';

export const createFetch = (url, config) => {
  let defaultConfig = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('u_token'),
    },
  };
  return fetch(Config.basePath + url, merge(defaultConfig, config))
    .then(res => {
      const data = !!res ? res.json() : {};
      return data;
    })
    .then(data => {
      if (401 === data.status) {
        message.error('身份验证失效');
        router.replace('/user/login');
        return false;
      }

      if (400 === data.status) {
        message.error(
          data.message ? data.message.message : data.response ? data.response.message : '未知错误',
        );
        return false;
      }

      return data;
    })
    .catch(error => console.error(error));
};

export const get = async (url, params) => {
  let queryString = null;

  if (params) {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => searchParams.append(key, params[key]));

    queryString = searchParams.toString();
  }

  return createFetch(`${url}${queryString ? '?' + queryString : ''}`, { method: 'GET' });
};

export const post = async (url, data) =>
  createFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const uploadOne = async (file, fileName) => {
  const data = new FormData();
  data.append('fileName', fileName || file.name);
  data.append('file', file);

  return await createFetch('/api/storage', { method: 'POST', body: data });
};
