import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import { Spin, Empty } from 'antd';
import { withRouter } from 'next/router';
import { CondOperator } from '@nestjsx/crud-request';
import { useQuery } from '@apollo/react-hooks';
import { Tabs } from 'antd';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import LatestNews from '../../partials/news/LatestNews';
import List from '../../partials/news/List';

import { createApolloClient } from "../../lib/apollo";
import { buildingQuery, getUrlParam } from "../../lib/global";
import { Q_GET_ARTICLE_DATA } from '../../gql'
import { METADATA_TITLE_CN, IF_MODE_ENUM_R } from '../../lib/enum';

import '../../partials/news/news.scss';

const TabPane = Tabs.TabPane;
const client = createApolloClient();
const defaultFilter = { field: 'is_published', operator: CondOperator.EQUALS, value: true };
const defaultVariables = {
	page: 1,
	join: [{ field: 'category' }],
	sort: [{ field: 'publish_at', order: 'DESC' }, { field: 'sort', order: 'ASC' }],
};

const topNewsVariables = Object.assign({}, defaultVariables, {
	limit: 10,
	filter: [
		{ ...defaultFilter },
		{ field: 'is_top', operator: CondOperator.EQUALS, value: true }
	],
	sort: [{ field: 'sort', order: 'ASC' },{ field: 'publish_at', order: 'DESC' }],
})
const latestNewsVariables = Object.assign({}, defaultVariables, {
	limit: 10,
	filter: [
		{ ...defaultFilter },
		{ field: 'is_top', operator: CondOperator.EQUALS, value: false }
	],
	sort: [{ field: 'sort', order: 'ASC' },{ field: 'publish_at', order: 'DESC' }],
})
const newsVariables_1 = Object.assign({}, defaultVariables, {
	limit: 6,
	filter: [
		{ ...defaultFilter },
		{ field: 'category.title', operator: CondOperator.EQUALS, value: '行业快讯' }
	]
})
const newsVariables_2 = Object.assign({}, defaultVariables, {
	limit: 6,
	filter: [
		{ ...defaultFilter },
		{ field: 'category.title', operator: CondOperator.EQUALS, value: '江旅资讯' }
	]
})
const newsVariables_3 = Object.assign({}, defaultVariables, {
	limit: 6,
	filter: [
		{ ...defaultFilter },
		{ field: 'category.title', operator: CondOperator.EQUALS, value: '投融研报' }
	]
})
const newsVariables_4 = Object.assign({}, defaultVariables, {
	limit: 6,
	filter: [
		{ ...defaultFilter },
		{ field: 'category.title', operator: CondOperator.EQUALS, value: '投融学堂' }
	]
})
const newsVariables_5 = Object.assign({}, defaultVariables, {
	limit: 6,
	filter: [
		{ ...defaultFilter },
		{ field: 'category.title', operator: CondOperator.EQUALS, value: '通知公告' }
	]
});

const categoryArray = ['行业快讯','江旅资讯','投融研报','投融学堂','通知公告'];

export default withRouter((props) => {

	let { router } = props;

	const [category, setCategory] = useState(getUrlParam(router, 'category') || '1');

	const { loading, fetchMore, data: { topNews, latestNews, news1,  news2,  news3,  news4,  news5 } } = useQuery(Q_GET_ARTICLE_DATA, {
		fetchPolicy: "cache-first",
		notifyOnNetworkStatusChange: true,
		client: client,
		variables: {
			topNewsString: buildingQuery(topNewsVariables),
			latestNewsString: buildingQuery(latestNewsVariables),
			newsString1: buildingQuery(newsVariables_1),
			newsString2: buildingQuery(newsVariables_2),
			newsString3: buildingQuery(newsVariables_3),
			newsString4: buildingQuery(newsVariables_4),
			newsString5: buildingQuery(newsVariables_5)
		}
	});

	const loadMore = (key) => () => {
		if (key === 1) {
			fetchMore({
				variables: {
					newsString1: buildingQuery({
						...newsVariables_1,
						page: news1.page ? news1.page + 1 : 1
					}),
				},
				updateQuery: (prev, { fetchMoreResult }) => ({
					...prev,
					news1: {
						...fetchMoreResult.news1,
						data: prev.news1.data.concat(fetchMoreResult.news1.data)
					},
				})
			});
		}

		if (key === 2) {
			fetchMore({
				variables: {
					newsString2: buildingQuery({
						...newsVariables_2,
						page: news2.page ? news2.page + 1 : 1
					}),
				},
				updateQuery: (prev, { fetchMoreResult }) => ({
					...prev,
					news2: {
						...fetchMoreResult.news2,
						data: prev.news2.data.concat(fetchMoreResult.news2.data)
					},
				})
			});
		}

		if (key === 3) {
			fetchMore({
				variables: {
					newsString3: buildingQuery({
						...newsVariables_3,
						page: news3.page ? news3.page + 1 : 1
					}),
				},
				updateQuery: (prev, { fetchMoreResult }) => ({
					...prev,
					news3: {
						...fetchMoreResult.news3,
						data: prev.news3.data.concat(fetchMoreResult.news3.data)
					},
				})
			});
		}

		if (key === 4) {
			fetchMore({
				variables: {
					newsString4: buildingQuery({
						...newsVariables_4,
						page: news4.page ? news4.page + 1 : 1
					}),
				},
				updateQuery: (prev, { fetchMoreResult }) => ({
					...prev,
					news4: {
						...fetchMoreResult.news4,
						data: prev.news4.data.concat(fetchMoreResult.news4.data)
					},
				})
			});
		}
		if (key === 5) {
			fetchMore({
				variables: {
					newsString5: buildingQuery({
						...newsVariables_5,
						page: news5.page ? news5.page + 1 : 1
					}),
				},
				updateQuery: (prev, { fetchMoreResult }) => ({
					...prev,
					news5: {
						...fetchMoreResult.news5,
						data: prev.news5.data.concat(fetchMoreResult.news5.data)
					},
				})
			});
		}
	};

	console.log(topNews, latestNews);

	let topNewsCombined = [];
	if (topNews && topNews.data && latestNews && latestNews.data) {
		topNewsCombined = topNews.data.sort((a, b) => a.sort - b.sort).concat(latestNews.data.sort((a, b) => a.sort - b.sort));
	}

	return (
		<BaseLayout>
			{<div className="news-page">
				<BreadCrumb adrname_two={categoryArray[category-1]} />
				<LatestNews news={topNewsCombined} />
				<Tabs activeKey={category} animated={false} onChange={(key) => setCategory(key) || window.history.pushState({}, '', `${window.location.pathname}?category=${key}`)}>
					<TabPane tab="行业快讯" key={1}>
						<div className="news-list">
							{!!news1 && !!news1.data && !!news1.data.length && news1.data.map((item) => (
								<List item={item} key={item.id} />
							))}
						</div>
						<div className="btn-box">
							{!loading && !!news1 && !!news1.page && !!news1.pageCount && news1.page < news1.pageCount && (
								<a className="more-btn" onClick={loadMore(1)}>加载更多...</a>
							)}
						</div>
					</TabPane>
					<TabPane tab="江旅资讯" key={2}>
						<div className="news-list">
							{!!news2 && !!news2.data && !!news2.data.length && news2.data.map((item) => (
								<List item={item} key={item.id} />
							))}
						</div>
						<div className="btn-box">
							{!loading && !!news2 && !!news2.page && !!news2.pageCount && news2.page < news2.pageCount && (
								<a className="more-btn" onClick={loadMore(2)}>加载更多...</a>
							)}
						</div>
					</TabPane>
					<TabPane tab="投融研报" key={3}>
						<div className="news-list">
							{!!news3 && !!news3.data && !!news3.data.length && news3.data.map((item) => (
								<List item={item} key={item.id} />
							))}
						</div>
						<div className="btn-box">
							{!loading && !!news3 && !!news3.page && !!news3.pageCount && news3.page < news3.pageCount && (
								<a className="more-btn" onClick={loadMore(3)}>加载更多...</a>
							)}
						</div>
					</TabPane>
					<TabPane tab="投融学堂" key={4}>
						<div className="news-list">
							{!!news4 && !!news4.data && !!news4.data.length && news4.data.map((item) => (
								<List item={item} key={item.id} />
							))}
						</div>
						<div className="btn-box">
							{!loading && !!news4 && !!news4.page && !!news4.pageCount && news4.page < news4.pageCount && (
								<a className="more-btn" onClick={loadMore(4)}>加载更多...</a>
							)}
						</div>
					</TabPane>
					<TabPane tab="政策公告" key={5}>
						<div className="news-list">
							{!!news5 && !!news5.data && !!news5.data.length && news5.data.map((item) => (
								<List item={item} key={item.id} />
							))}
						</div>
						<div className="btn-box">
							{!loading && !!news5 && !!news5.page && !!news5.pageCount && news5.page < news5.pageCount && (
								<a className="more-btn" onClick={loadMore(5)}>加载更多...</a>
							)}
						</div>
					</TabPane>
				</Tabs>
				{loading && <Spin style={{ margin: "10vw 46%" }} tip="正在加载中..." />}
			</div>}
		</BaseLayout>
	)
})
