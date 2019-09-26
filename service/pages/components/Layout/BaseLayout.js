import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';
import { Layout, Modal, Button, message } from 'antd';
import {
	apiLogin,
	apiRegister,
	apiSendSMSCode,
	apiApplyContent,
	apiApplyProduct,
	apiApplyService,
	apiApplyProject,
	apiGetApplyCount,
	apiGetApplys
} from '../../services/common';
import WinLogin from '../WinLogin';
import WinRegister from '../WinRegister';

import GlobalContext from '../context/GlobalContext';

import 'antd/dist/antd.css';
import './reset.scss';

//公共组件header footer
import Head from '../Head';
import HeaderMod from '../Header';
import FooterMod from '../Footer';
import Consult from '../Consult';
import { get } from '../../lib/fetch';

const { Header, Footer, Content } = Layout;

message.config({
	top: 300,
	duration: 2,
	maxCount: 2,
});

@withRouter
export default class extends Component {
	state = {
		countDown: 0,
		loginModalVisible: false,
		legalModalVisible: false,
		legalCountDown: 5,
		isLogin: true,
		links: []
	};

	async componentDidMount() {
		get('/api/link', {
			sort: 'sort,DESC'
		}).then(res => { this.setState(state => ({ ...state, links: res })) });

		const { csrfToken } = this.props.router.query;
		localStorage.setItem('csrf-token', csrfToken);


		const checkCountDown = parseInt(JSON.parse(localStorage.getItem('user-sms-countdown') || 0));
		if (checkCountDown > 0) {
			this.sendSMSCode();
		}

		const currentDate = moment().format('YYYY-MM-DD');
		const localDate = localStorage.getItem('legal-countdown');

		if (currentDate !== localDate) {
			this.handleModalLegal(true);

			const legalCountDownIndex = setInterval(() => {
				const { legalCountDown } = this.state;

				if (legalCountDown >= 1) {
					this.setState((state) => ({
						...state,
						legalCountDown: legalCountDown - 1
					}));
				} else {
					clearInterval(legalCountDownIndex);
					localStorage.setItem('legal-countdown', currentDate);
				}
			}, 1000);
		}

		this.setState((state) => ({
			...state,
			logout: () => {
				window.location.href = '/logout';
			},
			showModalLegal: this.showModalLegal,
			publishAll: this.publishAll,
			publishFunding: this.publishFunding,
			serviceEntry: this.serviceEntry,
			getApplys: this.getApplys,
			applyProduct: this.applyProduct,
			applyService: this.applyService,
			applyProject: this.applyProject,
			applyContent: this.applyContent,
			sendSMSCode: this.sendSMSCode
		}));

		await this.getApplys();
	}

	serviceEntry = async () => {
		const user = await this.checkUser();
		if (!user) return false;

		window.location.href = '/user';
	};

	showModalLegal = () => {
		this.setState((state) => ({
			...state,
			legalCountDown: 0
		}));

		this.handleModalLegal(true);
	}

	publishAll = async () => {
		const user = await this.checkUser();
		if (!user) return false;

		if (user.id_name === '资金方') {
			window.location.href = '/user/publish/funding';
		} else {
			window.location.href = '/user/publish/project';
		}
	};

	publishFunding = async () => {
		const user = await this.checkUser();
		if (!user) return false;

		window.location.href = '/user/publish/funding';
	};

	getApplys = async () => {
		const { user } = this.props.router.query;

		if (!!user) {
			const applysInfo = await apiGetApplys();

			if (!!applysInfo.data) {
				this.setState((state) => ({
					...state,
					...applysInfo.data
				}));
			}
		}
	};

	applyProduct = async (id) => {
		const user = await this.checkUser();
		if (!user) return false;

		apiApplyProduct(id)
			.then((res) => {
				message.success('申请成功，请等待审核！');
				this.getApplys();
			})
			.catch((err) => {
				message.error('申请失败！请勿重复申请！');
			});
	};

	applyService = async (id) => {
		const user = await this.checkUser();
		if (!user) return false;

		apiApplyService(id)
			.then((res) => {
				message.success('交换成功！');
				this.getApplys();
			})
			.catch((err) => {
				message.error('交换失败！请勿重复交换！');
			});
	};

	applyProject = async (project) => {
		const user = await this.checkUser();
		if (!user) return false;

		const applyCount = await apiGetApplyCount(user.id, user.vip);

		if (!applyCount || !applyCount.data || applyCount.data <= 0) {
			if (user.vip <= 0) {
				message.error(<span>升级VIP等级可投递更多！<a href="/user">立即升级</a></span>);
			} else {
				message.error('本日剩余可投递次数不足！');
			}
			return false;
		}

		if (project.created_by === user.id) {
			message.error('无法投递自己发布的项目或资金！');
			return false;
		}

		apiApplyProject(project.id)
			.then((res) => {
				message.success('投递成功！');
				this.getApplys();
			})
			.catch((err) => {
				message.error('投递失败！请勿重复投递！');
			});
	};

	applyContent = async (id) => {
		const user = await this.checkUser();
		if (!user) return false;

		apiApplyContent(id)
			.then((res) => {
				message.success('申请约见成功!请等待专家联系您!');
				this.getApplys();
			})
			.catch((err) => {
				message.error('约见失败!请勿重复申请!');
			});
	};

	checkUser = async () => {
		const { user } = this.props.router.query;

		if (!user) {
			this.handleModalLogin(true);
			return false;
		}

		return user;
	};

	sendSMSCode = (phone) => {
		if (!!phone) {
			apiSendSMSCode(phone)
				.then((res) => {
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

	handleModalLogin = (status) => {
		this.setState((state) => ({
			...state,
			loginModalVisible: status
		}));
	};

	handleModalLegal = (status) => {
		this.setState((state) => ({
			...state,
			legalModalVisible: status
		}));
	};

	handleToggleModalLogin = () => {
		const status = this.state.isLogin;
		this.setState((state) => ({
			...state,
			isLogin: !status
		}));
	};

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
						window.location.reload();
					})
					.catch((err) => {
						message.error('登录失败！用户名或密码错误。');
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
									window.location.reload();
								})
								.catch((err) => {
									message.error('登录失败！用户名或密码错误。');
								});
						}
					})
					.catch((err) => {
						message.error('注册失败！');
					});
			}
		});
	}

	render() {
		const { siteInfo, pagesSEO } = this.props.router.query;

		return (
			<GlobalContext.Provider value={{ ...this.state, ...this.props, ...this.props.router.query }}>
				<Consult siteInfo={siteInfo} />
				<Layout>
					<Header style={{ position: 'fixed', zIndex: 500, width: '100%' }}>
						<HeaderMod />
					</Header>
					<Content style={{ paddingTop: 176 }}>{this.props.children}</Content>
					<Footer style={{ width: '100%', padding: 0 }}>
						<FooterMod />
					</Footer>

					<Modal
						title={this.state.isLogin ? '登录' : '注册'}
						centered
						visible={this.state.loginModalVisible}
						onOk={() => this.handleModalLogin(true)}
						onCancel={() => this.handleModalLogin(false)}
						footer={null}
					>
						{this.state.isLogin ? (
							<WinLogin handleLoginSubmit={this.handleLoginSubmit} />
						) : (
								<WinRegister handleRegisterSubmit={this.handleRegisterSubmit} />
							)}
						<a className="login-text-links" onClick={() => this.handleToggleModalLogin()}>
							{this.state.isLogin ? '还不是会员？免费注册' : '已有账号，直接登录'}
						</a>
					</Modal>

					<Modal
						title="法律声明："
						centered
						keyboard={false}
						maskClosable={false}
						closable={false}
						visible={this.state.legalModalVisible}
						onOk={() => this.handleModalLegal(true)}
						onCancel={() => this.handleModalLegal(false)}
						footer={null}
					>
						<p>一、本平台所展示项目、资金资源信息均不构成任何投资建议，对平台会员可能造成的投资损失概不负责，亦不承担任何法律责任。</p>
						<br />
						<p>二、平台会员会自行上传资源信息，平台进行必要的认证审核，但不对所有信息内容的安全性、准确性、真实性、合法性负责，也不承担任何法律责任。</p>
						<br />
						<p>三、任何单位或个人认为本平台网页内容可能涉嫌侵犯其著作权，应该及时向我们提出书面权利通知，并提供身份证明、权属证明及详细侵权情况证明。平台收到上述法律文件后，将依法尽快处理。</p>

						<p style={{ textAlign: 'center', marginTop: 20 }}>
							{this.state.legalCountDown > 0 ? (
								<Button type="default">{`（${this.state.legalCountDown}s）后可关闭`}</Button>
							) : (
									<Button type="primary" onClick={() => this.handleModalLegal(false)}>
										关闭
								</Button>
								)}
						</p>
					</Modal>
				</Layout>
			</GlobalContext.Provider>
		);
	}
}
