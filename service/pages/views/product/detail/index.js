import React from 'react';
import { Anchor } from 'antd';
import { withRouter } from 'next/router';
import IconFont from '../../../components/IconFont';
import config from '../../../config/config';
import BaseLayout from '../../../components/Layout/BaseLayout';

import './product_detail.scss';
import GlobalContext from '../../../components/context/GlobalContext';

const { Link } = Anchor;

@withRouter
export default class extends React.Component {
	render() {
		const { detail } = this.props.router.query;

		if (!detail) return '';

		const thumbnail2 = !detail.ex_info ? {} : detail.ex_info.thumbnail2;
		const flows = !!detail.ex_info ? (detail.ex_info.DynamicKV ? detail.ex_info.DynamicKV : []) : [];

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const productApplys = context.productApplys || [];

						return (
							<div className="product-detail-page">
								<div className="pro-nav">
									<Anchor className="anchor-nav" offsetTop={156}>
										<Link href="#product-introduction" title="产品介绍" />
										<Link href="#product-advantage" title="产品优势" />
										<Link href="#service-process" title="服务流程" />
									</Anchor>
								</div>
								<div className="banner">
									<img className="banner-bg-img" src={config.staticImgUrl + 'banner-bg.jpg'} />
									<div className="banner-box">
										<div className="img-box">
											<img
												className="service-bg-img"
												src={config.staticImgUrl + 'banner-icon-img.png'}
											/>
										</div>
										<div className="product-box">
											<img
												className="product-bg-img"
												src={!!thumbnail2 ? thumbnail2.url : ''}
												alt="product"
											/>
										</div>
										{/* <div className="banner-text">
											<h4>{detail.name}</h4>
											<p>{detail.title}</p>
										</div> */}
									</div>
								</div>
								<ul className="join">
									{/* <li>
										<p>
											<IconFont className="iconfont red-bg" type="icon-jinrong" />
											<span>累积支持</span>
										</p>
										<h4>{detail.sup_count || 0}个项目</h4>
									</li>
									<li>
										<p>
											<IconFont className="iconfont yellow-bg" type="icon-jinrong1" />
											<span>成功贷出</span>
										</p>
										<h4>{detail.sup_amount || 0}万元</h4>
									</li> */}
									<li>
										<p>
											<IconFont className="iconfont blue-bg" type="icon-hangyesvg" />
											<span>产品类型</span>
										</p>
										<h4>{detail.category}</h4>
									</li>
									<li>
										<p style={{fontSize: 24 }}>
											<span>{detail.name}</span>
										</p>
										<h4 style={{ fontSize: 14 }}>{detail.title}</h4>
									</li>
									<li>
										{/* <p>
								<IconFont className="iconfont green-bg" type="icon-map1" />
								<span>产品地区</span>
							</p>
							<h4>江西省</h4> */}
									</li>
									<li>
										{productApplys.find((apply) => apply.product_id === detail.id) ? (
											<a href="javascript:;" style={{ background: '#ccc' }}>
												已申请
											</a>
										) : (
											<a href="javascript:;" onClick={() => context.applyProduct(detail.id)}>
												立即申请
											</a>
										)}
									</li>
								</ul>

								<div className="product-main">
									<div className="img-box">
										<img src={!!detail.thumbnail ? detail.thumbnail.url : ''} alt="product" />
									</div>
									<div className="product-main-right">
										<div id="product-introduction" className="product-item-main product-item-one">
											<h4 className="title">产品介绍</h4>
											{!!detail.ex_info && !!detail.ex_info.richtext ? (
												<div
													dangerouslySetInnerHTML={{
														__html: detail.ex_info.richtext.html
													}}
												/>
											) : (
												''
											)}
											{/* <img src={config.staticImgUrl + "icon-img01.png"} /> */}
										</div>
										<div id="product-advantage" className="product-item-main product-item-two">
											<h4 className="title">产品优势</h4>
											{!!detail.ex_info && !!detail.ex_info.richtext2 ? (
												<div
													dangerouslySetInnerHTML={{
														__html: detail.ex_info.richtext2.html
													}}
												/>
											) : (
												''
											)}
											{/* <img src={config.staticImgUrl + "icon-img02.png"} /> */}
										</div>
									</div>
								</div>
								{/* <div id="product-introduction" className="product-item-main product-item-one">
									<h4 className="title">产品介绍</h4>
									{!!detail.ex_info && !!detail.ex_info.richtext ? (
										<div
											dangerouslySetInnerHTML={{
												__html: detail.ex_info.richtext.html
											}}
										/>
									) : (
										''
									)}
									<img src={config.staticImgUrl + 'icon-img01.png'} />
								</div>
								<div id="product-advantage" className="product-item-main product-item-two">
									<h4 className="title">产品优势</h4>
									{!!detail.ex_info && !!detail.ex_info.richtext2 ? (
										<div
											dangerouslySetInnerHTML={{
												__html: detail.ex_info.richtext2.html
											}}
										/>
									) : (
										''
									)}
									<img src={config.staticImgUrl + 'icon-img02.png'} />
								</div> */}
								<div id="service-process" className="process-box">
									<div className="title-box">
										<h4>服务流程</h4>
										<p />
									</div>
									<div className="process-list">
										{flows.map((item, index) => (
											<div className="process-item" key={index}>
												<p className="spot" />
												<p className="line">--------</p>
												<p className="text">
													{index + 1}. {item.value}
												</p>
											</div>
										))}

										{productApplys.find((apply) => apply.product_id === detail.id) ? (
											<a className="btn" href="javascript:;" disabled>
												已申请
											</a>
										) : (
											<a className="btn" onClick={() => context.applyProduct(detail.id)}>
												立即体验
											</a>
										)}
									</div>
								</div>
								{/* <div className="img-chart">
									<img
										className="service-bg-img"
										src={!!detail.thumbnail ? detail.thumbnail.url : ''}
									/>
								</div> */}
							</div>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
