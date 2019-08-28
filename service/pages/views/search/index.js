import { Input, Select, AutoComplete, Button } from 'antd';
import { withRouter } from 'next/router';
import moment from 'moment';
import BaseLayout from '../../components/Layout/BaseLayout';
import PageMod from '../../components/PageMod';
import TagTop from '../../components/TagTop';
import BreadCrumb from '../../components/BreadCrumb';
import IconFont from '../../components/IconFont';

import './search_result.scss';

const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

@withRouter
export default class SearchPage extends React.Component {
	render() {
		const { searchCategory, list } = this.props.router.query;

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

						{!!list && list.length > 0 ? searchCategory === 'product' ? (
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
											{item.category} - {item.title}
											<a className="more" href={`/product/detail?id=${item.id}`}>
												[详情]
											</a>
										</p>
										<ul>
											<li>
												<IconFont className="iconfont" type="icon-shijian1" />
												{moment(item.updated_when).format('YYYY-MM-DD')}
											</li>
											<li>
												<span>累计支持{item.sup_count || 0}个项目</span>
											</li>
											<li>
												<span>成功贷出{item.sup_amount || 0}万元</span>
											</li>
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
												{item.subtitle}
												<a className="more" href={`/${searchCategory}/detail?id=${item.id}`}>
													[详情]
											</a>
											</p>
											<ul>
												<li>
													<IconFont className="iconfont" type="icon-shijian1" />
													{moment(item.release_datetime).format('YYYY-MM-DD')}
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
														{!!item.capital_type ? item.capital_type.split(':')[1] : ''}{' '}
													</span>
												</li>
												<li>
													<span>
														{!!item.capital_amount ? item.capital_amount.split(':')[1] : ''}
													</span>
												</li>
											</ul>
										</div>
									</a>
								))
							) : (
								<div className="item">
									<a className="title" href="javascript:;">
										暂无结果
								</a>
								</div>
							)}
						{/* <PageMod /> */}
					</div>
				</div>
			</BaseLayout>
		);
	}
}
