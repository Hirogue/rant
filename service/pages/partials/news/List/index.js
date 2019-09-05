import moment from 'moment';

import './news_item.scss';

export default ({ item }) => (
	<div className="news-item">
		<a className="img-link" href={`/news/detail?id=${item.id}`} target="_blank">
			<img src={item.cover} />
			<p className="year">{moment(item.publish_at).format('YYYY-MM-DD')}</p>
		</a>

		<a className="btn" href={`/news/detail?id=${item.id}`} target="_blank">
			+
		</a>

		<div className="content">
			<div className="date">
				<p>{moment(item.publish_at).format('DD')}</p>
				<p>/</p>
				<p>{moment(item.publish_at).format('M月')}</p>
			</div>
			<div className="texts">
				<a className="title" href={`/news/detail?id=${item.id}`} target="_blank">
					{item.title}
				</a>

				<p className="text">{item.summary}</p>
			</div>
		</div>
	</div>
);
