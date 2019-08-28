import moment from 'moment';

import './news_item.scss';

export default (props) => (
	<div className="news-item">
		<a className="img-link" href={`/news/detail?id=${props.item.id}`} target="_blank">
			<img src={!!props.item.thumbnail ? props.item.thumbnail.url : ''} />
			<p className="year">{moment(props.item.release_datetime).format('YYYY-MM-DD')}</p>
		</a>

		<a className="btn" href={`/news/detail?id=${props.item.id}`} target="_blank">
			+
		</a>

		<div className="content">
			<div className="date">
				<p>{moment(props.item.release_datetime).format('DD')}</p>
				<p>/</p>
				<p>{moment(props.item.release_datetime).format('M月')}</p>
			</div>
			<div className="texts">
				<a className="title" href={`/news/detail?id=${props.item.id}`} target="_blank">
					{props.item.title}
				</a>

				<p className="text">{props.item.description}</p>
			</div>
		</div>
	</div>
);
