import _ from 'lodash';
import moment from 'moment';
import IconFont from '../../../components/IconFont';

import './list.scss';
import GlobalContext from '../../../components/context/GlobalContext';

export default (props) => {
	const data = props.data || {};

	const ex_info = data.ex_info || {};

	const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};

	const selectedTags = tags.selectedTags || {};

	const mode = tags.selectedCategory;
	const amount = selectedTags['融资金额'] ? selectedTags['融资金额'].value : '';
	const industry = selectedTags['所属行业'] ? _.take(selectedTags['所属行业'].tags, 2).join(',') : '';
	const area = selectedTags['所在地区'] ? selectedTags['所在地区'].tags.join(',') : '';

	return (
		<GlobalContext.Consumer>
			{(context) => {
				const projectApplys = context.projectApplys || [];
				const visits = context.visits || [];

				return (
					<div className="list-container">
						<a className="link-img" href={`/project/detail?id=${data.id}`} target="_blank">
							<img src={!!data.thumbnail ? data.thumbnail.url : ''} />
						</a>

						<div className="join-mod">
							<a as={`/project/detail/${data.id}`} href={`/project/detail?id=${data.id}`} target="_blank">
								<h4 className="join-title">{data.title}</h4>
							</a>
							<ul className="join-lis">
								<li>
									<p>融资方式</p>
									<h5>{mode}</h5>
								</li>
								<li>
									<p>融资金额</p>
									<h5 style={{ color: '#dd3228' }}>{amount}万元</h5>
								</li>
								<li>
									<p>所属行业</p>
									<h5>{industry}</h5>
								</li>
								<li>
									<p>所属地区</p>
									<h5>{area}</h5>
								</li>
							</ul>
							<div className="join-time">
								<p>
									{!!data.company ? (
										_.padStart(
											data.company.substr(data.company.length - 2, data.company.length),
											data.company.length,
											'*'
										)
									) : (
										''
									)}
								</p>
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
									<span>{moment(data.release_datetime).format('YYYY-MM-DD')}</span>
								</p>
							</div>
						</div>
						<div className="introduce">
							<p>{data.subtitle}</p>
							<div className="btns">
								<a className="btn-a" href={`/project/detail?id=${data.id}`} target="_blank">
									<span>详情</span>
									<IconFont className="iconfont" type="icon-jiantou-right" />
								</a>

								{projectApplys.find((apply) => apply.project_id === data.id) ? (
									<a className="btn" href="javascript:;" style={{ background: '#ccc' }}>
										<span>已投递</span>
										<IconFont className="iconfont" type="icon-jiantou-right" />
									</a>
								) : (
									<a className="btn-a" onClick={() => context.applyProject(data)}>
										<span>立即投递</span>
										<IconFont className="iconfont" type="icon-jiantou-right" />
									</a>
								)}
							</div>
						</div>
					</div>
				);
			}}
		</GlobalContext.Consumer>
	);
};
