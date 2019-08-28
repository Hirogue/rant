import React, { Fragment } from 'react';
import { Form, Steps, Button, Input, Icon, message } from 'antd';
import Router from 'next/router';
import LoginLayout from '../../components/Layout/LoginLayout';
import IconFont from '../../components/IconFont';

import './retrieve_password.scss';

import LoginContext from '../../components/context/LoginContext';
const Step = Steps.Step;

const steps = [
	{
		title: '第一步：验证账号'
	},
	{
		title: '第二步：重置密码'
	},
	{
		title: '第三步：完成'
	}
];

@Form.create()
class Forgot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0
		};
	}

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
	}

	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}

	handleOneSubmit = (context) => {
		const { getFieldsValue } = this.props.form;

		const values = getFieldsValue(['credential', 'smsCaptcha']);

		if (!values.credential) {
			message.warning('请输入手机号！');
			return false;
		}

		if (!values.smsCaptcha) {
			message.warning('请输入验证码！');
			return false;
		}

		context.setContextState(values);
		this.next();
	};

	handleTwoSubmit = async (context) => {
		const { getFieldsValue } = this.props.form;

		const values = getFieldsValue(['password', 'confirm']);

		const result = await context.reset(values);

		if (!!result) {
			this.next();
		} else {
			message.error('重置失败！');
		}
	};

	render() {
		const { current } = this.state;
		const { getFieldDecorator, getFieldValue } = this.props.form;

		return (
			<LoginLayout>
				<LoginContext.Consumer>
					{(context) => {
						const countDown = context.countDown;
						return (
							<div className="retrieve-main">
								<p className="page-title">重置密码</p>
								<div className="retrieve-box">
									<div className="steps-main">
										<Steps current={current}>
											{steps.map((item) => <Step key={item.title} title={item.title} />)}
										</Steps>
										<div className="steps-content">
											{current === 0 ? (
												<Form className="steps-form">
													<Form.Item>
														{getFieldDecorator('credential', {
															initialValue: context.credential,
															rules: [
																{ required: true, message: '请输入注册的手机号码!' },
																{
																	pattern: /^1[34578]\d{9}$/,
																	message: '格式不正确'
																}
															]
														})(
															<Input
																prefix={
																	<Icon
																		type="user"
																		style={{ color: 'rgba(0,0,0,.25)' }}
																	/>
																}
																placeholder="请输入注册的手机号码"
															/>
														)}
													</Form.Item>
													<Form.Item>
														{getFieldDecorator('smsCaptcha', {
															initialValue: context.smsCaptcha,
															rules: [{ required: true, message: '请输入验证码!' }]
														})(
															<Input
																prefix={
																	<IconFont
																		className="iconfont"
																		type="icon-yanzhengma"
																		style={{ color: 'rgba(0,0,0,.25)' }}
																	/>
																}
																placeholder="请输入验证码"
															/>
														)}
														<Button
															disabled={countDown > 0}
															onClick={() => {
																const phoneNumber = getFieldValue('credential');
																if (!phoneNumber) message.warning('请输入正确的手机号！');

																context.sendSMSCode(phoneNumber, false);
															}}
															className="get-test"
														>
															{countDown > 0 ? `${countDown}秒后重发` : '获取验证码'}
														</Button>
													</Form.Item>
												</Form>
											) : (
													''
												)}
											{current === 1 ? (
												<Form
													onSubmit={(e) => {
														handleRegisterSubmit(e, props);
													}}
													className="steps-form"
												>
													<Form.Item>
														{getFieldDecorator('password', {
															rules: [
																{
																	required: true,
																	message: '请输入新的密码!'
																}
															]
														})(<Input type="password" placeholder="请输入新密码" />)}
													</Form.Item>
													<Form.Item>
														{getFieldDecorator('confirm', {
															rules: [
																{
																	required: true,
																	message: '请再次输入一次新密码!'
																}
															]
														})(
															<Input
																type="password"
																placeholder="请再次输入一次新密码"
																onBlur={this.handleConfirmBlur}
															/>
														)}
													</Form.Item>
												</Form>
											) : (
													''
												)}
											{current === 2 ? (
												<div className="steps-three-main">
													<div className="steps-box">
														<div className="sucess-box">
															<div className="icon-box">
																<IconFont className="iconfont" type="icon-chenggong" />
																<h4>恭喜您！重置密码成功</h4>
																<br />
															</div>
															{/* <p>请立即登录至您的邮箱进行帐号验证</p><br/> */}
															{/* <Link href="/login">
															<a>立即登录</a>
														</Link> */}
														</div>
													</div>
												</div>
											) : (
													''
												)}
										</div>
										<div className="steps-action">
											{current === 0 && (
												<Button type="primary" onClick={() => this.handleOneSubmit(context)}>
													下一步
												</Button>
											)}
											{current === 1 && (
												<Fragment>
													<Button onClick={() => this.prev()}>上一步</Button>
													<Button
														style={{ marginLeft: 8 }}
														type="primary"
														onClick={() => this.handleTwoSubmit(context)}
													>
														重置
													</Button>
												</Fragment>
											)}
											{current === 2 && (
												<Button
													type="primary"
													onClick={() => {
														window.location.href = '/login';
													}}
												>
													立即登录
												</Button>
											)}
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

export default Forgot;
