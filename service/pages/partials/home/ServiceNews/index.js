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

		if (!data.news || !mainData.length) return '';

		const providers = data.providers || [];
		const news = data.news;
		const newsCategory = Object.keys(data.news).filter(item => item.indexOf('通知') === -1);

		const news1 = news[newsCategory[0]].data || [ {}, {} ];
		const news2 = news[newsCategory[1]].data || [ {}, {} ];
		const news3 = news[newsCategory[2]].data || [ {}, {} ];

		const news1Top = news1.shift();
		const news2Top = news2.shift();
		const news3Top = news3.shift();

		return (
			<div className="service-news-containar">
				<div id="service" className="service-box">
					<h4 className="team-box-title">项目服务商</h4>
					<p className="line" />
					<ul className="link-list">
						{mainData.map(item => (
							<li key={item.id}>
								<a href={`/service?category=${item.title}`}>{item.title}</a>
							</li>
						))}
					</ul>
					<div className="service-list">
						{providers.map(item => (
							<a href={`/service/detail?id=${item.id}`} key={item.id}>
								<div className="service-item">
									<img src={item.logo} />
								</div>
							</a>
						))}
					</div>
				</div>
				<div id="news" className="news-box">
					<div className="news-list">
						<div className="news-item">
							<h4 className="type-title">{newsCategory[0]}</h4>

							<a href={`/news/detail?id=${news1Top.id}`}>
								<div className="thumbnail">
									<img src={news1Top.cover} />
									<p className="index-news-title">{news1Top.title}</p>
								</div>
							</a>
							<a href={`/news/detail?id=${news1Top.id}`}>
								<p className="index-news-content">
									{!!news1Top.summary && news1Top.summary.length > 40 ? (
										news1Top.summary.substr(0, 40) + '...'
									) : (
										news1Top.summary
									)}
								</p>
							</a>
							<ul className="news-sub-list">
								{news1.map(item => (
									<a href={`/news/detail?id=${item.id}`} key={item.id}>
										<li>
											<p>
												{!!item.title && item.title.length > 15 ? (
													item.title.substr(0, 15) + '...'
												) : (
														item.title
													)}
											</p>
											<p>{moment(item.publish_at).format('MM-DD')}</p>
										</li>
									</a>
								))}
							</ul>
						</div>
						<div className="news-item">
							<h4 className="type-title">{newsCategory[1]}</h4>

							<a href={`/news/detail?id=${news2Top.id}`}>
								<div className="thumbnail">
									<img src={news2Top.cover} />
									<p className="index-news-title">{news2Top.title}</p>
								</div>
							</a>
							<a href={`/news/detail?id=${news2Top.id}`}>
								<p className="index-news-content">
									{!!news2Top.summary && news2Top.summary.length > 40 ? (
										news2Top.summary.substr(0, 40) + '...'
									) : (
										news2Top.summary
									)}
								</p>
							</a>
							<ul className="news-sub-list">
								{news2.map(item => (
									<a href={`/news/detail?id=${item.id}`} key={item.id}>
										<li>
											<p>
												{!!item.title && item.title.length > 15 ? (
													item.title.substr(0, 15) + '...'
												) : (
														item.title
													)}
											</p>
											<p>{moment(item.publish_at).format('MM-DD')}</p>
										</li>
									</a>
								))}
							</ul>
						</div>
						<div className="news-item">
							<h4 className="type-title">{newsCategory[2]}</h4>

							<a href={`/news/detail?id=${news3Top.id}`}>
								<div className="thumbnail">
									<img src={news3Top.cover} />
									<p className="index-news-title">{news3Top.title}</p>
								</div>
							</a>
							<a href={`/news/detail?id=${news3Top.id}`}>
								<p className="index-news-content">
									{!!news3Top.summary && news3Top.summary.length > 40 ? (
										news3Top.summary.substr(0, 40) + '...'
									) : (
										news3Top.summary
									)}
								</p>
							</a>

							<ul className="news-sub-list">
								{news3.map(item => (
									<a href={`/news/detail?id=${item.id}`} key={item.id}>
										<li>
											<p>
												{!!item.title && item.title.length > 15 ? (
													item.title.substr(0, 15) + '...'
												) : (
														item.title
													)}
											</p>
											<p>{moment(item.publish_at).format('MM-DD')}</p>
										</li>
									</a>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
