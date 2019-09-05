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

import List from '../../partials/project/List';
import { createApolloClient } from "../../lib/apollo";
import { buildingQuery, getUrlParam } from "../../lib/global";
import { Q_GET_PROJECT_DATA } from '../../gql'
import { METADATA_TITLE_CN, IF_MODE_ENUM_R } from '../../lib/enum';

import '../../partials/project/selected_items.scss';

const client = createApolloClient();
const defaultVariables = {
	page: 0,
	limit: 10,
	join: [{ field: "industry" }],
	filter: [{ field: "status", operator: CondOperator.IN, value: "checked,finished,waitting,following" }],
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
			融资方式: !!category ? [category] : [],
			金额: [],
			地区: [],
			阶段: [],
			比例: [],
			退出方式: [],
			利息: [],
			时长: [],
			风控: []
		}
	});

	const { current, selectedTags } = state;

	const { loading, fetchMore, refetch, data: { findRootsAndChildren, queryProject } } = useQuery(Q_GET_PROJECT_DATA, {
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
		client: client,
		variables: {
			queryString: buildingQuery(defaultVariables)
		}
	})

	useEffect(() => {
		!!industry && defaultVariables.filter.push({ field: "industry.title", operator: CondOperator.EQUALS, value: industry });
		!!category && defaultVariables.filter.push({ field: "category", operator: CondOperator.EQUALS, value: IF_MODE_ENUM_R[category] });
		refetch({
			queryString: buildingQuery(defaultVariables)
		})
	}, [])

	const onPageChange = (page, pageSize) => {
		let variables = Object.assign(defaultVariables, {
			page: page,
			limit: pageSize,
		});
		fetchMore({
			variables: {
				queryString: buildingQuery(variables)
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
		if (newTags.length > 0 && item.name === '融资方式') {
			newTags = [newTags.pop()];
		}
		if (item.title === '金额' && newTags.length === 2) newTags.shift();
		if (item.title === '地区' && newTags.length === 2) newTags.shift();
		selectedTags[item.title] = newTags;
		setState((state) => ({
			...state,
			selectedTags
		}));
		
		let variablesFilter = [{ field: "status", operator: CondOperator.IN, value: "checked,finished,waitting,following" }];
		for (let key in selectedTags) {
			if (selectedTags.hasOwnProperty(key)) {
				if (key === '金额' && selectedTags[key][0]) {
					let [rangeA, rangeB] = selectedTags[key][0].replace('以上', '-').split('-').map(item => item.replace('万', '').replace('亿', '0000'));
					rangeA && variablesFilter.push({ field: "amount", operator: CondOperator.GREATER_THAN_EQUALS, value: rangeA });
					rangeB && variablesFilter.push({ field: "amount", operator: CondOperator.LOWER_THAN_EQAULS, value: rangeB });
				} else if (key === '地区' && selectedTags[key][0]) {
					 variablesFilter.push({ field: 'area_path', operator: CondOperator.CONTAINS, value: selectedTags[key][0] })
				} else if (key === '融资方式' && selectedTags[key].length) {
					variablesFilter.push({ field: 'category', operator: CondOperator.EQUALS, value: IF_MODE_ENUM_R[selectedTags[key][0]] })
				} else {
					selectedTags[key].length && variablesFilter.push({ field: METADATA_TITLE_CN[key], operator: CondOperator.IN, value: selectedTags[key].join(',') })
				}
			}
		}

		let variables = Object.assign(defaultVariables, { 
			page: 1,
			filter: variablesFilter
		});

		fetchMore({
			variables: {
				queryString: buildingQuery(variables)
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				return Object.assign({}, prev, {
					findRootsAndChildren: { ...fetchMoreResult.findRootsAndChildren },
					queryProject: { ...fetchMoreResult.queryProject }
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
			name: '所属行业',
			title: '行业',
			tagsFromServer: toGetMetadataTitle('行业'),
			selectedTags: selectedTags['行业']
		},
		{
			name: '融资方式',
			title: '融资方式',
			tagsFromServer: ['股权融资', '债权融资'],
			selectedTags: selectedTags['融资方式']
		}
	];

	if (selectedTags['融资方式'].length > 0) {
		const mode = selectedTags['融资方式'][0];

		if (mode === '股权融资') {
			tagItems = tagItems.concat([
				{
					name: '项目阶段',
					title: '阶段',
					tagsFromServer: toGetMetadataTitle('阶段'),
					selectedTags: selectedTags['阶段']
				},
				{
					name: '占股比例',
					title: '比例',
					tagsFromServer: toGetMetadataTitle('比例'),
					selectedTags: selectedTags['比例']
				}
			]);
		}

		if (mode === '债权融资') {
			tagItems = tagItems.concat([
				{
					name: '最高利息',
					title: '利息',
					tagsFromServer: toGetMetadataTitle('利息'),
					selectedTags: selectedTags['利息']
				},
				{
					name: '占用时长',
					title: '时长',
					tagsFromServer: toGetMetadataTitle('时长'),
					selectedTags: selectedTags['时长']
				},
				{
					name: '风控要求',
					title: '风控',
					tagsFromServer: toGetMetadataTitle('风控'),
					selectedTags: selectedTags['风控']
				}
			]);
		}
	}

	tagItems = tagItems.concat([
		{
			name: '所在地区',
			title: '地区',
			tagsFromServer: toGetMetadataTitle('地区'),
			selectedTags: selectedTags['地区']
		},
		{
			name: '融资金额',
			title: '金额',
			tagsFromServer: toGetMetadataTitle('金额'),
			selectedTags: selectedTags['金额']
		}
	]);
	
	return (
		<BaseLayout>
			<div className="selected-items-page">
				<BreadCrumb adrname_two={'项目招商'} adrname_thr={'所有项目'} />
				<ScreenMod
					tagItems={tagItems.length ? tagItems : []}
					onChange={onChange}
					tag_name={'所有项目'}
					icon_type={'icon-tuandui'}
				/>
				<div className="project-list">
					<TagTop name={'项目招商'} />
					{loading ? (
						<Spin style={{ margin: "10vw 46%" }} tip="正在加载中..." />
					) : (
						!!queryProject && !!queryProject.data.length ? (
							queryProject.data.map(item => <List data={item} key={item.id} />)
						) : (
							<Empty style={{ margin: "10vw auto" }} description={false} />
						)
					)}
					<PageMod current={current} total={queryProject ? queryProject.total : 0} pageSize={10} onChange={onPageChange} />
				</div>
			</div>
		</BaseLayout>
	)
})

