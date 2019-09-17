import React, { useState, useEffect } from 'react';
import { Carousel, Tabs, message } from 'antd';
import { apiLogin, apiRegister } from '../../../services/common';
import HomeLoginForm from './login_form';
import HomeRegisterForm from './register_form';
import config from '../../../config/config';
import { createApolloClient } from "../../../lib/apollo";
import { Fetch, toFetchCurrentUser } from "../../../lib/global";
import { M_LOGIN } from '../../../gql';

import './banner.scss';

const client = createApolloClient();
const TabPane = Tabs.TabPane;

export default ({ data }) => {
	let user = null;
	try {
		user = JSON.parse(localStorage.getItem('u_user')) || null;
	} catch (error) {
		console.error(error.message);
	}

	const [thisUser, setUser] = useState(user);
	const images = !data.data ? [{ id: 0, url: '', link: '' }] : data.data;

	const handleLoginSubmit = (e, props) => {
		e.preventDefault();
		props.form.validateFields(async (err, values) => {
			if (!err) {
				if (values.remember) {
					localStorage.setItem('user-phone-number', values.account);
				} else {
					localStorage.removeItem('user-phone-number');
				}
				delete values.remember;
				
				let { data } = await client.mutate({
					mutation: M_LOGIN,
					variables: { loginData: values }
				});

				if (data && data.login && data.login.token) {
					localStorage.setItem('u_token', data.login.token);
					const user = await toFetchCurrentUser(client);
					if (user) {
						message.success('登录成功！', 1);
						window.location.reload();
						// window.location.href = '/user';
					} else {
						message.error('登录失败！请联系管理员！');
					}
				} else {
					message.error('登录失败！请联系管理员！');
				}
			}
		});
	}

	const handleRegisterSubmit = (e, props) => {
		e.preventDefault();

		props.form.validateFields(async (err, values) => {
			if (!err) {

				if (!values.remember) {
					message.warning('请先阅读并同意服务协议！');
					return false;
				}

				const res = await Fetch(`/api/user/register`, {
					"phone": values.phone,
					"smsCode": values.smsCaptcha,
					"password": values.password,
					"confirmPassword": values.password
				}).then(r => r.json());
				if (res.message) {
					const { message: { error, message } } = res;
					if (error) message.fail(message);
				} else if (res.id) {
					message.success('恭喜，注册成功！');
					let { data } = await client.mutate({
						mutation: M_LOGIN,
						variables: { 
							loginData: { 
								account: values.phone, 
								password: values.password 
							} 
						}
					});
					if (data && data.login && data.login.token) {
						localStorage.setItem('u_token', data.login.token);
						const user = await toFetchCurrentUser(client);
						if (user) {
							window.location.reload();
						}
					} else {
						message.error('跳转登录失败！请联系管理员！');
					}
				}

			}
		});
	}

	return (
		<div className="banner-container">
			<Carousel autoplay effect="fade">
				{images.map(item => (
					<a className="banner-box" href={item.link} key={item.id} target="_blank">
						<img src={item.url} alt="banner" />
					</a>
				))}
			</Carousel>
			{!thisUser ? (
				<div className="login-mod">
					<div className="login-mod-box">
						<Tabs type="card">
							<TabPane tab="登录" key="1">
								<HomeLoginForm handleLoginSubmit={handleLoginSubmit} />
							</TabPane>
							<TabPane tab="免费注册" key="2">
								<HomeRegisterForm handleRegisterSubmit={handleRegisterSubmit} />
							</TabPane>
						</Tabs>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}




