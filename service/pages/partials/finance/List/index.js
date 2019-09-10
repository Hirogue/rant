import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'next/router';
import IconFont from '../../../components/IconFont';
import './finance_list.scss';

import { IFT_MODE_ENUM } from '../../../lib/enum';
import { toApplayCommonHandler } from '../../../lib/global';
import { M_APPLY_CAPITALS } from '../../../gql';
import './finance_list.scss';

export default withRouter(({ data, router }) => {

	const toSetVal = (val) => (key) => (def) => val ? val[key] : def;

	const toShowApplyButton = (data) => (applyArray) => {
		if (data.status === 'finished') {
			return <a className="btn" href="javascript:;" style={{ background: '#ccc' }}>已结束</a>
		}
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return <a className="btn" href="javascript:;" style={{ background: '#ccc' }}>已投递</a>
		}
		return (
			<a className="btn" onClick={() => toApplayCommonHandler(router, { capital: data }, M_APPLY_CAPITALS)}>
				<IconFont className="iconfont" type="icon-iLinkapp-" />立即投递
			</a>
		)
	}

	let user = {};

	try {
		user = JSON.parse(localStorage.getItem('u_user')) || null;
	} catch (error) {
		user = {};
		console.info('您还未登录！');
	}

	return (
		<div className="finance-item">
			<a as={`/finance/detail/${data.id}`} href={`/finance/detail?id=${data.id}`} target="_blank">
				<h4 className="title">{data.title}</h4>
			</a>
			<h5 className="money">
				投资金额：<span>{data.amount}万元</span>
			</h5>
			<ul className="list">
				<li>投资方式：{IFT_MODE_ENUM[data.category]}</li>
				<li>投资行业：{toSetVal(data.industry)('title')('未知')}</li>
				<li>投资地区：{data.invest_area && data.invest_area.map(area => area.title).join(',')}</li>
				<li>资金类型：{data.type && data.type.map(item => item.title).join(',')}</li>
				{IFT_MODE_ENUM[data.category] === '债权投资' ? <li>风控要求：{toSetVal(data.risk)('title')('未知')}</li> : <li>投资阶段：{toSetVal(data.stage)('title')('未知')}</li>}
				<li>所在地区：{data.area_path}</li>
			</ul>
			<ul className="icons">
				<li>
					<IconFont className="iconfont" type="icon-shangwuren" />
					<span>{toSetVal(data)('hideName')('未知')}</span>
				</li>
				<li>
					<IconFont className="iconfont" type="icon-gongsi" />
					<span>{toSetVal(data)('hideCompany')('未知')}</span>
				</li>
				<li>
					<IconFont className="iconfont" type="icon-liulan1" />
					<span>浏览量：{data.view || 0}次</span>
				</li>
			</ul>
			<div className="btn-and-time">
				{toShowApplyButton(data)(user && user.apply_capitals)}
				<p className="time">{moment(data.release_datetime).format('YYYY-MM-DD')}</p>
			</div>
		</div>
	)
})

// export default (props) => {
// 	const data = props.data || {};

// 	const ex_info = data.ex_info || {};

// 	const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

// 	const selectedTags = tags.selectedTags || {};

// 	const mode = tags.selectedCategory;
// 	const amount = selectedTags['投资金额'] ? selectedTags['投资金额'].value : '';
// 	const capitalType = selectedTags['资金类型'] ? _.take(selectedTags['资金类型'].tags, 2).join(',') : '';
// 	const projectStage = selectedTags['投资阶段'] ? _.take(selectedTags['投资阶段'].tags, 2).join(',') : '';
// 	const risk = selectedTags['风控要求'] ? _.take(selectedTags['风控要求'].tags, 2).join(',') : '';
// 	const industry = selectedTags['行业类型'] ? _.take(selectedTags['行业类型'].tags, 2).join(',') : '';
// 	const toArea = selectedTags['投资地区'] ? selectedTags['投资地区'].tags.join(',') : '';
// 	const fromArea = selectedTags['所在地区'] ? selectedTags['所在地区'].tags.join(',') : '';

// 	return (
// 		<GlobalContext.Consumer>
// 			{(context) => {
// 				const projectApplys = context.projectApplys || [];
// 				const visits = context.visits || [];

// 				return (
					
// 				);
// 			}}
// 		</GlobalContext.Consumer>
// 	);
// };
