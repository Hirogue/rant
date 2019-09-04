import { Tabs } from 'antd';
import React, { useContext } from 'react';
import LoginLayout from '../../components/Layout/LoginLayout';
import withContext, { GlobalContext } from '../../components/Layout/withContext';
import './login.scss';
import LoginForm from './login_form';
import RegisterForm from './register_form';

const TabPane = Tabs.TabPane;

export default withContext(({ props }) => {

	const { router, staticImgUrl } = useContext(GlobalContext);

	return (
		<LoginLayout>
			<div className="login-main">
				<div className="login-box">
					<div className="left">
						<p style={{ textAlign: 'left' }}>永不落幕的</p>
						<h4>
							<span>投融资对接</span>平台
 						</h4>
						<img className="about-banner" src={staticImgUrl + 'login-img.png'} />
					</div>
					<div className="right">
						<div className="login-mod">
							<div className="login-mod-box">
								<Tabs
									type="card"
									defaultActiveKey={router.asPath === '/login' ? '1' : '2'}
								>
									<TabPane tab="登录" key="1">
										<LoginForm />
									</TabPane>
									<TabPane tab="免费注册" key="2">
										<RegisterForm />
									</TabPane>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LoginLayout>
	)
});
