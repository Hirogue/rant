import React, { Fragment } from 'react';
import _ from 'lodash';
import { withRouter } from 'next/router';
import IconFont from '../../../components/IconFont';
import config from '../../../config/config';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import './project_detail.scss';
import GlobalContext from '../../../components/context/GlobalContext';

@withRouter
export default class extends React.Component {
	getInfo = (item) => {
		const ex_info = item.ex_info || {};

		const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

		const selectedTags = tags.selectedTags || {};

		const mode = tags.selectedCategory;
		return `${mode} ${selectedTags['所属行业'] ? _.take(selectedTags['所属行业'].tags, 2).join(',') : ''} `;
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
							<div className="project-detail-page">
								<BreadCrumb adrname_two={'项目招商'} adrname_thr={'全部项目'} />
								<div className="project-summary-main clearfix">
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
												立即投递
											</a>
										)}
									</div>
									<div className="left-main">
										<div className="project-summary">
											<div className="left">
												<img
													className="project-top-img"
													src={!!detail.thumbnail ? detail.thumbnail.url : ''}
												/>
											</div>
											<div className="right">
												<h4 className="title">{detail.title}</h4>
												<ul className="join">
													<li>
														<p>融资方式</p>
														<h5>{mode}</h5>
													</li>
													<li>
														<p>所属行业</p>
														<h5>
															{selectedTags['所属行业'] ? (
																_.take(selectedTags['所属行业'].tags, 2).join(',')
															) : (
																''
															)}
														</h5>
													</li>
												</ul>
												<ul className="assets">
													<li>
														<p>可提供资料</p>
														<h5>
															{selectedTags['可提供资料'] ? (
																selectedTags['可提供资料'].tags.join(',')
															) : (
																''
															)}
														</h5>
													</li>
													<li>
														<p>融资金额</p>
														<h5>
															{selectedTags['融资金额'] ? selectedTags['融资金额'].value : ''}万元
														</h5>
													</li>
												</ul>
												{mode === '股权融资' ? (
													<Fragment>
														<ul className="assets-list">
															<li>
																<p>
																	资金方占股比例：
																	{selectedTags['占股比例'] ? (
																		selectedTags['占股比例'].tags.join(',')
																	) : (
																		''
																	)}
																</p>
															</li>
															<li>
																<p>
																	项目所处阶段：
																	{selectedTags['所处阶段'] ? (
																		selectedTags['所处阶段'].tags.join(',')
																	) : (
																		''
																	)}
																</p>
															</li>
														</ul>
														<ul className="assets-list">
															<li>
																<p>
																	投资退出方式：
																	{selectedTags['退出方式'] ? (
																		selectedTags['退出方式'].tags.join(',')
																	) : (
																		''
																	)}
																</p>
															</li>
															<li>
																<p>
																	最短退出年限：
																	{selectedTags['最短退出年限'] ? (
																		selectedTags['最短退出年限'].tags.join(',')
																	) : (
																		''
																	)}
																</p>
															</li>
														</ul>
													</Fragment>
												) : (
													''
												)}

												{mode === '债权融资' ? (
													<Fragment>
														<ul className="assets-list">
															<li>
																<p>
																	资金占用时长：
																	{selectedTags['资金占用时长'] ? (
																		selectedTags['资金占用时长'].tags.join(',')
																	) : (
																		''
																	)}
																</p>
															</li>
															<li>
																<p>
																	可承担最高利息：
																	{selectedTags['承担利息'] ? (
																		selectedTags['承担利息'].tags.join(',')
																	) : (
																		''
																	)}
																</p>
															</li>
														</ul>
														<ul className="assets-list">
															<li>
																<p>
																	可提供风控：
																	{selectedTags['风控要求'] ? (
																		`${selectedTags['风控要求'].tags.join(
																			','
																		)}${selectedTags['风控要求'].value
																			? ' -' + selectedTags['风控要求'].value
																			: ''}`
																	) : (
																		''
																	)}
																</p>
															</li>
															<li>
																<p>
																	{!!selectedTags['还款来源'] &&
																	!!selectedTags['还款来源'].value ? (
																		<p className="icon-text">
																			还款来源：
																			{selectedTags['还款来源'].value}
																		</p>
																	) : (
																		''
																	)}
																</p>
															</li>
														</ul>
													</Fragment>
												) : (
													''
												)}
												<ul className="assets-list">
													<li>
														<p>
															所在地区：{' '}
															{selectedTags['所在地区'] ? (
																selectedTags['所在地区'].tags.join(',')
															) : (
																''
															)}
														</p>
													</li>
													{/*
													<li>
														<p>
															浏览量：{visits.find(
																(item) => item.url.search(detail.id) >= 0
															) ? (
																visits.find((item) => item.url.search(detail.id) >= 0)
																	.visits_count
															) : (
																0
															)}次
														</p>
													</li>
													*/}
												</ul>
											</div>
										</div>
										{!selectedTags['项目介绍'] || !selectedTags['项目介绍'].value ? (
											' '
										) : (
											<div className="item-main">
												<div className="item-top">
													<div className="icon">
														<IconFont className="iconfont" type="icon-gaishu" />
														<span>项目介绍</span>
													</div>
												</div>
												<div className="item-content">{selectedTags['项目介绍'].value}</div>
											</div>
										)}
										{!selectedTags['融资用途'] || !selectedTags['融资用途'].value ? (
											' '
										) : (
											<div className="item-main">
												<div className="item-top">
													<div className="icon">
														<IconFont className="iconfont" type="icon-gaishu" />
														<span>融资用途</span>
													</div>
												</div>
												<div className="item-content">{selectedTags['融资用途'].value}</div>
											</div>
										)}
										{!selectedTags['团队介绍'] || !selectedTags['团队介绍'].value ? (
											' '
										) : (
											<div className="item-main">
												<div className="item-top">
													<div className="icon">
														<IconFont className="iconfont" type="icon-gaishu" />
														<span>团队介绍</span>
													</div>
												</div>
												<div className="item-content">{selectedTags['团队介绍'].value}</div>
											</div>
										)}
										{!selectedTags['项目优势'] || !selectedTags['项目优势'].value ? (
											' '
										) : (
											<div className="item-main">
												<div className="item-top">
													<div className="icon">
														<IconFont className="iconfont" type="icon-gaishu" />
														<span>项目优势</span>
													</div>
												</div>
												<div className="item-content">{selectedTags['项目优势'].value}</div>
											</div>
										)}
										{!selectedTags['项目进展'] || !selectedTags['项目进展'].value ? (
											' '
										) : (
											<div className="item-main">
												<div className="item-top">
													<div className="icon">
														<IconFont className="iconfont" type="icon-gaishu" />
														<span>项目进展</span>
													</div>
												</div>
												<div className="item-content">{selectedTags['项目进展'].value}</div>
											</div>
										)}
										<p className="recommend-title">项目推荐</p>
										<div className="recommend">
											{list.map((item) => (
												<div className="item" key={item.id}>
													<a href={`/project/detail?id=${item.id}`}>
														<img src={!!item.thumbnail ? item.thumbnail.url : ''} />
														<h4>{item.title}</h4>
														<p>{this.getInfo(item)}</p>
													</a>
												</div>
											))}
										</div>
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
