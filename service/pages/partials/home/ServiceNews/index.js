import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import './service_news.scss';

export default class extends React.Component {
	state = {
		current: ''
	};

	changeServiceCategory = (current) => {
		this.setState((state) => ({
			...state,
			current
		}));
	};

	render() {
		const { data, mainData } = this.props;

		if (!data || !mainData) return '';

		const services = mainData.services;
		if (!services) return '';

		const serviceList = data.serviceList || [];
		const news1 = data.news1 || [ {} ];
		const news2 = data.news2 || [ {} ];
		const news3 = data.news3 || [ {} ];

		const news1Top = news1[0] || {};
		const news2Top = news2[0] || {};
		const news3Top = news3[0] || {};

		return (
			<div className="service-news-containar">
				<div id="service" className="service-box">
					<h4 className="team-box-title">项目服务商</h4>
					<p className="line" />
					<ul className="link-list">
						{services.map((item, index) => (
							<li key={index + item.id}>
								<a href={`/service?category=${item.name}`}>{item.name}</a>
							</li>
						))}
					</ul>
					<div className="service-list">
						{serviceList.map((item, index) => (
							<a href={`/service/detail?id=${item.id}`} key={index + item.id}>
								<div className="service-item">
									<img src={!!item.thumbnail ? item.thumbnail.url : ''} />
								</div>
							</a>
						))}
					</div>
				</div>
				<div id="news" className="news-box">
					<div className="news-list">
						<div className="news-item">
							<h4 className="type-title">行业快讯</h4>

							<a href={`/news/detail?id=${news1Top.id}`}>
								<div className="thumbnail">
									<img src={!!news1Top.thumbnail ? news1Top.thumbnail.url : ''} />
									<p className="index-news-title">{news1Top.title}</p>
								</div>
							</a>
							<a href={`/news/detail?id=${news1Top.id}`}>
								<p className="index-news-content">
									{!!news1Top.description && news1Top.description.length > 40 ? (
										news1Top.description.substr(0, 40) + '...'
									) : (
										news1Top.description
									)}
								</p>
							</a>
							<ul className="news-sub-list">
								{news1.map(
									(item, index) =>
										index > 0 ? (
											<a href={`/news/detail?id=${item.id}`} key={item.id}>
												<li>
													<p>
														{!!item.title && item.title.length > 15 ? (
															item.title.substr(0, 15) + '...'
														) : (
															item.title
														)}
													</p>
													<p>{moment(item.release_datetime).format('MM-DD')}</p>
												</li>
											</a>
										) : (
											''
										)
								)}
							</ul>
						</div>
						<div className="news-item">
							<h4 className="type-title">投融研报</h4>

							<a href={`/news/detail?id=${news2Top.id}`}>
								<div className="thumbnail">
									<img src={!!news2Top.thumbnail ? news2Top.thumbnail.url : ''} />
									<p className="index-news-title">{news2Top.title}</p>
								</div>
							</a>
							<a href={`/news/detail?id=${news2Top.id}`}>
								<p className="index-news-content">
									{!!news2Top.description && news2Top.description.length > 40 ? (
										news2Top.description.substr(0, 40) + '...'
									) : (
										news2Top.description
									)}
								</p>
							</a>
							<ul className="news-sub-list">
								{news2.map(
									(item, index) =>
										index > 0 ? (
											<a href={`/news/detail?id=${item.id}`} key={item.id}>
												<li>
													<p>
														{!!item.title && item.title.length > 15 ? (
															item.title.substr(0, 15) + '...'
														) : (
															item.title
														)}
													</p>
													<p>{moment(item.release_datetime).format('MM-DD')}</p>
												</li>
											</a>
										) : (
											''
										)
								)}
							</ul>
						</div>
						<div className="news-item">
							<h4 className="type-title">江旅资讯</h4>

							<a href={`/news/detail?id=${news3Top.id}`}>
								<div className="thumbnail">
									<img src={!!news3Top.thumbnail ? news3Top.thumbnail.url : ''} />
									<p className="index-news-title">{news3Top.title}</p>
								</div>
							</a>
							<a href={`/news/detail?id=${news3Top.id}`}>
								<p className="index-news-content">
									{!!news3Top.description && news3Top.description.length > 40 ? (
										news3Top.description.substr(0, 40) + '...'
									) : (
										news3Top.description
									)}
								</p>
							</a>

							<ul className="news-sub-list">
								{news3.map(
									(item, index) =>
										index > 0 ? (
											<a href={`/news/detail?id=${item.id}`} key={item.id}>
												<li>
													<p>
														{!!item.title && item.title.length > 15 ? (
															item.title.substr(0, 15) + '...'
														) : (
															item.title
														)}
													</p>
													<p>{moment(item.release_datetime).format('MM-DD')}</p>
												</li>
											</a>
										) : (
											''
										)
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
