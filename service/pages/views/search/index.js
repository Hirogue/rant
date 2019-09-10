import { Input, Select, AutoComplete, Button, Spin, Empty } from 'antd';
import { withRouter } from 'next/router';
import { CondOperator } from '@nestjsx/crud-request';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import BaseLayout from '../../components/Layout/BaseLayout';
import PageMod from '../../components/PageMod';
import TagTop from '../../components/TagTop';
import BreadCrumb from '../../components/BreadCrumb';
import IconFont from '../../components/IconFont';

import { createApolloClient } from "../../lib/apollo";
import { buildingQuery, getUrlParam } from "../../lib/global";
import { Q_SEARCH_PROJECT, Q_SEARCH_CAPITAL, Q_SEARCH_PRODUCT } from '../../gql'
import { METADATA_TITLE_CN, IF_MODE_ENUM_R } from '../../lib/enum';

import './search_result.scss';

const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

const client = createApolloClient();

export default withRouter((props) => {

	let { router } = props;

	let searchCategory = getUrlParam(router, 'searchCategory');
	let keyword = getUrlParam(router, 'keyword');

	const categoryMap = {
		product: {
			gql: Q_SEARCH_PRODUCT,
			variables: {
				page: 0,
				limit: 1000,
				join: [{ field: "category" }],
				sort: [{ field: 'create_at', order: 'DESC' }],
			},
			filter: `&filter[]=["name||cont||${keyword}","introduction||cont||${keyword}"]&filter=is_published||eq||true`
		},
		project: {
			gql: Q_SEARCH_PROJECT,
			variables: {
				page: 0,
				limit: 1000,
				join: [{ field: "industry" }],
				sort: [{ field: 'publish_at', order: 'DESC' }],
			},
			filter: `&filter[]=["title||cont||${keyword}","info||cont||${keyword}"]&filter[]=status||in||waitting,following,checked,finished`
		},
		finance: {
			gql: Q_SEARCH_CAPITAL,
			variables: {
				page: 0,
				limit: 1000,
				join: [{ field: 'creator' }, { field: 'industry' }, { field: 'area' }, { field: 'stage' }, { field: 'type' }],
				sort: [{ field: 'publish_at', order: 'DESC' }],
			},
			filter: `&filter[]=["title||cont||${keyword}","info||cont||${keyword}"]&filter=status||in||waitting,following,checked,finished`
		}
	}

	let target = categoryMap[searchCategory];

	const { loading, data } = useQuery(target.gql, {
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
		client: client,
		variables: {
			queryString: buildingQuery(target.variables) + target.filter
		}
	});

	let list = [];
	if (data && data.result) {
		list = data.result.data
	}

	return (
		<BaseLayout>
			<div className="search-result">
				<BreadCrumb adrname_two={'搜索结果'} />
				<div className="content-main">
					<TagTop icon={'icon-sousuo'} name={'搜索结果'} />
					{/* <div className="search-mod">
							<InputGroup compact>
								<Select
									defaultValue={defaultCategory}
									onChange={(category) =>
										this.setState((state) => ({
											...state,
											category
										}))}
								>
									<Option value="项目">项目</Option>
									<Option value="资金">资金</Option>
									<Option value="金融服务">金融服务</Option>
								</Select>
								<AutoComplete
									dataSource={this.state.dataSource}
									style={{ width: 200 }}
									onChange={this.handleChange}
									placeholder="搜索内容"
								/>
								<Button type="primary" shape="circle" icon="search" />
							</InputGroup>
						</div> */}
					{loading ? (
						<div className="item">
							<Spin style={{ margin: "10vw 45%" }} tip="正在加载中" />
						</div>
					) : (
						!!list && list.length > 0 ? searchCategory === 'product' ? (
							list.map((item) => (
								<a
									as={`/product/detail/${item.id}`}
									href={`/product/detail?id=${item.id}`}
									key={item.id}
								>
									<div className="item">
										<a className="title" href={`/product/detail?id=${item.id}`}>
											{item.name}
										</a>
										<p className="text">
											{item.category && item.category.title} - {item.slogan}
											<a className="more" href={`/product/detail?id=${item.id}`}>
												[详情]
											</a>
										</p>
										<ul>
											<li>
												<IconFont className="iconfont" type="icon-shijian1" />
												{moment(item.update_at).format('YYYY-MM-DD')}
											</li>
											{/* <li>
												<span>累计支持{item.sup_count || 0}个项目</span>
											</li>
											<li>
												<span>成功贷出{item.sup_amount || 0}万元</span>
											</li> */}
											{/* <li>
												<IconFont className="iconfont" type="icon-shukan" />阅读(2876){' '}
											</li>
											<li>
												<IconFont className="iconfont" type="icon-toudixiang" />发送到我的邮箱
											</li>
											<li>
												<IconFont className="iconfont" type="icon-tuceng" />
												<span>金客科技</span>
												<span>Pre A轮</span>
											</li> */}
										</ul>
									</div>
								</a>
							))
						) : (
							list.map((item) => (
								<a
									as={`/${searchCategory}/detail/${item.id}`}
									href={`/${searchCategory}/detail?id=${item.id}`}
									key={item.id}
								>
									<div className="item">
										<a className="title" href={`/${searchCategory}/detail?id=${item.id}`}>
											{item.title}
										</a>
										<p className="text">
											{item.summary}
											<a className="more" href={`/${searchCategory}/detail?id=${item.id}`}>
												[详情]
											</a>
										</p>
										<ul>
											<li>
												<IconFont className="iconfont" type="icon-shijian1" />
												{moment(item.publish_at).format('YYYY-MM-DD')}
											</li>
											{/* <li>
											<IconFont className="iconfont" type="icon-shukan" />阅读(2876){' '}
										</li>
										<li>
											<IconFont className="iconfont" type="icon-toudixiang" />发送到我的邮箱
										</li> */}
											<li>
												{/* <IconFont className="iconfont" type="icon-tuceng" /> */}
												<span>
													{item.category}
												</span>
											</li>
											<li>
												<span>
													{item.amount}万元
												</span>
											</li>
										</ul>
									</div>
								</a>
							))
						) : (
							<div className="item">
								<Empty style={{ margin: "10vw auto" }} description="暂无结果" />
							</div>
						)
					)}
					{/* <PageMod /> */}
				</div>
			</div>
		</BaseLayout>
	)
})

