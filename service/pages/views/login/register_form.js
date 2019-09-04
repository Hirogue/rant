import { Button, Checkbox, Form, Icon, Input, message, Row, Col } from 'antd';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import IconFont from '../../components/IconFont';
import { GlobalContext } from '../../components/Layout/withContext';
import { get, post } from '../../lib/fetch';
import { jump } from '../../lib/global';

export default Form.create()(props => {
	const [smsCountDown, setSmsCountDown] = useState(0);
	const [svgData, setSvgData] = useState(null);
	const [svgRefresh, setSvgRefresh] = useState(Date.now());

	const { form } = props;
	const { getFieldDecorator, validateFields } = form;
	const { setServiceAgreementVisible } = useContext(GlobalContext);

	const handleCountDown = val => {
		const index = setInterval(() => {
			if (val > 0) {
				setSmsCountDown(--val);
				localStorage.setItem('smsCountDown', val);
			} else {
				clearInterval(index);
			}
		}, 1000);
	};

	useEffect(() => {
		const coutDown = localStorage.getItem('smsCountDown');

		if (!!coutDown) {
			setSmsCountDown(parseInt(coutDown));

			if (coutDown > 0) {
				handleCountDown(coutDown);
			}
		}
	});

	useEffect(() => {
		get('/api/verification/svg').then(res => {
			setSvgData(res);
		});
	}, [svgRefresh]);


	const sendSMS = () => {
		validateFields(['phone', 'svgCode', 'password', 'agree'], {}, (errors, values) => {
			if (errors) {
				return false;
			}

			if (!values.agree) {
				message.warn('请先阅读并同意《项目通服务协议》');
				return false;
			}

			post('/api/verification/sms', { svgKey: svgData.key, ...values }).then(res => {
				if (!!res) {
					message.success('短信验证码已发送');
					handleCountDown(60);
				}

				setSvgRefresh(Date.now());
			});
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {

				if (!values.agree) {
					message.warn('请先阅读并同意《项目通服务协议》');
					return false;
				}

				values.confirmPassword = values.password;

				post('/api/user/register', values).then(res => {
					if (!!res) {
						message.success('注册成功');
						jump('/login');
					}
				});
			}
		});
	};

	return (
		<Fragment>

			<Form
				onSubmit={(e) => {
					handleSubmit(e);
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
							{ min: 6, message: '不可少于6位' },
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
					<Row gutter={8}>
						<Col span={18}>
							{getFieldDecorator('svgCode', {
								rules: [
									{ required: true, message: '请输入图形验证码' },
									{ len: 4, message: '验证码长度为4位' },
								],
							})(
								<Input
									size="large"
									allowClear
									prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="请输入图形验证码"
								/>,
							)}
						</Col>
						<Col span={6}>
							<span
								style={{ display: 'flex' }}
								onClick={() => setSvgRefresh(Date.now())}
								dangerouslySetInnerHTML={{ __html: svgData ? svgData.data : '' }}
							></span>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('smsCode', {
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
						disabled={smsCountDown > 0}
						onClick={() => sendSMS()}
						className="get-test"
					>
						{smsCountDown > 0 ? `${smsCountDown}秒后重发` : '获取验证码'}
					</Button>
				</Form.Item>
				<Form.Item className="set-margin">
					{getFieldDecorator('agree', {
						valuePropName: 'checked',
						initialValue: true
					})(<Checkbox>我已阅读并同意</Checkbox>)}
					<a className="login-form-forgot" onClick={() => setServiceAgreementVisible(true)}>
						《项目通服务协议》
					</a>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						免费注册
					</Button>
				</Form.Item>
			</Form>
		</Fragment>
	);
});