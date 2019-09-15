import React, { Fragment, useEffect } from 'react';
import _ from 'lodash';
import { withRouter } from 'next/router';
import { Spin } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import moment from 'moment';
import QRCode from 'qrcode';
import IconFont from '../../../components/IconFont';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import './finance_detail.scss';
import config from '../../../config/config';
import { createApolloClient } from "../../../lib/apollo";
import { buildingQuery, getUrlParam, toApplayCommonHandler, asyncEffectHandler } from "../../../lib/global";
import { Q_GET_CAPITAL_DETAIL, M_APPLY_CAPITALS } from '../../../gql'
import { IFT_MODE_ENUM, DEFAULT_AVATAR,PC_2_MOBILE_MAP } from '../../../lib/enum';

const client = createApolloClient();
const defaultVariables = {
	join: [
		{ field: 'creator' },
		{ field: 'industry' },
		{ field: 'area' },
		{ field: 'stage' },
		{ field: 'type' },
		{ field: 'equity_type' },
		{ field: 'invest_type' },
		{ field: 'invest_area' },
		{ field: 'risk' },
		{ field: 'data' },
		{ field: 'term' },
		{ field: 'ratio' },
		{ field: 'return' },
		{ field: 'pledge' },
		{ field: 'discount' },
		{ field: 'pre_payment' },
	],
};

export default withRouter((props) => {

	let { router } = props;
	let id = getUrlParam(router, 'id');
	let user = {};

	try {
		user = JSON.parse(localStorage.getItem('u_user')) || null;
	} catch (error) {
		console.info('您还未登录！');
	}

	const { loading, data: { capital, queryCapital } } = useQuery(Q_GET_CAPITAL_DETAIL, {
		fetchPolicy: "no-cache",
		client: client,
		variables: {
			id,
			queryString: buildingQuery(defaultVariables),
			queryMore: buildingQuery({
				page: 1,
				limit: 20,
				join: [{ field: "industry" }],
				filter: [
					{ field: "status", operator: CondOperator.IN, value: "checked,waiting,following" },
					{ field: "id", operator: CondOperator.NOT_EQUALS, value: id }
				],
				sort: [{ field: 'publish_at', order: 'DESC' }],
			})
		}
	});

	useEffect(() => {
		asyncEffectHandler(async () => {
			try {
				document.querySelector('#qrcode').src = await QRCode.toDataURL(`${PC_2_MOBILE_MAP['finance']}/${id}`);
			} catch (error) {
				console.error(error.message);
			}
		})
	}, [capital])

	const toSetVal = (val) => (key) => (def) => val && val[key] ? val[key] : def;

	const toShowApplyButton = (data) => (applyArray) => {
		if (data.status === 'finished') {
			return <a className="btn btn-finished" href="javascript:;" style={{ background: '#ccc' }}>已结束</a>;
		}
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return <a className="btn" href="javascript:;" style={{ background: '#ccc' }}>已投递</a>;
		}
		return <a className="btn" onClick={() => toApplayCommonHandler(router, { capital: data }, M_APPLY_CAPITALS)}><IconFont className="iconfont" type="icon-iLinkapp-" />立即投递</a>;
	}	

	const recommendation = queryCapital && queryCapital.data ? queryCapital.data.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,4) : [];	
	const mode = capital ? IFT_MODE_ENUM[capital.category] : '';

	if (loading) return <Spin style={{ position: "fixed", top: "50%", left: "50%" }} tip="正在加载中" />;

	if (capital.title) document.title = capital.title;

	return (
		<BaseLayout>
			<div className="finance-detail-page">
				<BreadCrumb adrname_two={'金融资本'} adrname_thr={'所有资金'} />
				<div className="finance-detail-main clearfix">
					<div className="left-main">
						<div className="summary-box">
							<div className="summary-box-top">
								<h4 className="title">{capital.title}</h4>
								<div className="icon-list">
									<ul className="left-ul">
										<li>
											<IconFont className="iconfont" type="icon-shijian" />
											<span>
												{moment(capital.publish_at).format('YYYY-MM-DD')}
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
									<li>投资方式：{IFT_MODE_ENUM[capital.category]}</li>
									<li>投资金额：{capital.amount}万元</li>
									<li>需提供资料：{capital.data && capital.data.map(item => item.title).join(',')}</li>
									<li>所在地区：{capital.area_path}</li>
									{mode === '股权投资' ? (
										<Fragment>
											<li>
												投资阶段：{capital.stage.length ? capital.stage.map(item => item.title).join('，') : '未知'}
											</li>
											<li>
												投资类型：{capital.invest_type.length ? capital.invest_type.map(item => item.title).join('，') : "未知"}
											</li>
											<li>
												投资期限：{capital.term ? capital.term.title : '未知'}
											</li>
										</Fragment>
									) : (
											<Fragment>
												<li>
													最低回报：{capital.return || "未知"}
												</li>
												<li>
													风控要求：{capital.risk ? capital.risk.title : '未知'}
												</li>
											</Fragment>
										)}
								</ul>
								<ul className="right-ul">
									<li>
										资金类型：{capital.type.length ? capital.type.map(item => item.title).join('，') : '未知'}
									</li>
									<li>
										投资行业：{capital.industry.length ? capital.industry.map(item => item.title).join('，') : '暂无'}
									</li>
									<li>
										投资地区：{capital.invest_area.length ? capital.invest_area.map(item => item.title).join('，') : '未知'}
									</li>
									<li>
										前期费用：{capital.pre_payment || '未知'}
									</li>
									{mode === '股权投资' ? (
										<Fragment>
											<li>
												占股比例：{capital.ratio ? capital.ratio.title : '未知'}
											</li>
											<li>
												参股类型：{capital.equity_type ? capital.equity_type.title : '未知'}
											</li>
										</Fragment>
									) : (
											<Fragment>
												<li>
													抵押物类型：{capital.pledge || '未知'}
												</li>
												<li>
													抵质押物折扣率：{capital.discount || '未知'}
												</li>
											</Fragment>
										)}
								</ul>
							</div>
							<div className="delivery-box">
								<img
									className="service-bg-img"
									src={'/static/img/finance-icon.png'}
								/>
								<div className="content">
									<h4>投递项目让融资更主动！</h4>
									{/* <p>将信息直接发送到投资人手机，</p> */}
								</div>
								{toShowApplyButton(capital)(user ? user.apply_capitals : null)}
							</div>
							{capital.info ? (
								<div className="item-main">
									<div className="item-top">
										<div className="icon">
											<IconFont className="iconfont" type="icon-gaishu" />
											<span>资金详情</span>
										</div>
									</div>
									<div className="item-content">{capital.info || "暂无详情"}</div>
								</div>
							) : ''}
						</div>
						<p className="recommend-title">资金推荐</p>
						<div className="recommend">
							{recommendation.map((item) => (
								<a
									as={`/finance/detail/${item.id}`}
									href={`/finance/detail?id=${item.id}`}
									key={item.id}
								>
									<div className="item">
										{/* <img src={!!item.thumbnail ? item.thumbnail.url : ''} /> */}
										<h4>{item.title}</h4>
										<p>
											<p>{IFT_MODE_ENUM[item.category]}&nbsp;{!!item.industry.length && item.industry.map(item => item.title).join('，')}</p>
										</p>
									</div>
								</a>
							))}
						</div>
					</div>
					<div className="right-main">
						<h4 className="title">会员名片</h4>
						<img className="service-bg-img" src={toSetVal(capital.creator)('avatar')(DEFAULT_AVATAR)} />
						<p className="name">{toSetVal(capital)('hideContact')('未知姓名')}</p>
						<p className="text" style={{ textAlign: 'center' }}>{toSetVal(capital)('hideCompany')('未知公司')}</p>
						{toShowApplyButton(capital)(user ? user.apply_capitals : null)}
						<div style={{ width: "150px", margin: "0 auto", display: "block" }}>
							<img id="qrcode" style={{ width: "150px", height: "150px", borderRadius: '6px', display: "block" }} src={config.staticImgUrl + '移动端二维码.png'} alt='placeholder+image' />
							<p style={{ fontSize: "14px", color: "#FFF", textAlign: "center" }}>在移动端查看此页面</p>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	)
})


// @withRouter
// export default class extends React.Component {
// 	getInfo = (item) => {
// 		const ex_info = item.ex_info || {};

// 		const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

// 		const selectedTags = tags.selectedTags || {};

// 		const mode = tags.selectedCategory;
// 		return `${mode} ${selectedTags['行业类型'] ? _.take(selectedTags['行业类型'].tags, 3).join(',') : ''} `;
// 	};

// 	render() {
// 		const { list, detail } = this.props.router.query;

// 		const ex_info = detail.ex_info || {};

// 		const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

// 		const selectedTags = tags.selectedTags || {};

// 		const mode = tags.selectedCategory;

// 		return (
			
// 				<GlobalContext.Consumer>
// 					{(context) => {
// 						const projectApplys = context.projectApplys || [];
// 						const visits = context.visits || [];

// 						return (
							
// 						);
// 					}}
// 				</GlobalContext.Consumer>
// 			</BaseLayout>
// 		);
// 	}
// }
