import _ from 'lodash';
import React, { Component, Fragment, Children } from 'react';
import { Anchor, Tabs, Timeline } from 'antd';
import BreadCrumb from '../../components/BreadCrumb';
import BaseLayout from '../../components/Layout/BaseLayout';
import IconFont from '../../components/IconFont';
import config from '../../config/config';
import BMap from '../../partials/AboutMap';

import './about.scss';

const { Link } = Anchor; //喵点导航控件
const TabPane = Tabs.TabPane; //标签页控件

const platform_intro = `<p>　旅游项目通（全称“江西省旅游产业项目合作通”）是江西省旅游集团牵头打造的一个集旅游项目资源、旅游投资企业、金融机构、旅游中介服务机构和旅游资产运营管理机构五位一体的旅游产业线上金融服务平台。该平台以打通五位一体对接的“最后一公里”为基础架构，服务旅游产业链。</p> <p>　一、主要版块</p> <p>　旅游项目通主要版块有选项目、找资金、江旅金融、服务商和行业资讯。</p> <p>　（一）选项目</p> <p>　选项目版块即资金方有项目投资的意愿，借助旅游项目通平台，通过对海量的旅游项目进行筛选，找到合适的项目进行……<a style=" padding-right: 5px; " href="/help/detail?id=be956262-676d-4032-83b9-84ba5a092877" target="_blank">详情</a></p>`;
const JL_intro = '　江西省旅游集团股份有限公司是具有国资背景的综合性现代旅游企业集团，于2014年12月28日正式揭牌成立。目前集团旗下拥有21家直属企业及2家二级公司，在吃、住、行、游、购、娱、养等旅游全要素消费领域展开布局。江旅集团持续整合产业链资源，在旅游全要素消费领域拥有成熟的运营实力，同时，通过自有金融平台为行业上下游企业提供综合性服务和支持。';

const titleList = [{
	name: 2019,
	value: "高质量跨越式发展",
	children: [{
		sort: 0,
		value: "1月17日，集团参与中国铁路南昌局集团混合所有制改革，受让南昌铁路旅游有限公司49%股权。"
	}, {
		sort: 1,
		value: "1月16日，集团完成上市公司国旅联合收购，成为上市公司控股股东。"
	}]
}, {
	name: 2018,
	value: "新的征程",
	children: [{
		sort: 0,
		value: "11月2日，江西润田实业股份有限公司A股IPO工作正式启动。"
	}, {
		sort: 1,
		value: "9月10日，股东会决议批准集团正式启动股份制改造及第二轮引战工作"
	}, {
		sort: 2,
		value: "8 月 13 日，江西省国有资产监督管理委员会批准同意集团收购上市公司国旅联合（600358）。"
	}, {
		sort: 3,
		value: "8 月 8 日，股东会决议批准集团正式启动 H 股 IPO。"
	}, {
		sort: 4,
		value: "7 月 16 日 ，上海证券交易所批复同意集团向合格投资者非公开发行 20 亿公司债券。"
	}]
}, {
	name: 2017,
	value: "成型",
	children: [{
		sort: 0,
		value: "10 月 25 日，省事改办批复出台关于江西宾馆、江西饭店、赣江宾馆等经营类事业单位转企改制的指导意见。"
	}, {
		sort: 1,
		value: "5 月 26 日，中国共产党江西省旅游集团有限责任公司第一次代表大会在江西赣江宾馆召开，选举产生集团公司党委、纪委。"
	}, {
		sort: 2,
		value: "4 月 12 日，集团混合所有制改革后的第一次股东会、董事会、监事会在井冈山召开，选举产生了集团公司董事会、监事会，聘任了经营高管团队。"
	}, {
		sort: 3,
		value: "1 月 12 日，省政府就武功山经营管理体制改革问题下发《江西省人民政府关于印发武功山管理体制改革方案的通知》（赣府发〔2017〕1 号）， 明确了集团在武功山整合开发中的重要职责与作用。"
	}, {
		sort: 4,
		value: "1 月 6 日，江西省旅游集团举行混合所有制改革引进战略投资者签约仪式，与阳光保险集团、建银国际、上海积厚资本三家战略投资者代表正式签约， 进行增资扩股及股权转让。"
	}]
}, {
	name: 2016,
	value: "初创",
	children: [{
		sort: 0,
		value: "10 月 25 日，“江西省旅游集团有限责任公司增资及股权转让项目”在省产交所公开挂牌。"
	}, {
		sort: 1,
		value: "10 月12 日，根据2016 年8 月国家出台的《关于印发< 关于国有控股混合所有制企业开展员工持股试点的意见> 的通知》( 国资发改革[2016]133 号 ) 文件要求，省政府批复原则同意将省政府出资的江西省旅游集团有限责任公司的国有产权，无偿划转给江西省省属国有企业资产经营（控股）有限公司，使集团成为混改新政策的适格主体。"
	}, {
		sort: 2,
		value: "9 月 14 日，省长刘奇同志对省旅游集团混改工作做出重要批示，实质性推动了集团的混合所有制改革。"
	}]
}]

export default (props) => {

	return (
		<BaseLayout>
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
								<img src={config.staticImgUrl + 'about.png'} />
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
							<div className="text" dangerouslySetInnerHTML={{ __html: platform_intro }} />
							{/* {!!info ? <a className="detail" href={info.link}>详情</a> : ''} */}
						</div>
						{/* <p className="text">{siteInfo.profile}</p> */}
					</div>
					<div id="introduction-two" className="introduce-box-two">
						<h4 className="title">江旅简介</h4>
						<p className="text">{JL_intro}</p>
						<div className="event-box">
							<Tabs defaultActiveKey="0">
								{titleList ? (
									titleList.map(item => {
										return (
											<TabPane
												tab={
													<div>
														<h4>{item.name}</h4>
														<p>{item.value}</p>
													</div>
												}
												key={item.name}
											>
												<Timeline mode="alternate">
													{item.children.sort((a,b) => a.sort - b.sort).map(timeLine => (
														<Timeline.Item key={timeLine.value}>
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
								<p>0791-87705085</p>
							</div>
							<div className="item">
								<div className="icon">
									<IconFont className="iconfont" type="icon-youxiang1" />
								</div>
								<p>lvyoto@163.com</p>
							</div>
							<div className="item">
								<div className="icon">
									<IconFont className="iconfont" type="icon-map1" />
								</div>
								<p>江西省南昌市红谷滩学府大道1号34栋6楼</p>
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
		</BaseLayout>
	)
}

