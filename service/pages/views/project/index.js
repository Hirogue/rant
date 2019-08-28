import React, { Component } from 'react';
import _ from 'lodash';
import { Input } from 'antd';
import { withRouter } from 'next/router';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import PageMod from '../../components/PageMod';
import TagTop from '../../components/TagTop';
import ScreenMod from '../../components/ScreenMod';

import List from '../../partials/project/List';

import '../../partials/project/selected_items.scss';
import GlobalContext from '../../components/context/GlobalContext';
const Search = Input.Search;

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
export default class extends Component {
	state = {
		data: [],
		list: [],
		current: 1,
		pageSize: 10,
		search: '',
		selectedTags: {
			所属行业: [],
			融资方式: [],
			融资金额: [],
			所在地区: [],
			资金类型: [],
			项目阶段: [],
			占股比例: [],
			退出方式: [],
			最高利息: [],
			占用时长: [],
			风控要求: []
		}
	};

	async componentDidMount() {
		const { list, category, industry } = this.props.router.query;
		// const { selectedTags } = this.state;

		// selectedTags['融资方式'] = [ category ];

		// if (!!category) {
		// 	this.setState((state) => ({
		// 		...state,
		// 		selectedTags
		// 	}));
		// }

		this.setState((state) => ({
			...state,
			data: list,
			selectedTags: {
				所属行业: !!industry ? [ industry ] : [],
				融资方式: !!category ? [ category ] : [],
				融资金额: [],
				所在地区: [],
				资金类型: [],
				项目阶段: [],
				占股比例: [],
				退出方式: [],
				最高利息: [],
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

		if (newTags.length > 0 && item.name === '融资方式') {
			newTags = [ newTags.pop() ];
		}

		selectedTags[item.name] = newTags;

		this.setState((state) => ({
			...state,
			selectedTags
		}));
	};

	render() {
		const { data, list, pageSize, selectedTags, search } = this.state;

		const newList = _.filter(list, (item) => {
			const ex_info = item.ex_info || {};
			const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};
			const itemTags = tags.selectedTags || {};

			if (!!search) {
				if (!!item.title && item.title.search(search) < 0) return false;
			}

			if (!!itemTags['所属行业'] && selectedTags['所属行业'].length > 0) {
				if (itemTags['所属行业'].tags.filter((val) => selectedTags['所属行业'].indexOf(val) !== -1).length <= 0)
					return false;
			}

			if (selectedTags['融资方式'].length > 0) {
				if (selectedTags['融资方式'].indexOf(tags.selectedCategory) < 0) return false;
			}

			if (!!itemTags['融资金额'] && selectedTags['融资金额'].length > 0) {
				const amount = itemTags['融资金额'].value || 0;

				if (
					selectedTags['融资金额'].filter((val) => {
						const obj = amountObj[val];

						if (amount >= obj.min && amount <= obj.max) return val;
					}).length <= 0
				)
					return false;
			}

			if (!!itemTags['所在地区'] && selectedTags['所在地区'].length > 0) {
				if (itemTags['所在地区'].tags.filter((val) => selectedTags['所在地区'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			// if (!!itemTags['资金类型'] && selectedTags['资金类型'].length > 0) {
			// 	if (itemTags['资金类型'].tags.filter((val) => selectedTags['资金类型'].indexOf(val) !== -1).length <= 0)
			// 		return false;
			// }
			if (!!itemTags['所处阶段'] && selectedTags['项目阶段'].length > 0) {
				if (itemTags['所处阶段'].tags.filter((val) => selectedTags['项目阶段'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['占股比例'] && selectedTags['占股比例'].length > 0) {
				if (itemTags['占股比例'].tags.filter((val) => selectedTags['占股比例'].indexOf(val) !== -1).length <= 0)
					return false;
			}
			if (!!itemTags['承担利息'] && selectedTags['最高利息'].length > 0) {
				if (itemTags['承担利息'].tags.filter((val) => selectedTags['最高利息'].indexOf(val) !== -1).length <= 0)
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

		// 项目
		// 默认筛选项有所属行业、融资方式（股权类、债权类）、所在地区、资金类型、融资金额
		// 选择不同融资方式后新增的筛选项分别有：
		// 股权融资：项目阶段、占股比例、退出方式（首次公开发行/买壳或借壳上市/管理层回购/二次出售/破产清算）；
		// 债权融资：最高利息（百分比)、资金占用时长（年）、提供风控(抵押/担保/信用/其他）、还款来源；

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const { mainData: { projectTags } } = context;

						if (!projectTags) return '';

						let tagItems = [
							{
								name: '所属行业',
								tagsFromServer: _.find(projectTags, (item) => item.name === '所属行业').ex_info.tags,
								selectedTags: this.state.selectedTags['所属行业']
							},
							{
								name: '融资方式',
								tagsFromServer: _.map(
									_.filter(projectTags, (item) => item.mode === '分类'),
									(item) => item.name
								),
								selectedTags: this.state.selectedTags['融资方式']
							}
						];

						if (selectedTags['融资方式'].length > 0) {
							const mode = selectedTags['融资方式'][0];

							if (mode === '股权融资') {
								tagItems = tagItems.concat([
									{
										name: '项目阶段',
										tagsFromServer: _.find(projectTags, (item) => item.name === '所处阶段').ex_info
											.tags,
										selectedTags: this.state.selectedTags['项目阶段']
									},
									{
										name: '占股比例',
										tagsFromServer: _.find(projectTags, (item) => item.name === '占股比例').ex_info
											.tags,
										selectedTags: this.state.selectedTags['占股比例']
									}
								]);
							}

							if (mode === '债权融资') {
								tagItems = tagItems.concat([
									{
										name: '最高利息',
										tagsFromServer: _.find(projectTags, (item) => item.name === '承担利息').ex_info
											.tags,
										selectedTags: this.state.selectedTags['最高利息']
									},
									{
										name: '占用时长',
										tagsFromServer: _.find(projectTags, (item) => item.name === '资金占用时长').ex_info
											.tags,
										selectedTags: this.state.selectedTags['占用时长']
									},
									{
										name: '风控要求',
										tagsFromServer: _.find(projectTags, (item) => item.name === '风控要求').ex_info
											.tags,
										selectedTags: this.state.selectedTags['风控要求']
									}
								]);
							}
						}

						tagItems = tagItems.concat([
							{
								name: '所在地区',
								tagsFromServer: _.find(projectTags, (item) => item.name === '所在地区').ex_info.tags,
								selectedTags: this.state.selectedTags['所在地区']
							},
							// {
							// 	name: '资金类型',
							// 	tagsFromServer: _.find(projectTags, (item) => item.name === '资金类型').ex_info.tags,
							// 	selectedTags: this.state.selectedTags['资金类型']
							// },
							{
								name: '融资金额',
								tagsFromServer: Object.keys(amountObj),
								selectedTags: this.state.selectedTags['融资金额']
							}
						]);

						return (
							<React.Fragment>
								<div className="selected-items-page">
									<BreadCrumb adrname_two={'项目招商'} adrname_thr={'所有项目'} />
									<ScreenMod
										tagItems={tagItems}
										onChange={this.onChange}
										tag_name={'所有项目'}
										icon_type={'icon-tuandui'}
									/>
									{/* <div className="search">
										<Search
											placeholder="在当前条件下搜索"
											onSearch={(value) =>
												this.setState((state) => ({
													...state,
													search: value
												}))}
											enterButton
										/>
									</div> */}
									<div className="project-list">
										<TagTop name={'项目招商'} />
										{newList.map((item) => <List data={item} key={item.id} />)}
										<PageMod total={data.length} pageSize={pageSize} onChnage={this.onPageChange} />
									</div>
								</div>
							</React.Fragment>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
