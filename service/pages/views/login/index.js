import React from 'react';
import Router from 'next/router';
import { message, Tabs } from 'antd';
import LoginLayout from '../../components/Layout/LoginLayout';
import { apiLogin, apiRegister } from '../../services/common';
import config from '../../config/config';
import './login.scss';

const TabPane = Tabs.TabPane;

import LoginForm from './login_form';
import RegisterForm from './register_form';
import LoginContext from '../../components/context/LoginContext';

class LoginRegister extends React.Component {
	handleLoginSubmit(e, props) {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				if (values.remember) {
					localStorage.setItem('user-phone-number', values.phone);
				} else {
					localStorage.removeItem('user-phone-number');
				}

				apiLogin(values.phone, values.password)
					.then((res) => {
						window.location.href = '/user';
					})
					.catch((err) => {
						// message.error('登录失败！用户名或密码错误。');
					});
			}
		});
	}

	handleRegisterSubmit(e, props) {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				if (!values.remember) {
					message.warning('请先阅读并同意服务协议！');
					return false;
				}

				apiRegister(values.phone, values.password, values.smsCaptcha)
					.then((result) => {
						if (!!result.data) {
							apiLogin(values.phone, values.password)
								.then((res) => {
									window.location.href = '/user';
								})
								.catch((err) => {
									// message.error('登录失败！用户名或密码错误。');
								});
						}
					})
					.catch((err) => {
						// message.error('注册失败！');
					});
			}
		});
	}

	render() {
		return (
			<LoginLayout>
				<LoginContext.Consumer>
					{(context) => {
						return (
							<div className="login-main">
								<p className="page-title">会员登录</p>
								<div className="login-box">
									<div className="left">
										<p style={{ textAlign: 'left' }}>永不落幕的</p>
										<h4>
											<span>投融资对接</span>平台
										</h4>
										<img className="about-banner" src={config.staticImgUrl + 'login-img.png'} />
									</div>
									<div className="right">
										<div className="login-mod">
											<div className="login-mod-box">
												<Tabs
													onChange={this.callback}
													type="card"
													defaultActiveKey={context.router.asPath === '/login' ? '1' : '2'}
												>
													<TabPane tab="登录" key="1">
														<LoginForm handleLoginSubmit={this.handleLoginSubmit} />
													</TabPane>
													<TabPane tab="免费注册" key="2">
														<RegisterForm
															handleRegisterSubmit={this.handleRegisterSubmit}
														/>
													</TabPane>
												</Tabs>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					}}
				</LoginContext.Consumer>
			</LoginLayout>
		);
	}
}

export default LoginRegister;
