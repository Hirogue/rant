import React from 'react';
import Link from 'next/link';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const LoginForm = Form.create({
	name: 'home_login_form'
})((props) => {
	const { handleLoginSubmit, form } = props;

	const { getFieldDecorator, getFieldsValue } = form;

	let phone = '';

	if (typeof window !== 'undefined') {
		phone = localStorage.getItem('user-phone-number');
	}

	return (
		<Form
			onSubmit={(e) => {
				handleLoginSubmit(e, props);
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
					rules: [ { required: true, message: '请输入你的密码!' } ]
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
				{/* <a className="login-text-links" href="">还不是会员？免费注册</a> */}
			</Form.Item>
		</Form>
	);
});

export default LoginForm;
