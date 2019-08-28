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

		const caseList = data.caseList;

		if (!caseList) return '';

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
								{caseList.map((item, index) => (
									<div className="swiper-slide" key={'swiper-slide' + index}>
										<div className="item">
											<a href={item.link}>
												<img src={!!item.thumbnail ? item.thumbnail.url : ''} />
												<h4>{item.title}</h4>
												<p>{item.subtitle}</p>
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
