import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Anchor, Tabs, Timeline } from 'antd';
import BreadCrumb from '../../components/BreadCrumb';
import BaseLayout from '../../components/Layout/BaseLayout';
import IconFont from '../../components/IconFont';
import config from '../../config/config';
import BMap from '../../partials/AboutMap';

import './about.scss';
import GlobalContext from '../../components/context/GlobalContext';

const { Link } = Anchor; //喵点导航控件
const TabPane = Tabs.TabPane; //标签页控件

export default class AboutPage extends Component {
	render() {
		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const siteInfo = context.siteInfo || { aboutData: [] };

						const titleList = _.sortBy(_.filter(siteInfo.aboutData, (item) => item.tree_level === 3), [
							'sort'
						]);

						siteInfo.otherInfo = siteInfo.otherInfo ? siteInfo.otherInfo : ':';

						const info = _.find(siteInfo.mapLinks, (item) => item.name === '公司简介');

						console.log(siteInfo);

						return (
							<Fragment>
								<div className="about-page">
									<div className="anchor-mod">
										<Anchor offsetTop={140}>
											<Link href="#introduction-one" title="平台简介" />
											<Link href="#introduction-two" title="江旅简介" />
											<Link href="#contact" title="联系我们" />
										</Anchor>
									</div>
									<div className="about-page-box">
										<BreadCrumb adrname_two={'关于我们'} />
										<img className="about-banner" src={config.staticImgUrl + 'about-banner.png'} />
										<div id="introduction-one" className="introduce-box-one">
											<h4 className="title">平台简介</h4>
											<div className="list">
												<div className="imgbox">
													<img src={siteInfo.profileImg} />
												</div>
												{/* <ul className="join-list">
													<li>
														<h4>{siteInfo.entryCount}+</h4>
														<p>已入驻金融机构(家)</p>
													</li>
													<li>
														<h4>{siteInfo.projectCount}+</h4>
														<p>已对接项目方（个）</p>
													</li>
													<li>
														<h4>{siteInfo.amount}+</h4>
														<p>成功对接金额（亿）</p>
													</li>
													<li>
														<h4>{siteInfo.otherInfo.split(':').shift()}</h4>
														<p>{siteInfo.otherInfo.split(':').pop()}</p>
													</li>
												</ul> */}
												<div className="text" dangerouslySetInnerHTML={{
															__html: !!siteInfo.profile ? siteInfo.profile : ''
														}}>
												</div>
												{/* {!!info ? <a className="detail" href={info.link}>详情</a> : ''} */}
											</div>
											{/* <p className="text">{siteInfo.profile}</p> */}
										</div>
										<div id="introduction-two" className="introduce-box-two">
											<h4 className="title">江旅简介</h4>
											<p className="text">{siteInfo.jlProfile}</p>
											<div className="event-box">
												<Tabs defaultActiveKey="0">
													{titleList ? (
														titleList.map((item, index) => {
															return (
																<TabPane
																	tab={
																		<div>
																			<h4>{item.name}</h4>
																			<p>{item.value}</p>
																		</div>
																	}
																	key={index}
																>
																	<Timeline mode="alternate">
																		{_.sortBy(
																			_.filter(siteInfo.aboutData, (val) =>
																				val.tree_path.startsWith(
																					item.tree_path + '.'
																				)
																			),
																			[ 'sort' ]
																		).map((timeLine, index) => (
																			<Timeline.Item key={index}>
																				{timeLine.value}
																			</Timeline.Item>
																		))}
																	</Timeline>
																</TabPane>
															);
														})
													) : (
														''
													)}
												</Tabs>
											</div>
										</div>
										<div id="contact" className="contact-box">
											<h4 className="title">Contact Us</h4>
											<h5 className="sub-title">联系我们</h5>
											<div className="item-list">
												<div className="item">
													<div className="icon">
														<IconFont className="iconfont" type="icon-iphone" />
													</div>
													<p>{siteInfo.phone}</p>
												</div>
												<div className="item">
													<div className="icon">
														<IconFont className="iconfont" type="icon-youxiang1" />
													</div>
													<p>{siteInfo.email}</p>
												</div>
												<div className="item">
													<div className="icon">
														<IconFont className="iconfont" type="icon-map1" />
													</div>
													<p>{siteInfo.address}</p>
												</div>
											</div>
										</div>
									</div>
									<div className="map-mod">
										<BMap />
									</div>
									{/* <div className="service-list">
										{imglogs.map((item) => {
											return (
												<div className="service-item" key={item.id}>
													<img src={config.staticImgUrl + `${item.imgUrl}`} alt={item.alt} />
												</div>
											);
										})}
									</div> */}
								</div>
							</Fragment>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
