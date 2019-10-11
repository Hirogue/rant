import { Button, Layout, Modal } from 'antd';
import { useContext } from 'react';
import { IdentityEnum, UserStatusEnum } from '../../lib/enum';
import { jump } from '../../lib/global';
import UserFooter from '../UserFooter';
import UserHeader from '../UserHeader';
import GlobalLayout from './GlobalLayout';
import './user_layout.scss';
import withContext, { GlobalContext } from './withContext';

const { Header, Content, Footer } = Layout;

export default withContext(({ props }) => {

	const { user, router: { asPath } } = useContext(GlobalContext);

	return (
		<GlobalLayout>
			{!user ?
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
						<Button type="primary" onClick={() => jump('/login')}>
							立即登录
						</Button>
					</p>
				</Modal>
				:
				<>
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
										<h4>
											欢迎您,<a href="/user">
												<span>
													{user.realname ? user.realname : user.account}
												</span>
											</a>
										</h4>
										<p style={{ padding: '10px 0 0 0' }}>
											{user.realname ? user.realname : user.account}
										</p>
										<p style={{ paddingBottom: 20 }}>会员等级:V{user.vip}</p>

										<Button type="primary" onClick={() => jump('/user')}>
											{user.vip <= 0 ? '升级VIP' : '我的资料'}
										</Button>
										{user.vip <= 0 ? (
											<p>升级等级后可以发布项目、资金或者分享名片。</p>
										) : null}
									</div>
									<div className="left-bottom">
										<div className={`navitem ${asPath === '/user/apply/product'
											? 'active'
											: ''}`}
											onClick={() => jump('/user/apply/product')}
										>
											<p>金融服务</p>
										</div>
										<div className={`navitem ${asPath === '/user/apply/project'
											? 'active'
											: ''}`}
											onClick={() => jump('/user/apply/project')}
										>
											<p>我投递的项目</p>
										</div>
										<div className={`navitem ${asPath === '/user/apply/capital'
											? 'active'
											: ''}`}
											onClick={() => jump('/user/apply/capital')}
										>
											<p>我投递的资金</p>
										</div>
										<div className={`navitem ${asPath === '/user/apply/service'
											? 'active'
											: ''}`}
											onClick={() => jump('/user/apply/service')}
										>
											<p>名片管理</p>
										</div>

										{
											IdentityEnum.FINANCER === user.identity
												&&
												UserStatusEnum.CHECKED === user.status ? (
													<div
														className={`navitem ${asPath === '/user/project'
															? 'active'
															: ''}`}
														onClick={() => jump('/user/project')}
													>
														<p>项目管理</p>
													</div>
												) : (
													''
												)}
										{
											IdentityEnum.INVESTOR === user.identity
												&&
												UserStatusEnum.CHECKED === user.status ? (
													<div
														className={`navitem ${asPath === '/user/funding'
															? 'active'
															: ''}`}
														onClick={() => jump('/user/funding')}
													>
														<p>资金管理</p>
													</div>
												) : (
													''
												)}
									</div>
								</div>
								<div className="right">{props.children}</div>
							</div>
						</div>
					</Content>
					<Footer style={{ width: '100%', padding: 0 }}>
						<UserFooter />
					</Footer>
				</>
			}
		</GlobalLayout>
	)
});