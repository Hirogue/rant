import _ from 'lodash';
import { message } from 'antd';
import axios from 'axios';
import md5 from 'md5';
import moment from 'moment';
import config from '../config/config';

export function getInstance() {
	const instance = axios.create({
		baseURL: config.apiUrl,
		timeout: 5000,
		headers: {
			application: 'SYS_APP_WECHAT_WESHOP',
			xhr: true,
			authorization: typeof window !== 'undefined' ? sessionStorage.getItem('user-token') || '' : '',
			'csrf-token': md5(localStorage.getItem('csrf-token') + moment().format('Y%MM&DD')),
			'ttt': localStorage.getItem('csrf-token')
		}
	});

	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			// Do something with response error
			console.log(error);

			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx

				if (!!error.response.data.message) {
					const msg = error.response.data.message.message;
					console.log(msg);
					console.log(error.response.status);
					console.log(error.response.headers);
					if (_.isString(msg)) {
						message.error(msg, 2);
					} else {
						if (_.isArray(msg)) {
							const constraints = msg.pop().constraints;

							message.error(constraints[Object.keys(constraints).pop()], 2);
						} else {
							if (error.response.status === 401) {
								message.error('验证失效，请重新登录!', 2);

								// router.replace('/user/login');
							} else {
								message.error('未知错误!!!', 2);
							}
						}
					}
				}
			} else if (error.request) {
				message.error('请求超时!', 2);
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				message.error('未知错误!!', 2);
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}

			return Promise.reject(error);
		}
	);

	return instance;
}

export function apiGet(url, options) {
	return getInstance().get(url, options);
}

export function apiPost(url, data, options) {
	return getInstance().post(url, data, options);
}

export function apiPut(url, data, options) {
	return getInstance().put(url, data, options);
}

export function apiDelete(url, options) {
	return getInstance().delete(url, options);
}

export function upload2Backend(file, bucketID, prefixPath, filename, options = {}, extra = null) {
	console.log('###### upload2Backend: ', file, bucketID, prefixPath, filename, options);

	const formdata = new FormData();
	Object.keys(options).forEach((key) => {
		formdata.append(key, options[key]);
	});
	formdata.append('bucketID', bucketID);
	formdata.append('prefixPath', prefixPath);
	formdata.append('filename', filename);
	formdata.append('file', file, file.name);

	return getInstance().post('/api/storage/localhost', formdata, extra);
}
