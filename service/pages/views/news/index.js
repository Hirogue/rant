import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'next/router';
import { Tabs } from 'antd';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import LatestNews from '../../partials/news/LatestNews';
import List from '../../partials/news/List';

import '../../partials/news/news.scss';

import GlobalContext from '../../components/context/GlobalContext';

const TabPane = Tabs.TabPane;


export default withRouter((props) => {

	let { router } = props;

	let category = getUrlParam(router, 'category');

	return (
		<BaseLayout>

		</BaseLayout>
	)
})

// @withRouter
// export default class extends Component {
// 	state = {
// 		news: [],
// 		industryNews: {},
// 		jlNews: {},
// 		researchReports: {},
// 		schoolNews: {}
// 	};

// 	async componentDidMount() {
// 		const { news } = this.props.router.query;

// 		this.setState((state) => ({
// 			...state,
// 			news,
// 			industryNews: {
// 				list: _.take(news.industryNews, 3) || [],
// 				current: 1,
// 				length: Math.ceil(news.industryNews.length / 3)
// 			},
// 			jlNews: { list: _.take(news.jlNews, 3) || [], current: 1, length: Math.ceil(news.jlNews.length / 3) },
// 			researchReports: {
// 				list: _.take(news.researchReports, 3) || [],
// 				current: 1,
// 				length: Math.ceil(news.researchReports.length / 3)
// 			},
// 			schoolNews: {
// 				list: _.take(news.schoolNews, 3) || [],
// 				current: 1,
// 				length: Math.ceil(news.schoolNews.length / 3)
// 			}
// 		}));
// 	}

// 	loadMore = (key) => () => {
// 		if (key === 1) {
// 			const industryNews = this.state.industryNews;

// 			industryNews.list = industryNews.list.concat(
// 				this.state.news.industryNews.map((item) => item).splice(industryNews.current++ * 3, 6)
// 			);
// 			industryNews.current ++;

// 			this.setState((state) => ({
// 				...state,
// 				industryNews
// 			}));
// 		}

// 		if (key === 2) {
// 			const jlNews = this.state.jlNews;

// 			jlNews.list = jlNews.list.concat(
// 				this.state.news.jlNews.map((item) => item).splice(jlNews.current++ * 3, 6)
// 			);
// 			jlNews.current ++;

// 			this.setState((state) => ({
// 				...state,
// 				jlNews
// 			}));
// 		}

// 		if (key === 3) {
// 			const researchReports = this.state.researchReports;

// 			researchReports.list = researchReports.list.concat(
// 				this.state.news.researchReports.map((item) => item).splice(researchReports.current++ * 3, 6)
// 			);
// 			researchReports.current ++;

// 			this.setState((state) => ({
// 				...state,
// 				researchReports
// 			}));
// 		}

// 		if (key === 4) {
// 			const schoolNews = this.state.schoolNews;

// 			schoolNews.list = schoolNews.list.concat(
// 				this.state.news.schoolNews.map((item) => item).splice(schoolNews.current++ * 3, 6)
// 			);
// 			schoolNews.current ++;

// 			this.setState((state) => ({
// 				...state,
// 				schoolNews
// 			}));
// 		}
// 	};

// 	render() {
// 		const { category } = this.props.router.query;

// 		return (
// 			<BaseLayout>
// 				<GlobalContext.Consumer>
// 					{(context) => {
// 						return (
// 							<React.Fragment>
// 								<div className="news-page">
// 									<BreadCrumb adrname_two={'行业资讯'} />
// 									<LatestNews news={this.state.news} />
// 									<Tabs defaultActiveKey={category} animated={false}>
// 										<TabPane tab="行业快讯" key={1}>
// 											<div className="news-list">
// 												{!!this.state.news.industryNews &&
// 													this.state.industryNews.list.map((item) => (
// 														<List item={item} key={item.id} />
// 													))}
// 											</div>
// 											<div className="btn-box">
// 												{this.state.industryNews.length > this.state.industryNews.current ? (
// 													<a className="more-btn" onClick={this.loadMore(1)}>
// 														加载更多...
// 													</a>
// 												) : (
// 													''
// 												)}
// 											</div>
// 										</TabPane>
// 										<TabPane tab="江旅资讯" key={2}>
// 											<div className="news-list">
// 												{!!this.state.news.jlNews &&
// 													!!this.state.news.jlNews &&
// 													this.state.jlNews.list.map((item) => (
// 														<List item={item} key={item.id} />
// 													))}
// 											</div>
// 											<div className="btn-box">
// 												{!!this.state.news.jlNews &&
// 												this.state.jlNews.length > this.state.jlNews.current ? (
// 													<a className="more-btn" onClick={this.loadMore(2)}>
// 														加载更多...
// 													</a>
// 												) : (
// 													''
// 												)}
// 											</div>
// 										</TabPane>
// 										<TabPane tab="投融研报" key={3}>
// 											<div className="news-list">
// 												{!!this.state.news.researchReports &&
// 													this.state.researchReports.list.map((item) => (
// 														<List item={item} key={item.id} />
// 													))}
// 											</div>
// 											<div className="btn-box">
// 												{!!this.state.news.researchReports &&
// 												this.state.researchReports.length >
// 													this.state.researchReports.current ? (
// 													<a className="more-btn" onClick={this.loadMore(3)}>
// 														加载更多...
// 													</a>
// 												) : (
// 													''
// 												)}
// 											</div>
// 										</TabPane>
// 										<TabPane tab="投融学堂" key={4}>
// 											<div className="news-list">
// 												{!!this.state.news.schoolNews &&
// 													this.state.schoolNews.list.map((item) => (
// 														<List item={item} key={item.id} />
// 													))}
// 											</div>
// 											<div className="btn-box">
// 												{!!this.state.news.schoolNews &&
// 												this.state.schoolNews.length > this.state.schoolNews.current ? (
// 													<a className="more-btn" onClick={this.loadMore(4)}>
// 														加载更多...
// 													</a>
// 												) : (
// 													''
// 												)}
// 											</div>
// 										</TabPane>
// 									</Tabs>
// 								</div>
// 							</React.Fragment>
// 						);
// 					}}
// 				</GlobalContext.Consumer>
// 			</BaseLayout>
// 		);
// 	}
// }
