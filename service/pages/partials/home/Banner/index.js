import React, { Component } from 'react';
import { Carousel, Tabs, message } from 'antd';
import { apiLogin, apiRegister } from '../../../services/common';
import HomeLoginForm from './login_form';
import HomeRegisterForm from './register_form';
import config from '../../../config/config';

import './banner.scss';
import GlobalContext from '../../../components/context/GlobalContext';

const TabPane = Tabs.TabPane;
class Banner extends Component {
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
				console.log('Received values of form: ', values);

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
									//message.error('登录失败！用户名或密码错误。');
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
			<GlobalContext.Consumer>
				{(context) => {
					const user = context.user || null;
					const page = context.pagesSEO || null;

					// 轮播图
					const images = !!page ? (!!page.ex_info ? page.ex_info.gallery : []) : [];

					return (
						<div className="banner-container">
							{!images || images.length <= 0 ? (
								<Carousel autoplay>
									<div className="banner-box">
										<img src={config.staticImgUrl + 'banner1.png'} alt="banner" />
									</div>
									<div className="banner-box">
										<img src={config.staticImgUrl + 'banner1.png'} alt="banner" />
									</div>
								</Carousel>
							) : (
									<Carousel autoplay>
										{images.map((item, index) => (
											<div className="banner-box" key={index}>
												<img src={item.url} alt="banner" />
											</div>
										))}
									</Carousel>
								)}
							{!user ? (
								<div className="login-mod">
									<div className="login-mod-box">
										<Tabs type="card">
											<TabPane tab="登录" key="1">
												<HomeLoginForm handleLoginSubmit={this.handleLoginSubmit} />
											</TabPane>
											<TabPane tab="免费注册" key="2">
												<HomeRegisterForm handleRegisterSubmit={this.handleRegisterSubmit} />
											</TabPane>
										</Tabs>
									</div>
								</div>
							) : (
									''
								)}
						</div>
					);
				}}
			</GlobalContext.Consumer>
		);
	}
}

export default Banner;
