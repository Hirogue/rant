import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const HomeLoginForm = Form.create({
	name: 'home_login_form'
})((props) => {
	const { handleLoginSubmit, form } = props;

	const { getFieldDecorator } = form;

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
						{ required: true, message: '请输入您的手机号!' },
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
					initialValue: true,
					valuePropName: 'checked'
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

export default HomeLoginForm;
