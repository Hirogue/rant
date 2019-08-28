import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { Layout, Button, Modal, message } from 'antd';
import { apiSendSMSCode } from '../../services/common';
import LoginContext from '../context/LoginContext';

import 'antd/dist/antd.css';
import './reset.scss';

//公共组件header footer
import Head from '../Head';
import UserHeader from '../UserHeader';
import UserFooter from '../UserFooter';
import Consult from '../Consult';

const { Header, Footer, Content } = Layout;

import './user_layout.scss';

message.config({
	top: 300,
	duration: 2,
	maxCount: 2,
});

@withRouter
export default class UserLayout extends Component {
	state = {
		countDown: 0
	};

	sendSMSCode = (phone) => {
		if (!!phone) {
			apiSendSMSCode(phone)
				.then((res) => {
					message.success('发送成功！');
					localStorage.setItem('user-sms-countdown', 60);
				})
				.catch((err) => message.error('发送失败！'));
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

		const checkCountDown = parseInt(JSON.parse(localStorage.getItem('user-sms-countdown') || 0));
		if (checkCountDown > 0) {
			this.sendSMSCode();
		}

		this.setState((state) => ({
			...state,
			logout: () => {
				window.location.href = '/logout';
			},
			sendSMSCode: this.sendSMSCode
		}));
	}

	render() {
		const { siteInfo, pagesSEO, user } = this.props.router.query;

		const asPath = this.props.router.asPath || '/user/card';

		return (
			<LoginContext.Provider value={{ ...this.state, ...this.props, ...this.props.router.query }}>
				<Consult siteInfo={siteInfo} />
				<Layout>
					{!user ? (
						<Modal
							title="提示"
							centered
							keyboard={false}
							maskClosable={false}
							closable={false}
							footer={null}
							visible={true}
						>
							<p style={{ textAlign: 'center' }}>请先登录</p>
							<p style={{ textAlign: 'center', marginTop: 20 }}>
								<Button type="primary" onClick={() => (window.location.href = '/login')}>
									立即登录
								</Button>
							</p>
						</Modal>
					) : (
							<Fragment>
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
									<UserHeader />
								</Header>
								<Content style={{ paddingTop: 72 }}>
									<div className="user-page">
										<div className="title">账户信息</div>
										<div className="user-main">
											<div className="left">
												<div className="left-top">
													{/* <Avatar
													size={64}
													src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
												/> */}
													<h4>
														欢迎您,<a href="/user">
															<span>
																{user ? user.real_name ? (
																	user.real_name
																) : (
																		user.credential
																	) : (
																		user.credential
																	)}
															</span>
														</a>
													</h4>
													<p style={{ padding: '10px 0 0 0' }}>
														{!!user.nick_name ? user.nick_name : ''}
													</p>
													<p style={{ paddingBottom: 20 }}>会员等级:V{user.vip}</p>

													<Button type="primary" onClick={() => (window.location.href = '/user')}>
														{user.vip <= 0 ? '升级VIP' : '我的资料'}
													</Button>
												</div>
												<div className="left-bottom">
													<div
														className={`navitem ${asPath === '/user/product' ? 'active' : ''}`}
														onClick={() => {
															window.location.href = '/user/product';
														}}
													>
														<p>金融服务</p>
													</div>
													<div
														className={`navitem ${asPath === '/user/apply/project'
															? 'active'
															: ''}`}
														onClick={() => {
															window.location.href = '/user/apply/project';
														}}
													>
														<p>我的投递</p>
													</div>
													<div
														className={`navitem ${asPath === '/user/apply/service'
															? 'active'
															: ''}`}
														onClick={() => {
															window.location.href = '/user/apply/service';
														}}
													>
														<p>名片管理</p>
													</div>
													{user.id_name === '资金方' && user.status === 'OVER' ? (
														<div
															className={`navitem ${asPath === '/user/funding'
																? 'active'
																: ''}`}
															onClick={() => {
																window.location.href = '/user/funding';
															}}
														>
															<p>资金管理</p>
														</div>
													) : (
															''
														)}
													{user.id_name === '项目方' && user.status === 'OVER' ? (
														<div
															className={`navitem ${asPath === '/user/project'
																? 'active'
																: ''}`}
															onClick={() => {
																window.location.href = '/user/project';
															}}
														>
															<p>项目管理</p>
														</div>
													) : (
															''
														)}
													{user.id_name === '服务商' && user.status === 'OVER' ? (
														<div
															className={`navitem ${asPath === `/user/service`
																? 'active'
																: ''}`}
															onClick={() => {
																window.location.href = `/user/service`;
															}}
														>
															<p>服务商入驻</p>
														</div>
													) : (
															''
														)}
												</div>
											</div>
											<div className="right">{this.props.children}</div>
										</div>
									</div>
								</Content>
								<Footer style={{ width: '100%', padding: 0 }}>
									<UserFooter />
								</Footer>
							</Fragment>
						)}
				</Layout>
			</LoginContext.Provider>
		);
	}
}
