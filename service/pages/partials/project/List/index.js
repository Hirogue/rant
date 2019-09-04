import { Fragment } from 'react';
import _ from 'lodash';
import { withRouter } from 'next/router';
import moment from 'moment';
import { message } from 'antd';
import IconFont from '../../../components/IconFont';

import { IF_MODE_ENUM } from '../../../lib/enum';
import './list.scss';
import GlobalContext from '../../../components/context/GlobalContext';


export default withRouter(({ data, router }) => {

	const toSetVal = (val) => (key) => (def) => val ? val[key] : def;

	const toShowApplyButton = (data) => (applyArray) => {
		if (data.status === 'finished') {
			return (
				<Fragment>
					<a className="btn-finished" href="javascript:;" style={{ background: '#ccc' }}>
						<span>已结束</span>
					</a>
					<img className="finished-status" src="/static/img/successful_financing.png" alt='finished' />
				</Fragment>
			)
		}
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return (
				<a className="btn" href="javascript:;" style={{ background: '#ccc' }}>
					<span>已投递</span>
				</a>
			)
		}
		return (
			<a className="btn-a" onClick={() => router.push('/login')}>
				<span>立即投递</span>
				<IconFont className="iconfont" type="icon-jiantou-right" />
			</a>
		)
	}

	let user = {};

	try {
		user = JSON.parse(localStorage.getItem('u_user'));
	} catch (error) {
		console.info('您还未登录！');
	}

	return (
		<div className="list-container">
			<a className="link-img" href={`/project/detail?id=${data.id}`} target="_blank">
				<img src={data.cover} />
			</a>

			<div className="join-mod">
				<a as={`/project/detail/${data.id}`} href={`/project/detail?id=${data.id}`} target="_blank">
					<h4 className="join-title">{data.title}</h4>
				</a>
				<ul className="join-lis">
					<li>
						<p>融资方式</p>
						<h5>{IF_MODE_ENUM[data.category]}</h5>
					</li>
					<li>
						<p>融资金额</p>
						<h5 style={{ color: '#dd3228' }}>{toSetVal(data)('amount')('')}万元</h5>
					</li>
					<li>
						<p>所属行业</p>
						<h5>{toSetVal(data.industry)('title')('')}</h5>
					</li>
					<li>
						<p>所属地区</p>
						<h5>{toSetVal(data)('area_path')('').split(/[.\s]/ig).slice(0,1).join('')}</h5>
					</li>
				</ul>
				<div className="join-time">
					<p>{toSetVal(data)('hideCompany')('')}</p>
					{/*
								<p style={{ marginLeft: 20, display: 'inline-block' }}>
									<span>
										浏览量：{visits.find((item) => item.url.search(data.id) >= 0) ? (
											visits.find((item) => item.url.search(data.id) >= 0).visits_count
										) : (
											0
										)}次
									</span>
								</p>
								*/}
					<p>
						<IconFont className="iconfont" type="icon-riliriqicopy" />
						<span>{moment(data.publish_at).format('YYYY-MM-DD')}</span>
					</p>
				</div>
			</div>
			<div className="introduce">
				<p>{toSetVal(data)('summary')('')}</p>
				<div className="btns">
					<a className="btn-a" href={`/project/detail?id=${data.id}`} target="_blank">
						<span>详情</span>
						<IconFont className="iconfont" type="icon-jiantou-right" />
					</a>

					{toShowApplyButton(data)(user.apply_projects)}
				</div>
			</div>
		</div>
	)
})

