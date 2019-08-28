import React from 'react';
import { withRouter } from 'next/router';
import IconFont from '../../../components/IconFont';
import config from '../../../config/config';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import './service_detail.scss';
import GlobalContext from '../../../components/context/GlobalContext';

@withRouter
export default class extends React.Component {
	render() {
		const { detail } = this.props.router.query;

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const serviceApplys = context.serviceApplys || [];

						return (
							<div className="service-detail-page">
								<div className="service-top">
									<img className="service-bg-img" src={config.staticImgUrl + 'service-bg.png'} />
									<div className="service-top-content">
										<div className="left">
											<img
												style={{ width: 190, height: 80 }}
												className="service-logo-img"
												src={!!detail.thumbnail ? detail.thumbnail.url : ''}
											/>
											<div className="name-btn">
												<p>{detail.name}</p>

												{serviceApplys.find((apply) => apply.service_id === detail.id) ? (
													<a style={{ background: '#ccc' }}>已交换</a>
												) : (
													<a onClick={() => context.applyService(detail.id)}>交换名片</a>
												)}
											</div>
										</div>
										<ul className="right">
											<li>
												<span>机构类别</span>
												<span>{detail.category}</span>
											</li>
											<li>
												<span>所在地区</span>
												<span>{detail.area}</span>
											</li>
										</ul>
									</div>
								</div>
								<BreadCrumb />
								<div className="item-main">
									<div className="item-top">
										<div className="icon">
											<IconFont className="iconfont" type="icon-jiantou" />
											<span>机构简介</span>
										</div>
									</div>
									<div
										className="item-content"
										dangerouslySetInnerHTML={{
											__html: !!detail.ex_info ? detail.ex_info.richtext.html : ''
										}}
									/>
								</div>
							</div>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
