import React from 'react';
import _ from 'lodash';
import { withRouter } from 'next/router';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import PageMod from '../../components/PageMod';
import TagTop from '../../components/TagTop';
import ScreenMod from '../../components/ScreenMod';
import List from '../../partials/finance/List';

import '../../partials/finance/finance.scss';
import GlobalContext from '../../components/context/GlobalContext';

const amountObj = {
	'10万-100万': { min: 10, max: 100 },
	'100万-500万': { min: 100, max: 500 },
	'500万-1000万': { min: 500, max: 1000 },
	'1000万-5000万': { min: 1000, max: 5000 },
	'5000万-1亿': { min: 5000, max: 10000 },
	'1亿-5亿': { min: 10000, max: 50000 },
	'5亿以上': { min: 50000, max: 9999 * 1000000000 }
};








@withRouter
export default class extends React.Component {
	state = {
		products: [],
		data: [],
		list: [],
		current: 1,
		pageSize: 10,
		search: '',
		selectedTags: {
			投资行业: [],
			投资方式: [],
			投资金额: [],
			投资地区: [],
			资金类型: [],
			投资类型: [],
			投资阶段: [],
			退出方式: [],
			回报要求: [],
			占用时长: [],
			风控要求: []
		}
	};

	async componentDidMount() {
		const { list, category, industry, products } = this.props.router.query;

		this.setState((state) => ({
			...state,
			data: list,
			products,
			selectedTags: {
				投资行业: !!industry ? [ industry ] : [],
				投资方式: !!category ? [ category ] : [],
				投资金额: [],
				投资地区: [],
				资金类型: [],
				投资类型: [],
				投资阶段: [],
				退出方式: [],
				回报要求: [],
				占用时长: [],
				风控要求: []
			},
			list: [].concat(list).splice((state.current - 1) * state.pageSize, state.pageSize)
		}));
	}

	onPageChange = (page, pageSize) => {
		this.setState((state) => ({
			...state,
			current: page,
			list: [].concat(state.data).splice((page - 1) * pageSize, pageSize)
		}));
	};

	onChange = (newTags, item) => {
		const { selectedTags } = this.state;

		if (newTags.length > 0 && item.name === '投资方式') {
			newTags = [ newTags.pop() ];
		}

		selectedTags[item.name] = newTags;

		this.setState((state) => ({
			...state,
			selectedTags
		}));
	};

	getInfo = (item) => {
		const introduce = !!item.ex_info ? (item.ex_info.richtext ? item.ex_info.richtext.html : '') : '';
		const plainText = !!introduce ? introduce.replace(new RegExp('<.+?>', 'g'), '') : '';
		const subtitle = plainText.length >= 45 ? plainText.substr(0, 45) + '...' : plainText;

		return subtitle;
	};

	render() {
		const { products, data, list, pageSize, selectedTags } = this.state;

		const newList = _.filter(list, (item) => {
			const ex_info = item.ex_info || {};
			const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};
			const itemTags = tags.selectedTags || {};

			if (!!itemTags['行业类型'] && selectedTags['投资行业'].length > 0) {
				if (itemTags['行业类型'].tags.filter((val) => selectedTags['投资行业'].indexOf(val) !== -1).length <= 0)
					return false;
			}

			if (selectedTags['投资方式'].length > 0) {
				if (selectedTags['投资方式'].indexOf(tags.selectedCategory) < 0) return false;
			}

			if (!!itemTags['投资金额'] && selectedTags['投资金额'].length > 0) {
				const amount = itemTags['投资金额'].value || 0;

				if (
					selectedTags['投资金额'].filter((val) => {
						const obj = amountObj[val];

						if (amount >= obj.min && amount <= obj.max) return val;
					}).length <= 0
				)
					return false;
			}

			if (!!itemTags['投资地区'] && selectedTags['投资地区'].length > 0) {
				if (itemTags['投资地区'].tags.filter((val) => selectedTags['投资地区'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['资金类型'] && selectedTags['资金类型'].length > 0) {
				if (itemTags['资金类型'].tags.filter((val) => selectedTags['资金类型'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['投资类型'] && selectedTags['投资类型'].length > 0) {
				if (itemTags['投资类型'].tags.filter((val) => selectedTags['投资类型'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['投资阶段'] && selectedTags['投资阶段'].length > 0) {
				if (itemTags['投资阶段'].tags.filter((val) => selectedTags['投资阶段'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['最低回报要求'] && selectedTags['回报要求'].length > 0) {
				if (itemTags['最低回报要求'].tags.filter((val) => selectedTags['回报要求'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['资金占用时长'] && selectedTags['占用时长'].length > 0) {
				if (itemTags['资金占用时长'].tags.filter((val) => selectedTags['占用时长'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['风控要求'] && selectedTags['风控要求'].length > 0) {
				if (itemTags['风控要求'].tags.filter((val) => selectedTags['风控要求'].indexOf(val) !== -1).length <= 0)
					return false;
			}

			return item;
		});

		// 资金
		// 默认筛选项有投资方式、资金主体、投资行业、投资地区、投资金额
		// 选择不同的投资方式后新增的筛选项分别有：
		// 股权投资：投资类型（控股/参股）、投资阶段
		// 债券投资：最低回报要求、风控要求

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const { mainData: { fundingTags, projectTags } } = context;

						if (!projectTags) return '';

						let tagItems = [
							{
								name: '投资行业',
								tagsFromServer: _.find(fundingTags, (item) => item.name === '行业类型').ex_info.tags,
								selectedTags: this.state.selectedTags['投资行业']
							},
							{
								name: '投资方式',
								tagsFromServer: _.map(
									_.filter(fundingTags, (item) => item.mode === '分类'),
									(item) => item.name
								),
								selectedTags: this.state.selectedTags['投资方式']
							}
						];

						if (selectedTags['投资方式'].length > 0) {
							const mode = selectedTags['投资方式'][0];

							if (mode === '股权投资') {
								tagItems = tagItems.concat([
									{
										name: '投资类型',
										tagsFromServer: _.find(fundingTags, (item) => item.name === '投资类型').ex_info
											.tags,
										selectedTags: this.state.selectedTags['投资类型']
									},
									{
										name: '投资阶段',
										tagsFromServer: _.find(fundingTags, (item) => item.name === '投资阶段').ex_info
											.tags,
										selectedTags: this.state.selectedTags['投资阶段']
									}
								]);
							}

							if (mode === '债权投资') {
								tagItems = tagItems.concat([
									// {
									// 	name: '回报要求',
									// 	tagsFromServer: _.find(fundingTags, (item) => item.name === '最低回报要求').ex_info
									// 		.tags,
									// 	selectedTags: this.state.selectedTags['回报要求']
									// },
									{
										name: '风控要求',
										tagsFromServer: _.find(fundingTags, (item) => item.name === '风控要求').ex_info
											.tags,
										selectedTags: this.state.selectedTags['风控要求']
									}
								]);
							}
						}

						tagItems = tagItems.concat([
							{
								name: '资金类型',
								tagsFromServer: _.find(fundingTags, (item) => item.name === '资金类型').ex_info.tags,
								selectedTags: this.state.selectedTags['资金类型']
							},
							{
								name: '投资地区',
								tagsFromServer: _.find(fundingTags, (item) => item.name === '投资地区').ex_info.tags,
								selectedTags: this.state.selectedTags['投资地区']
							},
							{
								name: '投资金额',
								tagsFromServer: Object.keys(amountObj),
								selectedTags: this.state.selectedTags['投资金额']
							}
						]);

						return (
							<React.Fragment>
								<div className="finance-page">
									<BreadCrumb adrname_two={'金融资本'} adrname_thr={'所有资金'} />
									<ScreenMod
										tagItems={tagItems}
										onChange={this.onChange}
										tag_name={'所有资金'}
										icon_type={'icon-jinrong1'}
									/>
									<div className="finance-list clearfix">
										<div className="left">
											<TagTop name={'金融资本'} />
											{newList.map((item) => <List data={item} key={item.id} />)}
										</div>

										<div className="right">
											<div className="tab-title">
												<p>江旅金融</p>
											</div>
											{products.map((item) => (
												<a
													as={`/product/detail/${item.id}`}
													href={`/product/detail?id=${item.id}`}
													key={item.id}
												>
													<div className="product-items">
														<div className="product-item" style={{ marginBottom: 0 }}>
															<img src={!!item.thumbnail ? item.thumbnail.url : ''} />

															<h4>{item.name}</h4>
														</div>
														<p style={{ textIndent: 20 }}>{this.getInfo(item)}</p>
													</div>
												</a>
											))}
										</div>
									</div>
									<PageMod total={data.length} pageSize={pageSize} onChnage={this.onPageChange} />
								</div>
							</React.Fragment>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
