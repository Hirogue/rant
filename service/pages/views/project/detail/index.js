import React, { Fragment, useEffect } from 'react';
import _ from 'lodash';
import { withRouter } from 'next/router';
import { Spin } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import QRCode from 'qrcode';
import IconFont from '../../../components/IconFont';
import config from '../../../config/config';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import './project_detail.scss';
import { createApolloClient } from "../../../lib/apollo";
import { buildingQuery, getUrlParam, toApplayCommonHandler, asyncEffectHandler } from "../../../lib/global";
import { Q_GET_PROJECT_DETAIL, M_APPLY_PROJECTS } from '../../../gql'
import { IF_MODE_ENUM, DEFAULT_AVATAR, PC_2_MOBILE_MAP } from '../../../lib/enum';

const client = createApolloClient();
const defaultVariables = {
	join: [
		{ field: 'creator' },
		{ field: 'exit_mode' },
		{ field: 'industry' },
		{ field: 'ratio' },
		{ field: 'stage' },
		{ field: 'withdrawal_year' },
		{ field: 'data' },
		{ field: 'area' },
		{ field: 'risk' },
		{ field: 'interest' },
		{ field: 'occupancy_time' },
	]
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

	const { loading, data: { project, queryProject } } = useQuery(Q_GET_PROJECT_DETAIL, {
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
				document.querySelector('#qrcode').src = await QRCode.toDataURL(`${PC_2_MOBILE_MAP['project']}/${id}`);
			} catch (error) {
				console.error(error.message);
			}
		})
	}, [project])

	const toSetVal = (val) => (key) => (def) => val && val[key] ? val[key] : def;

	const toShowApplyButton = (data) => (applyArray) => {
		if (data.status === 'finished') {
			return <a className="btn btn-finished" href="javascript:;" style={{ background: '#ccc' }}>已结束</a>;
		}
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return <a className="btn" href="javascript:;" style={{ background: '#ccc' }}>已投递</a>;
		}
		return <a className="btn" onClick={() => toApplayCommonHandler(router, { project: data }, M_APPLY_PROJECTS)}>立即投递</a>;
	}

	const recommendation = queryProject && queryProject.data ? queryProject.data.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,4) : [];

	if (loading) return <Spin style={{ position: "fixed", top: "50%", left: "50%" }} tip="正在加载中" />;

	return (
		<BaseLayout>
			<div className="project-detail-page">
				<BreadCrumb adrname_two={'项目招商'} adrname_thr={'全部项目'} />
				<div className="project-summary-main clearfix">
					<div className="right-main">
						<h4 className="title">会员名片</h4>
						<img className="service-bg-img" src={toSetVal(project.creator)('avatar')(DEFAULT_AVATAR)} />
						<p className="name">{toSetVal(project)('hideContact')('未知姓名')}</p>
						<p className="text" style={{ textAlign: 'center' }}>{toSetVal(project)('hideCompany')('未知公司')}</p>
						{toShowApplyButton(project)(user ? user.apply_projects : null)}
						<div style={{ width: "150px", margin: "0 auto", display: "block" }}>
							<img id="qrcode" style={{ width: "150px", height: "150px", borderRadius: '6px', display: "block" }} src={config.staticImgUrl + '移动端二维码.png'} alt='placeholder+image' />
							<p style={{ fontSize: "14px", color: "#FFF", textAlign: "center" }}>在移动端查看此页面</p>
						</div>
					</div>
					<div className="left-main">
						<div className="project-summary">
							<div className="left">
								<img
									className="project-top-img"
									src={project.cover}
								/>
							</div>
							<div className="right">
								<h4 className="title">{project.title}</h4>
								<ul className="join">
									<li>
										<p>融资方式</p>
										<h5>{IF_MODE_ENUM[project.category]}</h5>
									</li>
									<li>
										<p>所属行业</p>
										<h5>{toSetVal(project.industry)('title')('未知')}</h5>
									</li>
								</ul>
								<ul className="assets">
									<li>
										<p>可提供资料</p>
										<h5>{project.data && project.data.map(item => item.title).join(',')}</h5>
									</li>
									<li>
										<p>融资金额</p>
										<h5>{project.amount}万元</h5>
									</li>
								</ul>
								{IF_MODE_ENUM[project.category] === '股权融资' &&(
									<Fragment>
										<ul className="assets-list">
											<li>
												<p>资金方占股比例：{toSetVal(project.ratio)('title')('未知')}</p>
											</li>
											<li>
												<p>项目所处阶段：{toSetVal(project.stage)('title')('未知')}</p>
											</li>
										</ul>
										<ul className="assets-list">
											<li>
												<p>投资退出方式：{project.exit_mode && project.exit_mode.map(item => item.title).join(',')}</p>
											</li>
											<li>
												<p>最短退出年限：{toSetVal(project.withdrawal_year)('title')('未知')}</p>
											</li>
										</ul>
									</Fragment>
								)}
								{IF_MODE_ENUM[project.category] === '债权融资' && (
									<Fragment>
										<ul className="assets-list">
											<li>
												<p>资金占用时长：{toSetVal(project.occupancy_time)('title')('未知')}</p>
											</li>
											<li>
												<p>可承担最高利息：{toSetVal(project.interest)('title')('未知')}</p>
											</li>
										</ul>
										<ul className="assets-list">
											<li>
												<p>可提供风控：{toSetVal(project.risk)('title')('未知')}</p>
											</li>
											<li>
												<p>还款来源：{project.payment}</p>
											</li>
										</ul>
									</Fragment>
								)}
								<ul className="assets-list">
									<li>
										<p>所在地区：{project.area_path}</p>
									</li>
									<li>
										<p>浏览量：{project.views}次</p>
									</li>
								</ul>
							</div>
						</div>
						{project.info ? (
							<div className="item-main">
								<div className="item-top">
									<div className="icon">
										<IconFont className="iconfont" type="icon-gaishu" />
										<span>项目介绍</span>
									</div>
								</div>
							<div className="item-content">{project.info}</div>
						</div>	
						): ''}
						
						{project.purposes ? (
							<div className="item-main">
								<div className="item-top">
									<div className="icon">
										<IconFont className="iconfont" type="icon-gaishu" />
										<span>融资用途</span>
									</div>
								</div>
							<div className="item-content">{project.purposes}</div>
						</div>	
						): ''}
						
						{project.team_info ? (
							<div className="item-main">
								<div className="item-top">
									<div className="icon">
										<IconFont className="iconfont" type="icon-gaishu" />
										<span>团队介绍</span>
									</div>
								</div>
							<div className="item-content">{project.team_info}</div>
						</div>	
						): ''}
						
						{project.advantage ? (
							<div className="item-main">
								<div className="item-top">
									<div className="icon">
										<IconFont className="iconfont" type="icon-gaishu" />
										<span>项目优势</span>
									</div>
								</div>
							<div className="item-content">{project.advantage}</div>
						</div>	
						): ''}
						
						{project.progress ? (
							<div className="item-main">
								<div className="item-top">
									<div className="icon">
										<IconFont className="iconfont" type="icon-gaishu" />
										<span>项目进展</span>
									</div>
								</div>
							<div className="item-content">{project.progress}</div>
						</div>	
						): ''}
						
						<p className="recommend-title">项目推荐</p>
						<div className="recommend">
							{recommendation.map((item) => (
								<div className="item" key={item.id}>
									<a href={`/project/detail?id=${item.id}`}>
										<img src={item.cover} />
										<h4>{item.title}</h4>
										<p>{IF_MODE_ENUM[item.category]}&nbsp;{toSetVal(item.industry)('title')('')}</p>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
})
