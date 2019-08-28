import React from 'react';
import _ from 'lodash';
import { Drawer, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import IconFont from '../../../components/IconFont';
import GlobalContext from '../../../components/context/GlobalContext';

@Form.create()
export default class extends React.Component {
	state = { visible: false };

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { handleRegisterSubmit, form } = this.props;

		const { getFieldDecorator, getFieldValue } = form;
		return (
			<GlobalContext.Consumer>
				{(context) => {
					const countDown = context.countDown;
					const { siteList } = context.mainData;

					const agreement = _.find(siteList, (item) => item.title === '服务协议');
					const html = !!agreement
						? !!agreement.ex_info
							? !!agreement.ex_info.richtext ? agreement.ex_info.richtext.html : ''
							: ''
						: '';

					return (
						<React.Fragment>
							<Drawer
								title="项目通服务协议"
								placement="right"
								onClose={this.onClose}
								visible={this.state.visible}
								maskClosable={false}
								width={800}
							>
								<div
									style={{ padding: '10px 10px 50px 10px' }}
									dangerouslySetInnerHTML={{
										__html: html
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 0,
										bottom: 0,
										width: '100%',
										borderTop: '1px solid #e9e9e9',
										padding: '10px 16px',
										background: '#fff',
										textAlign: 'right'
									}}
								>
									<Button onClick={this.onClose} type="primary">
										我已知晓
									</Button>
								</div>
							</Drawer>

							<Form
								onSubmit={(e) => {
									handleRegisterSubmit(e, this.props);
								}}
								className="login-form"
							>
								<Form.Item>
									{getFieldDecorator('phone', {
										rules: [
											{ required: true, message: '请输入您的手机号!' },
											{
												pattern: /^1[34578]\d{9}$/,
												message: '格式不正确'
											}
										]
									})(
										<Input
											type="phone"
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="手机号"
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('password', {
										rules: [
											{ min: 8, message: '不可少于8位' },
											{ max: 12, message: '不可超过12位' },
											{ required: true, message: '请输入您的密码!' }
										]
									})(
										<Input
											type="password"
											prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="密码"
										/>
									)}
								</Form.Item>

								<Form.Item>
									{getFieldDecorator('smsCaptcha', {
										rules: [
											{ min: 4, message: '不可少于4位' },
											{ max: 4, message: '不可超过4位' },
											{ required: true, message: '请输入验证码!' }
										]
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
											const phoneNumber = getFieldValue('phone');
											if (!phoneNumber) message.warning('请输入正确的手机号！');

											context.sendSMSCode(phoneNumber);
										}}
										className="get-test"
									>
										{countDown > 0 ? `${countDown}秒后重发` : '获取验证码'}
									</Button>
								</Form.Item>
								<Form.Item className="set-margin">
									{getFieldDecorator('remember', {
										valuePropName: 'checked',
										initialValue: true
									})(<Checkbox>我已阅读并同意</Checkbox>)}
									<a className="login-form-forgot" onClick={this.showDrawer}>
										《项目通服务协议》
									</a>
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit" className="login-form-button">
										注册
									</Button>
								</Form.Item>
							</Form>
						</React.Fragment>
					);
				}}
			</GlobalContext.Consumer>
		);
	}
}
