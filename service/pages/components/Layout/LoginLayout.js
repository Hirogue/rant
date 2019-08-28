import React, { Component } from 'react';
import { Layout, message } from 'antd';
import { withRouter } from 'next/router';
import { apiSendPasswordSMSCode, apiSendSMSCode, apiResetPassword } from '../../services/common';

import 'antd/dist/antd.css';
import './reset.scss';

//公共组件header footer
import Head from '../Head';
import LoginHeader from '../LoginHeader';
import UserFooter from '../UserFooter';
import Consult from '../Consult';

const { Header, Footer, Content } = Layout;

import './login_layout.scss';
import LoginContext from '../context/LoginContext';

const style = {
	position: 'fixed',
	left: 0,
	bottom: 0,
	backgroundColor: '#f0f2f5'
};

message.config({
	top: 300,
	duration: 2,
	maxCount: 2,
});

@withRouter
export default class UserLayout extends Component {
	state = {
		userInfo: null,
		siteInfo: null,
		countDown: 0,
		credential: null,
		smsCaptcha: null,
		password: null
	};

	sendSMSCode = (phone, isRegister = true) => {

		if (!!phone) {
			if (isRegister) {
				apiSendSMSCode(phone)
					.then((res) => {
						message.success('发送成功！');
						localStorage.setItem('csrf-token', res.data.csrfToken);
						localStorage.setItem('user-sms-countdown', 60);
					})
					.catch((err) => message.error('发送失败！'));
			} else {
				apiSendPasswordSMSCode(phone)
					.then((res) => {
						message.success('发送成功！');
						localStorage.setItem('csrf-token', res.data.csrfToken);
						localStorage.setItem('user-sms-countdown', 60);
					})
					.catch((err) => message.error('发送失败！'));
			}
		}

		const index = setInterval(() => {
			const countDown = parseInt(JSON.parse(localStorage.getItem('user-sms-countdown') || 0));

			if (countDown < 0) {
				clearInterval(index);
			} else {
				localStorage.setItem('user-sms-countdown', countDown - 1);
				this.setState((state) => ({
					...state,
					countDown: countDown - 1
				}));
			}
		}, 1000);
	};

	async componentDidMount() {
		
		const { csrfToken } = this.props.router.query;
		localStorage.setItem('csrf-token', csrfToken);

		console.log(csrfToken)

		const checkCountDown = parseInt(JSON.parse(localStorage.getItem('user-sms-countdown') || 0));
		if (checkCountDown > 0) {
			this.sendSMSCode();
		}

		this.setState((state) => ({
			...state,
			setContextState: (payload) => {
				this.setState((state) => ({
					...state,
					...payload
				}));
			},
			reset: async (values) => {
				const { credential, smsCaptcha } = this.state;

				if (!credential) {
					return false;
				}

				if (!values.password) {
					message.warning('请输入密码！');
					return false;
				}

				if (values.password !== values.confirm) {
					message.warning('两次密码不一致！');
					return false;
				}

				return await apiResetPassword(credential, values.password, smsCaptcha);
			},
			sendSMSCode: this.sendSMSCode
		}));
	}

	render() {
		const { siteInfo, pagesSEO } = this.props.router.query;

		return (
			<LoginContext.Provider value={{ ...this.state, ...this.props, ...this.props.router.query }}>
				<Consult siteInfo={siteInfo} />
				<Layout>
					<Head seo={pagesSEO} />
					<Header
						style={{
							position: 'fixed',
							zIndex: 500,
							width: '100%',
							backgroundColor: '#2e8df3',
							height: 72
						}}
					>
						<LoginHeader />
					</Header>
					<Content style={{ paddingTop: 72, paddingBottom: 255 }}>{this.props.children}</Content>
					{/* <Footer style={{ width: '100%', padding: 0 }}>
						<UserFooter style={style} />
					</Footer> */}
				</Layout>
			</LoginContext.Provider>
		);
	}
}
