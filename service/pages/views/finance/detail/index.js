import _ from 'lodash';
import React, { Fragment } from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';
import IconFont from '../../../components/IconFont';
import config from '../../../config/config';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import './finance_detail.scss';

import GlobalContext from '../../../components/context/GlobalContext';

@withRouter
export default class extends React.Component {
	getInfo = (item) => {
		const ex_info = item.ex_info || {};

		const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

		const selectedTags = tags.selectedTags || {};

		const mode = tags.selectedCategory;
		return `${mode} ${selectedTags['行业类型'] ? _.take(selectedTags['行业类型'].tags, 3).join(',') : ''} `;
	};

	render() {
		const { list, detail } = this.props.router.query;

		const ex_info = detail.ex_info || {};

		const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

		const selectedTags = tags.selectedTags || {};

		const mode = tags.selectedCategory;

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const projectApplys = context.projectApplys || [];
						const visits = context.visits || [];

						return (
							<div className="finance-detail-page">
								<BreadCrumb adrname_two={'金融资本'} adrname_thr={'所有资金'} />
								<div className="finance-detail-main clearfix">
									<div className="left-main">
										<div className="summary-box">
											<div className="summary-box-top">
												<h4 className="title">{detail.title}</h4>
												<div className="icon-list">
													<ul className="left-ul">
														<li>
															<IconFont className="iconfont" type="icon-shijian" />
															<span>
																{moment(detail.release_datetime).format('YYYY-MM-DD')}
															</span>
														</li>
														{/*
														<li>
															<IconFont className="iconfont" type="icon-liulan1" />
															<span>
																浏览量：{visits.find(
																	(item) => item.url.search(detail.id) >= 0
																) ? (
																		visits.find(
																			(item) => item.url.search(detail.id) >= 0
																		).visits_count
																	) : (
																		0
																	)}次
															</span>
														</li>
																	*/}
													</ul>
													<ul className="right-ul">
														{/* <li>
										<IconFont className="iconfont" type="icon-iphone" />
										<span>免费发送至手机</span>
									</li>
									<li>
										<IconFont className="iconfont" type="icon-shoucang1" />
										<span>收藏</span>
									</li>
									<li>
										<IconFont className="iconfont" type="icon-jubao1" />
										<span>举报</span>
									</li> */}
													</ul>
												</div>
											</div>
											<div className="summary-list">
												<ul className="left-ul">
													<li>投资方式：{mode}</li>
													<li>
														投资金额：{selectedTags['投资金额'] ? selectedTags['投资金额'].value : ''}万元
													</li>
													<li>
														需提供资料：{selectedTags['需提供资料'] ? (
															selectedTags['需提供资料'].tags.join(',')
														) : (
																''
															)}
													</li>
													<li>
														所在地区：{selectedTags['所在地区'] ? (
															selectedTags['所在地区'].tags.join(',')
														) : (
																''
															)}
													</li>
													{mode === '股权投资' ? (
														<Fragment>
															<li>
																投资阶段：{selectedTags['投资阶段'] ? selectedTags['投资阶段'].tags.join(',') : ''}
															</li>
															<li>
																投资类型：{selectedTags['投资类型'] ? selectedTags['投资类型'].tags.join(',') : ''}
															</li>
															<li>
																投资期限：{selectedTags['投资期限'] ? selectedTags['投资期限'].value : ''}年
															</li>
														</Fragment>
													) : (
															<Fragment>
																<li>
																	最低回报：{selectedTags['最低回报要求'] ? selectedTags['最低回报要求'].value : ''}
																</li>
																<li>
																	风控要求：{selectedTags['风控要求'] ? selectedTags['风控要求'].tags.join(',') : ''}
																</li>
															</Fragment>
														)}
												</ul>
												<ul className="right-ul">
													<li>
														资金类型：{selectedTags['资金类型'] ? (
															selectedTags['资金类型'].tags.join(',')
														) : (
																''
															)}
													</li>
													<li>
														投资行业：{selectedTags['行业类型'] ? (
															_.take(selectedTags['行业类型'].tags, 3).join(',')
														) : (
																''
															)}
													</li>
													<li>
														投资地区：{selectedTags['投资地区'] ? (
															selectedTags['投资地区'].tags.join(',')
														) : (
																''
															)}
													</li>
													<li>
														前期费用：{selectedTags['前期费用'] && !!selectedTags['前期费用'].value ? (
															selectedTags['前期费用'].value
														) : (
																'无'
															)}
													</li>
													{mode === '股权投资' ? (
														<Fragment>
															<li>
																占股比例：{selectedTags['占股比例'] ? selectedTags['占股比例'].tags.join(',') : ''}
															</li>
															<li>
																参股类型：{selectedTags['参股类型'] ? selectedTags['参股类型'].tags.join(',') : ''}
															</li>
														</Fragment>
													) : (
															<Fragment>
																<li>
																	抵押物类型：{selectedTags['抵押物类型'] &&
																		!!selectedTags['抵押物类型'].value ? (
																			selectedTags['抵押物类型'].value
																		) : (
																			'无'
																		)}
																</li>
																<li>
																	抵质押物折扣率：{selectedTags['抵质押物折扣率'] ? selectedTags['抵质押物折扣率'].value : ''}
																</li>
															</Fragment>
														)}
												</ul>
											</div>
											<div className="delivery-box">
												<img
													className="service-bg-img"
													src={config.staticImgUrl + 'finance-icon.png'}
												/>
												<div className="content">
													<h4>投递项目让融资更主动！</h4>
													{/* <p>将信息直接发送到投资人手机，</p> */}
												</div>

												{projectApplys.find((apply) => apply.project_id === detail.id) ? (
													<a
														className="btn"
														href="javascript:;"
														style={{ background: '#ccc' }}
													>
														已投递
													</a>
												) : (
														<a className="btn" onClick={() => context.applyProject(detail)}>
															<IconFont className="iconfont" type="icon-iLinkapp-" />立即投递
													</a>
													)}
											</div>
											{!selectedTags['资金详情'] ? (
												' '
											) : (
													<div className="item-main">
														<div className="item-top">
															<div className="icon">
																<IconFont className="iconfont" type="icon-gaishu" />
																<span>资金详情</span>
															</div>
														</div>
														<div className="item-content">{selectedTags['资金详情'].value}</div>
													</div>
												)}
										</div>
										<p className="recommend-title">资金推荐</p>
										<div className="recommend">
											{list.map((item) => (
												<a
													as={`/finance/detail/${item.id}`}
													href={`/finance/detail?id=${item.id}`}
													key={item.id}
												>
													<div className="item">
														{/* <img src={!!item.thumbnail ? item.thumbnail.url : ''} /> */}
														<h4>{item.title}</h4>
														<p>
															<p>{this.getInfo(item)}</p>
														</p>
													</div>
												</a>
											))}
										</div>
									</div>
									<div className="right-main">
										<h4 className="title">会员名片</h4>
										<img className="service-bg-img" src={config.staticImgUrl + 'avatar-img.png'} />
										<p className="name">
											{detail.contacts ? (
												_.padEnd(detail.contacts.substr(0, 1), detail.contacts.length, '*')
											) : (
													''
												)}
										</p>
										<p className="text" style={{ textAlign: 'center' }}>
											{detail.company ? (
												`所在公司： ${_.padStart(
													detail.company.substr(
														detail.company.length - 2,
														detail.company.length
													),
													detail.company.length,
													'*'
												)}`
											) : (
													'个人投资者'
												)}
										</p>

										{projectApplys.find((apply) => apply.project_id === detail.id) ? (
											<a className="btn" href="javascript:;" style={{ background: '#ccc' }}>
												已投递
											</a>
										) : (
												<a className="btn" onClick={() => context.applyProject(detail)}>
													<IconFont className="iconfont" type="icon-iLinkapp-" />立即投递
											</a>
											)}
									</div>
								</div>
							</div>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
