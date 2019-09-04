import { useMutation } from '@apollo/react-hooks';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import React from 'react';
import { M_LOGIN } from '../../gql';
import { jump } from '../../lib/global';

export default Form.create()((props) => {
	const { form } = props;
	const { getFieldDecorator } = form;

	const [login] = useMutation(M_LOGIN, {
		update: async (cache, { data }) => {
			const login = data.login;

			if (login && login.token) {
				localStorage.setItem('u_token', login.token);
				jump('/user');
			}
		},
	});


	let phone = '';

	if (typeof window !== 'undefined') {
		phone = localStorage.getItem('user-phone-number');
	}

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				form.validateFields((err, values) => {
					if (!err) {
						if (values.remember) {
							localStorage.setItem('user-phone-number', values.phone);
						} else {
							localStorage.removeItem('user-phone-number');
						}

						login({
							variables: {
								loginData: {
									account: values.phone,
									password: values.password,
								}
							},
						});
					}
				});
			}}
			className="login-form"
		>
			<Form.Item>
				{getFieldDecorator('phone', {
					initialValue: phone,
					rules: [
						{ required: true, message: '请输入你的手机号!' },
						{
							pattern: /^1[34578]\d{9}$/,
							message: '格式不正确'
						}
					]
				})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('password', {
					rules: [{ required: true, message: '请输入你的密码!' }]
				})(
					<Input
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						placeholder="密码"
					/>
				)}
			</Form.Item>
			<Form.Item className="set-margin">
				{getFieldDecorator('remember', {
					valuePropName: 'checked',
					initialValue: true
				})(<Checkbox>记住账号</Checkbox>)}

				<a className="login-form-forgot" href="/forgot">
					忘记密码
				</a>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					登录
				</Button>
			</Form.Item>
		</Form>
	);
});
