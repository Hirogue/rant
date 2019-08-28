import _ from 'lodash';
import moment from 'moment';
import IconFont from '../../../components/IconFont';
import GlobalContext from '../../../components/context/GlobalContext';
import './finance_list.scss';

export default (props) => {
	const data = props.data || {};

	const ex_info = data.ex_info || {};

	const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

	const selectedTags = tags.selectedTags || {};

	const mode = tags.selectedCategory;
	const amount = selectedTags['投资金额'] ? selectedTags['投资金额'].value : '';
	const capitalType = selectedTags['资金类型'] ? _.take(selectedTags['资金类型'].tags, 2).join(',') : '';
	const projectStage = selectedTags['投资阶段'] ? _.take(selectedTags['投资阶段'].tags, 2).join(',') : '';
	const risk = selectedTags['风控要求'] ? _.take(selectedTags['风控要求'].tags, 2).join(',') : '';
	const industry = selectedTags['行业类型'] ? _.take(selectedTags['行业类型'].tags, 2).join(',') : '';
	const toArea = selectedTags['投资地区'] ? selectedTags['投资地区'].tags.join(',') : '';
	const fromArea = selectedTags['所在地区'] ? selectedTags['所在地区'].tags.join(',') : '';

	return (
		<GlobalContext.Consumer>
			{(context) => {
				const projectApplys = context.projectApplys || [];
				const visits = context.visits || [];

				return (
					<div className="finance-item">
						<a as={`/finance/detail/${data.id}`} href={`/finance/detail?id=${data.id}`} target="_blank">
							<h4 className="title">{data.title}</h4>
						</a>
						<h5 className="money">
							投资金额：<span>{amount}万元</span>
						</h5>
						<ul className="list">
							<li>投资方式：{mode}</li>
							<li>投资行业：{industry}</li>
							<li>投资地区：{toArea}</li>
							<li>资金类型：{capitalType}</li>
							{mode === '债权投资' ? <li>风控要求：{risk}</li> : <li>投资阶段：{projectStage}</li>}
							<li>所在地区：{fromArea}</li>
						</ul>
						<ul className="icons">
							<li>
								<IconFont className="iconfont" type="icon-shangwuren" />
								<span>
									{data.contacts ? (
										_.padEnd(data.contacts.substr(0, 1), data.contacts.length, '*')
									) : (
											''
										)}
								</span>
							</li>
							{!!data.company ? (
								<li>
									<IconFont className="iconfont" type="icon-gongsi" />
									<span>
										{_.padStart(
											data.company.substr(data.company.length - 2, data.company.length),
											data.company.length,
											'*'
										)}
									</span>
								</li>
							) : (
									''
								)}
								{/*
							<li>
								<IconFont className="iconfont" type="icon-liulan1" />
								<span>
									浏览量：{visits.find((item) => item.url.search(data.id) >= 0) ? (
										visits.find((item) => item.url.search(data.id) >= 0).visits_count
									) : (
											0
										)}次
								</span>
							</li>
									*/}
						</ul>
						<div className="btn-and-time">
							{projectApplys.find((apply) => apply.project_id === data.id) ? (
								<a className="btn" href="javascript:;" style={{ background: '#ccc' }}>
									已投递
								</a>
							) : (
									<a className="btn" onClick={() => context.applyProject(data)}>
										<IconFont className="iconfont" type="icon-iLinkapp-" />立即投递
								</a>
								)}
							<p className="time">{moment(data.release_datetime).format('YYYY-MM-DD')}</p>
						</div>
					</div>
				);
			}}
		</GlobalContext.Consumer>
	);
};
