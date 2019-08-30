import React from 'react';
import Swiper from 'swiper';
import { Icon } from 'antd';

import 'swiper/dist/css/swiper.min.css';
import './success_case.scss';

export default class SuccessCase extends React.Component {
	componentDidUpdate() {
		const mySwiper = new Swiper('.swiper-container', {
			autoplay: true, //可选选项，自动滑动
			slidesPerView: 4,
			centeredSlides: false,
			loop: true,
			navigation: {
				nextEl: '.iconNext',
				prevEl: '.iconPre'
			}
		});
	}

	render() {
		const { data } = this.props;


		if (!data.length) return '';

		return (
			<div id="success-case" className="success-case-container">
				<div className="success-case-box">
					<div className="success-case-top">
						<h4>成功案例</h4>
					</div>
					<div className="carousel-container">
						<p className="btn iconPre">
							<Icon type="left" />
						</p>
						<p className="btn iconNext">
							<Icon type="right" />
						</p>
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{data.map(item => (
									<div className="swiper-slide" key={'swiper-slide ' + item.id}>
										<div className="item">
											<a href={item.link}>
												<img src={item.cover} />
												<h4>{item.title}</h4>
												<p>{item.summary}</p>
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
