import React, { Fragment, useState } from 'react';
import _ from 'lodash';
import { Input, Select, AutoComplete, Menu, Dropdown, Button } from 'antd';
import { withRouter } from 'next/router';
import GlobalContext from '../context/GlobalContext';

import config from '../../config/config';
import IconFont from '../IconFont';
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = AutoComplete;

import './header.scss';

export default withRouter((props) => {

	let user = null;
	try {
		user = JSON.parse(localStorage.getItem('u_user')) || {};
	} catch (error) {
		console.error(error.message);
	}


	const [state, setState] = useState({
		currentMenu: '',
		category: 'project',
		value: ''
	})

	const onVisibleChange = (path, visible) => {
		setState((state) => ({
			...state,
			currentMenu: visible ? path : ''
		}));
	};

	const { currentMenu } = state;
	const { router } = props;
	const defaultCategory = router.query.searchCategory || state.category;
	const defaultKeyword = router.query.keyword || state.value;

	const siteInfo = {};
	const currentPath = '/';

	const help = { link: "/help/detail?id=9bee2f4c-a690-4da3-85b5-b25a139c37c3" };
	// const help = _.find(siteInfo.mapLinks, (item) => item.name === '新手帮助');
	// const law = _.find(siteInfo.mapLinks, (item) => item.name === '法律声明');

	return (
		<GlobalContext.Consumer>
			{(context) => {



				return (
					<div className="header-container">
						<div className="header-top">
							<div className="header-top-box">
								<div className="header-tel-text">
									<IconFont className="iconfont" type="icon-telephone" />
									<p>客服热线：</p>
									<h4>{siteInfo.hotline || "0791-87705085"}</h4>
								</div>
								<ul className="header-top-nav">
									{!!user ? (
										<Fragment>
											<li className="nav-li">
												<span className="text">
													<span>尊敬的{`V${user.vip}`}用户{user.vip === 0 && <a className="user-level-up" href="/user">（立即升级）</a>}</span>
													<a className="user-center" href="/user">{user.realname || user.phone}，&nbsp;</a>
													<span>您好！</span>
												</span>
											</li>
											<li className="nav-li">
												<span className="text" onClick={() => { localStorage.clear(); window.location.reload() }}> 注销 </span>
											</li>
										</Fragment>
									) : (
											<Fragment>
												<li className="nav-li">
													<a className="user-level-up" href="/login">
														<IconFont className="iconfont" type="icon-denglu" />
														<span className="text">登录</span>
													</a>
												</li>

												<li className="nav-li">
													<a className="user-level-up" href="/register">
														<span className="text">注册</span>
													</a>
												</li>
												<li className="nav-li">
													<a className="service" onClick={() => context.serviceEntry()}>
														项目服务商免费入驻
														</a>
												</li>
											</Fragment>
										)}

									{/* <Link href="/help">
												<li className="nav-li">
													<span className="set-border-

	right">|</span>
													<span className="text">新手指引

	</span>
													<span className="set-border-

	right">|</span>
												</li>
											</Link> */}

									{/* <li className="nav-li">
												<IconFont className="iconfont" 

	type="icon-weixin" />
											</li> */}
								</ul>
							</div>
						</div>
						<div className="header-nav">
							<a className="logo" href="/">
								<img src={config.staticImgUrl + 'fengjingduhao.jpg'} alt="" />
								<img src={config.staticImgUrl + '001.png'} alt="" />
							</a>
							<div className="search-mod">
								<InputGroup compact>
									<Select
										style={{ width: 100, height: 40 }}
										defaultValue={defaultCategory}
										onChange={(category) => {
											setState((state) => ({
												...state,
												category,
												value: defaultKeyword
											}));
										}}
									>
										<Option value="project">项目</Option>
										<Option value="finance">资金</Option>
										<Option value="product">江旅金融</Option>
									</Select>

									<Search
										style={{ width: 150, height: 40 }}
										placeholder="搜索关键词"
										defaultValue={defaultKeyword}
										onSearch={(value) => {
											// window.location.href = `/search?searchCategory=${state
											// 	.category}&keyword=${value}`;
											setState((state) => ({
												...state,
												value
											}));
										}}
										enterButton
									/>
									<Button
										style={{ width: 40, height: 40 }}
										type="primary"
										shape="circle"
										icon="search"
										onClick={() => {
											window.location.href = `/search?searchCategory=${state
												.category}&keyword=${state.value}`;
										}}
									/>
								</InputGroup>
							</div>
							<div className="icon-link">
								<div className="item origin" onClick={() => context.publishAll()}>
									<IconFont className="iconfont" type="icon-fabu" />
									<p>免费发布</p>
								</div>
								<div className="item" onClick={() => context.showModalLegal()}>
									<IconFont className="iconfont" type="icon-baojifuben" />
									<p>法律声明</p>
								</div>
								<div className="item" onClick={() => (window.location.href = help.link)}>
									<IconFont className="iconfont" type="icon-bangzhu" />
									<p>新手帮助</p>
								</div>
							</div>
						</div>
						<div className="navlist">
							<ul className="nav-list">
								<li
									className={`nav-li  ${!currentPath ||
										_.startsWith(currentPath, '/#') ||
										currentPath === '/'
										? 'active'
										: ''}`}
								>
									<a href={'/'}>
										<span><IconFont className="iconfont" type="icon-home" />首页</span>
									</a>
								</li>
								<li
									className={`nav-li  ${_.startsWith(currentPath, '/project')
										? 'active'
										: ''} ${currentMenu === '/project' ? 'nav-active' : ''}`}
								>
									<a href="/project">
										<Dropdown
											className="dropdown-find"
											overlay={
												<Menu>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="javascript:;"
														>
															<IconFont className="iconfont" type="icon-jingqu" />
															<br />江西文旅项目
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/project?category=股权融资"
														>
															<IconFont className="iconfont" type="icon-guquanrongzi" />
															<br />股权融资
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/project?category=债权融资"
														>
															<IconFont className="iconfont" type="icon-zhaiquanrongzi" />
															<br />债权融资
																</a>
													</Menu.Item>
												</Menu>
											}
											placement="bottomCenter"
											onVisibleChange={(visible) => onVisibleChange('/project', visible)}
										>
											<span>项目招商</span>
										</Dropdown>
									</a>
								</li>
								<li
									className={`nav-li  ${_.startsWith(currentPath, '/finance')
										? 'active'
										: ''} ${currentMenu === '/finance' ? 'nav-active' : ''}`}
								>
									<a href="/finance">
										<Dropdown
											className="dropdown-find"
											overlay={
												<Menu>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=酒店与民宿"
														>
															<IconFont className="iconfont" type="icon-jiudian" />
															<br />酒店与民宿
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=旅行社"
														>
															<IconFont className="iconfont" type="icon-lvhangshe_icon" />
															<br />旅行社
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=旅游快消品"
														>
															<IconFont className="iconfont" type="icon-xiaofei" />
															<br />旅游快消品
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=旅游大交通"
														>
															<IconFont className="iconfont" type="icon-traffic" />
															<br />旅游大交通
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=旅游餐饮"
														>
															<IconFont className="iconfont" type="icon-canyin" />
															<br />旅游餐饮
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=景区"
														>
															<IconFont className="iconfont" type="icon-jingqu" />
															<br />景区
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=旅游康养"
														>
															<IconFont className="iconfont" type="icon-74133" />
															<br />旅游康养
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/finance?industry=智慧旅游"
														>
															<IconFont className="iconfont" type="icon-lvyou" />
															<br />智慧旅游
																</a>
													</Menu.Item>
												</Menu>
											}
											placement="bottomCenter"
											onVisibleChange={(visible) => onVisibleChange('/finance', visible)}
										>
											<span>金融资本</span>
										</Dropdown>
									</a>
								</li>

								<li
									className={`nav-li  ${_.startsWith(currentPath, '/service')
										? 'active'
										: ''} ${currentMenu === '/service' ? 'nav-active' : ''}`}
								>
									<a href="/service">
										<Dropdown
											className="dropdown-find"
											overlay={
												<Menu>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/service?category=评估机构"
														>
															<IconFont className="iconfont" type="icon-pinggujigou" />
															<br />评估机构
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/service?category=会计事务所"
														>
															<IconFont className="iconfont" type="icon-huijishiwusuo" />
															<br />会计事务所
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/service?category=律师事务所"
														>
															<IconFont className="iconfont" type="icon-lawfirm" />
															<br />律师事务所
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/service?category=运营机构"
														>
															<IconFont className="iconfont" type="icon-yunying" />
															<br />运营机构
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/service?category=策划机构"
														>
															<IconFont className="iconfont" type="icon-cehua" />
															<br />策划机构
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/service?category=宣传机构"
														>
															<IconFont className="iconfont" type="icon-xuanchuan" />
															<br />宣传机构
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/service?category=其他"
														>
															<IconFont className="iconfont" type="icon-iconqita" />
															<br />其他
																</a>
													</Menu.Item>
												</Menu>
											}
											placement="bottomCenter"
											onVisibleChange={(visible) => onVisibleChange('/service', visible)}
										>
											<span>配套服务</span>
										</Dropdown>
									</a>
								</li>
								<li
									className={`nav-li  ${_.startsWith(currentPath, '/news')
										? 'active'
										: ''} ${currentMenu === '/news' ? 'nav-active' : ''}`}
								>
									<a href="/news">
										<Dropdown
											className="dropdown-find"
											overlay={
												<Menu>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/news?category=1"
														>
															<IconFont className="iconfont" type="icon-jianjie" />
															<br />行业快讯
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/news?category=2"
														>
															<IconFont className="iconfont" type="icon-zixun1" />
															<br />江旅资讯
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/news?category=3"
														>
															<IconFont className="iconfont" type="icon-tuceng" />
															<br />投融研报
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/news?category=4"
														>
															<IconFont className="iconfont" type="icon-xuetang" />
															<br />投融学堂
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="javascript:;"
														>
															<IconFont className="iconfont" type="icon-tongzhi" />
															<br />政策公告
																</a>
													</Menu.Item>
												</Menu>
											}
											placement="bottomCenter"
											onVisibleChange={(visible) => onVisibleChange('/news', visible)}
										>
											<span>政策资讯</span>
										</Dropdown>
									</a>
								</li>
								<li
									className={`nav-li  ${_.startsWith(currentPath, '/product')
										? 'active'
										: ''} ${currentMenu === '/product' ? 'nav-active' : ''}`}
								>
									<a href="/product">
										<Dropdown
											className="dropdown-find"
											overlay={
												<Menu>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/product?category=供应链金融产品"
														>
															<IconFont
																className="iconfont"
																type="icon-gongyinglianjinrong"
															/>
															<br />
															供应链金融产品
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/news/detail?id=dfba0ee3-fea2-4af1-8cde-de74f8b5f61a"
														>
															<IconFont className="iconfont" type="icon-zhihuilvyou" />
															<br />旅游产业投资基金
																</a>
													</Menu.Item>
													<Menu.Item>
														<a
															rel="noopener noreferrer"
															href="/news/detail?id=32ea9776-250e-420d-9fbd-6bdff649e1dd"
														>
															<IconFont className="iconfont" type="icon-cehua" />
															<br />策略投资
																</a>
													</Menu.Item>
												</Menu>
											}
											placement="bottomCenter"
											onVisibleChange={(visible) => onVisibleChange('/product', visible)}
										>
											<span>江旅金融</span>
										</Dropdown>
									</a>
								</li>
								<li className={`nav-li  ${_.startsWith(currentPath, '/about') ? 'active' : ''}`}>
									<a href="/about"><span>关于我们</span></a>
								</li>
								<li
									className={`nav-li  ${_.startsWith(currentPath, 'http://2b.tolvyo.com/Login/Index')
										? 'active'
										: ''} ${currentMenu === 'http://2b.tolvyo.com/Login/Index' ? 'nav-active' : ''}`}
								>
									<a href="http://2b.tolvyo.com/Login/Index" target="_blank">
										<span><img src={config.staticImgUrl + 'ganyoutong.png'} alt="" />赣游通</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				)
			}}
		</GlobalContext.Consumer>
	)
})

