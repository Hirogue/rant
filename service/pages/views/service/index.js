import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Spin, Empty } from 'antd';
import { withRouter } from 'next/router';
import { CondOperator } from '@nestjsx/crud-request';
import { useQuery } from '@apollo/react-hooks';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import PageMod from '../../components/PageMod';
import ScreenMod from '../../components/ScreenMod';
import List from '../../partials/service/List';

import { createApolloClient } from "../../lib/apollo";
import { buildingQuery, getUrlParam } from "../../lib/global";
import { Q_GET_PROVIDER_DATA } from '../../gql'
import { METADATA_TITLE_CN, IF_MODE_ENUM_R } from '../../lib/enum';

import '../../partials/service/service.scss';
// import GlobalContext from '../../components/context/GlobalContext';

const client = createApolloClient();
const defaultVariables = {
	page: 0,
	limit: 10,
	join: [{ field: "category" }, { field: "area" }],
	filter: [{ field: "status", operator: CondOperator.IN, value: "checked,finished,waitting,following" }],
	sort: [{ field: 'create_at', order: 'DESC' }],
};

export default withRouter((props) => {

	let { router } = props;

	let category = getUrlParam(router, 'category');

	const [state, setState] = useState({
		current: 1,
		selectedTags: {
			机构类别: [],
			地区: []
		}
	});

	const { current, selectedTags } = state;

	const { loading, fetchMore, refetch, data: { findRootsAndChildren, queryProvider, providerCategoryTrees } } = useQuery(Q_GET_PROVIDER_DATA, {
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
		client: client,
		variables: {
			queryProvider: buildingQuery(defaultVariables)
		}
	});

	findRootsAndChildren && findRootsAndChildren.push({ title: '机构类别', children: providerCategoryTrees });

	useEffect(() => {
		!!category && defaultVariables.filter.push({ field: "category.title", operator: CondOperator.EQUALS, value: category });
		refetch({
			queryProvider: buildingQuery(defaultVariables)
		})
	}, []);

	const onPageChange = (page, pageSize) => {
		let variables = Object.assign(defaultVariables, {
			page: page,
			limit: pageSize,
		});
		fetchMore({
			variables: {
				queryProvider: buildingQuery(variables)
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
				return fetchMoreResult
			}
		});
	};

	const toGetMetadataTitle = (type) => {
		let node = _.find(findRootsAndChildren, (item) => item.title === type);
		return node ? node.children.map(item => item.title) : [];
	}

	const tagItems = [
		{
			name: '机构类别',
			title: '机构类别',
			tagsFromServer: toGetMetadataTitle('机构类别'),
			selectedTags: selectedTags['机构类别']
		},
		{
			name: '所在地区',
			title: '地区',
			tagsFromServer: toGetMetadataTitle('地区'),
			selectedTags: selectedTags['地区']
		}
	];

	return (
		<BaseLayout>
			<div className="service-page">
				<BreadCrumb adrname_two={'服务商'} adrname_thr={'所有服务商'} />
				<ScreenMod
					tagItems={tagItems.length ? tagItems : []}
					onChange={onChange}
					tag_name={'服务商'}
					icon_type={'icon-shangwuren'}
				/>
				<div className="service-list">
					{loading ? (
						<Spin style={{ margin: "10vw 46%" }} tip="正在加载中..." />
					) : (
						!!queryProvider && !!queryProvider.data.length ? (
							queryProvider.data.map((item) => <List data={item} key={item.id} />)
						) : (
							<Empty style={{ margin: "10vw auto" }} description={false} />
						)
					)}
				</div>
				<PageMod current={current} total={queryProvider ? queryProvider.total : 0} pageSize={10} onChange={onPageChange} />
			</div>
		</BaseLayout>
	)
})
