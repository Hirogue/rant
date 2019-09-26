import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Spin, Empty } from 'antd';
import { withRouter } from 'next/router';
import { CondOperator } from '@nestjsx/crud-request';
import { useQuery } from '@apollo/react-hooks';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import PageMod from '../../components/PageMod';
import TagTop from '../../components/TagTop';
import ScreenMod from '../../components/ScreenMod';
import List from '../../partials/finance/List';

import '../../partials/finance/finance.scss';
import { createApolloClient } from "../../lib/apollo";
import { buildingQuery, getUrlParam } from "../../lib/global";
import { Q_GET_CAPITAL_DATA } from '../../gql'
import { METADATA_TITLE_CN, IF_MODE_ENUM_R, IFT_MODE_ENUM_R } from '../../lib/enum';

const client = createApolloClient();
const defaultVariables = {
	page: 0,
	limit: 10,
	join: [{ field: 'creator' }, { field: 'industry' }, { field: 'area' }, { field: 'stage' }, { field: 'type' }],
	filter: [{ field: "status", operator: CondOperator.IN, value: "waiting,following,checked,finished" }],
	sort: [{ field: 'create_at', order: 'DESC' }],
};

export default withRouter((props) => {

	let { router } = props;

	let industry = getUrlParam(router, 'industry');
	let category = getUrlParam(router, 'category');

	const [state, setState] = useState({
		current: 1,
		selectedTags: {
			行业: !!industry ? [industry] : [],
			投资方式: !!category ? [category] : [],
			金额: [],
			投资地区: [],
			资金类型: [],
			投资类型: [],
			阶段: [],
			退出方式: [],
			回报要求: [],
			时长: [],
			风控: []
		},
	})

	const { current, selectedTags } = state;

	const { loading, fetchMore, refetch, data: { findRootsAndChildren, queryCapital, queryProduct } } = useQuery(Q_GET_CAPITAL_DATA, {
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
		client: client,
		variables: {
			queryCapital: buildingQuery(defaultVariables),
			queryProduct: buildingQuery({
				page: 0,
				limit: 5,
				sort: [{ field: 'create_at', order: 'DESC' }],
			})
		}
	});

	useEffect(() => {
		!!industry && defaultVariables.filter.push({ field: "industry.title", operator: CondOperator.EQUALS, value: industry });
		!!category && defaultVariables.filter.push({ field: "category", operator: CondOperator.EQUALS, value: IF_MODE_ENUM_R[category] });
		refetch({
			queryCapital: buildingQuery(defaultVariables),
			queryProduct: buildingQuery({
				page: 0,
				limit: 5,
				sort: [{ field: 'create_at', order: 'DESC' }],
			})
		})
		if (industry) document.title = industry + "-旅游项目通";
	}, [])

	const onPageChange = (page, pageSize) => {
		let variables = Object.assign(defaultVariables, {
			page: page,
			limit: pageSize,
		});
		fetchMore({
			variables: {
				queryCapital: buildingQuery(variables),
				queryProduct: buildingQuery({
					page: 0,
					limit: 5,
					sort: [{ field: 'create_at', order: 'DESC' }],
				})
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				return fetchMoreResult
			}
		});
		setState((state) => ({
			...state,
			current: page
		}));
	};

	const onChange = (newTags, item) => {
		if (newTags.length > 0 && item.name === '投资方式') {
			newTags = [newTags.pop()];
		}
		console.log(newTags);
		
		if (item.title === '金额' && newTags.length === 2) newTags.shift();
		if (item.title === '投资地区' && newTags.length === 2) newTags.shift();
		selectedTags[item.title] = newTags;
		setState((state) => ({
			...state,
			selectedTags
		}));

		let variablesFilter = [{ field: "status", operator: CondOperator.IN, value: "checked,finished,waiting,following" }];
		for (let key in selectedTags) {
			if (selectedTags.hasOwnProperty(key)) {
				if (key === '金额' && selectedTags[key][0]) {
					let [rangeA, rangeB] = selectedTags[key][0].replace('以上', '-').split('-').map(item => item.replace('万', '').replace('亿', '0000'));
					rangeA && variablesFilter.push({ field: "amount", operator: CondOperator.GREATER_THAN_EQUALS, value: rangeA });
					rangeB && variablesFilter.push({ field: "amount", operator: CondOperator.LOWER_THAN_EQAULS, value: rangeB });
				} else if (key === '投资地区' && selectedTags[key][0]) {
					variablesFilter.push({ field: 'invest_area.title', operator: CondOperator.CONTAINS, value: selectedTags[key][0] })
				} else if (key === '投资方式' && selectedTags[key].length) {
					variablesFilter.push({ field: 'category', operator: CondOperator.EQUALS, value: IFT_MODE_ENUM_R[selectedTags[key][0]] })
				} else {
					selectedTags[key].length && variablesFilter.push({ field: METADATA_TITLE_CN[key], operator: CondOperator.IN, value: selectedTags[key].join(',') })
				}
			}
		}

		let variables = Object.assign(defaultVariables, {
			page: 1,
			filter: variablesFilter
		});

		console.log(variables)

		fetchMore({
			variables: {
				queryCapital: buildingQuery(variables),
				queryProduct: buildingQuery({
					page: 0,
					limit: 5,
					sort: [{ field: 'create_at', order: 'DESC' }],
				})
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				return Object.assign({}, prev, {
					findRootsAndChildren: { ...fetchMoreResult.findRootsAndChildren },
					queryCapital: { ...fetchMoreResult.queryCapital }
				})
			}
		});
	};

	const toGetMetadataTitle = (type) => {
		let node = _.find(findRootsAndChildren, (item) => item.title === type);
		return node ? node.children.map(item => item.title) : [];
	}

	let tagItems = [
		{
			name: '投资行业',
			tagsFromServer: toGetMetadataTitle('行业'),
			title: '行业',
			selectedTags: selectedTags['行业']
		},
		{
			name: '投资方式',
			tagsFromServer: ['股权投资', '债权投资'],
			title: "投资方式",
			selectedTags: selectedTags['投资方式']
		}
	];

	if (selectedTags['投资方式'].length > 0) {
		const mode = selectedTags['投资方式'][0];

		if (mode === '股权投资') {
			tagItems = tagItems.concat([
				{
					name: '投资类型',
					tagsFromServer: toGetMetadataTitle('投资类型'),
					title: '投资类型',
					selectedTags: selectedTags['投资类型']
				},
				{
					name: '投资阶段',
					tagsFromServer: toGetMetadataTitle('阶段'),
					title: '阶段',
					selectedTags: selectedTags['阶段']
				}
			]);
		}

		if (mode === '债权投资') {
			tagItems = tagItems.concat([
				// {
				// 	name: '回报要求',
				// 	tagsFromServer: toGetMetadataTitle('最低回报要求'),
				// 	title: '最低回报要求',
				// 	selectedTags: selectedTags['回报要求']
				// },
				{
					name: '风控要求',
					tagsFromServer: toGetMetadataTitle('风控'),
					title: '风控',
					selectedTags: selectedTags['风控']
				}
			]);
		}
	}

	tagItems = tagItems.concat([
		{
			name: '资金类型',
			tagsFromServer: toGetMetadataTitle('资金类型'),
			title: '资金类型',
			selectedTags: selectedTags['资金类型']
		},
		{
			name: '投资地区',
			tagsFromServer: toGetMetadataTitle('地区'),
			title: '投资地区',
			selectedTags: selectedTags['投资地区']
		},
		{
			name: '投资金额',
			tagsFromServer: toGetMetadataTitle('金额'),
			title: '金额',
			selectedTags: selectedTags['金额']
		}
	]);

	return (
		<BaseLayout>
			<div className="finance-page">
				<BreadCrumb adrname_two={'金融资本'} adrname_thr={'所有资金'} />
				<ScreenMod
					tagItems={tagItems.length ? tagItems : []}
					onChange={onChange}
					tag_name={'所有资金'}
					icon_type={'icon-jinrong1'}
				/>
				<div className="finance-list clearfix">
					<div className="left">
						<TagTop name={'金融资本'} />
						{loading ? (
							<Spin style={{ margin: "10vw 45%" }} tip="正在加载中..." />
						) : (
							!!queryCapital && !!queryCapital.data.length ? (
								queryCapital.data.map((item) => <List data={item} key={item.id} />)
							) : (
								<Empty style={{ margin: "10vw auto" }} description={false} />
							)
						)}
					</div>

					<div className="right">
						<div className="tab-title">
							<p>江旅金融</p>
						</div>
						{!!queryProduct && queryProduct.data.map((item) => (
							<a
								as={`/product/detail/${item.id}`}
								href={`/product/detail?id=${item.id}`}
								key={item.id}
							>
								<div className="product-items">
									<div className="product-item" style={{ marginBottom: 0 }}>
										<img src={item.cover} />

										<h4>{item.name}</h4>
									</div>
									<p style={{ textIndent: 20 }}>{item.summary}</p>
								</div>
							</a>
						))}
					</div>
				</div>
				<PageMod current={current} total={queryCapital ? queryCapital.total : 0} pageSize={10} onChange={onPageChange} />
			</div>
		</BaseLayout>
	)
})
