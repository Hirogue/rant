import { Carousel } from 'antd';
import moment from 'moment';

import './latest_news.scss';

export default (props) => (
	<div className="latest-news">
		<div className="left">
			<div>
				<Carousel>
					{!!props.news && !!props.news.latest ? (
						props.news.latest.map((item, index) => index <= 3 ? (
							<div key={item.id}>
								<a className="img-link" href={`/news/detail?id=${item.id}`} target="_blank">
									{!!item.thumbnail ? <img src={item.thumbnail.url} /> : ''}

									<p className="year">{moment(item.release_datetime).format('YYYY')}</p>
									<div className="content-box">
										<div className="date">
											<p>{moment(item.release_datetime).format('DD')}</p>
											<p>/</p>
											<p>{moment(item.release_datetime).format('M月')}</p>
										</div>
										<div className="content">
											<h4 className="title">{item.title}</h4>

											<p className="text">
												{!!item.description && item.description.length > 80 ? (
													item.description.substr(0, 80) + '...'
												) : (
														item.description
													)}
											</p>
										</div>
									</div>
								</a>
							</div>
						) : '')
					) : (
							''
						)}
				</Carousel>
			</div>
		</div>
		<div className="right">
			{!!props.news && !!props.news.latest ? (
				props.news.latest.map((item, index) => index > 3 ? (
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
							<p>{moment(item.release_datetime).format('YYYY-MM-DD')}</p>
						</div>
					</div>
				) : '')
			) : (
					''
				)}
		</div>
	</div>
);
