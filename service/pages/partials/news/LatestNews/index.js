import { Carousel } from 'antd';
import moment from 'moment';

import './latest_news.scss';

export default ({ news }) => {

	if (!news) return '';

	const newsSwiper = news.slice(0, 4);
	const newsList = news.slice(4);

	return (
		<div className="latest-news">
			<div className="left">
				<div>
					<Carousel>
						{newsSwiper.map(item => (
								<div key={item.id}>
									<a className="img-link" href={`/news/detail?id=${item.id}`} target="_blank">
										<img src={item.cover} />

										<p className="year">{moment(item.publish_at).format('YYYY')}</p>
										<div className="content-box">
											<div className="date">
												<p>{moment(item.publish_at).format('DD')}</p>
												<p>/</p>
												<p>{moment(item.publish_at).format('M月')}</p>
											</div>
											<div className="content">
												<h4 className="title">{item.title}</h4>

												<p className="text">{item.summary}</p>
											</div>
										</div>
									</a>
								</div>
							)
						)}
					</Carousel>
				</div>
			</div>
			<div className="right">
				{newsList.map((item, index) => (
						<div className="item" key={item.id}>
							<div className="texts">
								<a className="title" href={`/news/detail?id=${item.id}`} target="_blank">
									{!!item.title && item.title.length > 23 ? (
										item.title.substr(0, 23) + '...'
									) : (
										item.title
									)}
								</a>

								{/* <p className="text">
									{!!item.description && item.description.length > 20 ? (
										item.description.substr(0, 20) + '...'
									) : (
											item.description
										)}
								</p> */}
							</div>
							<div className="date">
								<p>{''}</p>
								<p>/</p>
								<p>{moment(item.publish_at).format('YYYY-MM-DD')}</p>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}


