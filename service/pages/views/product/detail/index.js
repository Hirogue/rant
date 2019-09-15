import React, { useEffect } from 'react';
import { withRouter } from 'next/router';
import { Spin, Anchor } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import QRCode from 'qrcode';
import IconFont from '../../../components/IconFont';
import BaseLayout from '../../../components/Layout/BaseLayout';

import './product_detail.scss';
import config from '../../../config/config';
import { createApolloClient } from "../../../lib/apollo";
import { PC_2_MOBILE_MAP } from '../../../lib/enum';
import { buildingQuery, getUrlParam, toApplayCommonHandler, asyncEffectHandler } from "../../../lib/global";
import { Q_GET_PRODUCT, M_APPLY_PRODUCTS } from '../../../gql'

const { Link } = Anchor;
const client = createApolloClient();

const defaultVariables = {
	join: [{ field: 'category' }]
};

export default withRouter((props) => {

	let { router } = props;
	let id = getUrlParam(router, 'id');
	let user = {};

	try {
		user = JSON.parse(localStorage.getItem('u_user')) || null;
	} catch (error) {
		console.info('您还未登录！');
	}

	const { loading, data: { product } } = useQuery(Q_GET_PRODUCT, {
		client: client,
		variables: {
			id,
			queryString: buildingQuery(defaultVariables)
		}
	});

	useEffect(() => {
		asyncEffectHandler(async () => {
			try {
				document.querySelector('#qrcode').src = await QRCode.toDataURL(`${PC_2_MOBILE_MAP['product']}/${id}`);
			} catch (error) {
				console.error(error.message);
			}
		})
	}, [product])

	const toShowApplyButton = (data) => (applyArray) => {
		if (data.status === 'finished') {
			return <a className="btn-finished" href="javascript:;" style={{ background: '#ccc' }}>已结束</a>;
		}
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return <a href="javascript:;" style={{ background: '#ccc' }}>已申请</a>;
		}
		return <a href="javascript:;" onClick={() => toApplayCommonHandler(router, { product: { ...data, title: data.name } }, M_APPLY_PRODUCTS)}>立即申请</a>;
	}

	const toShowApplyButtonA = (data) => (applyArray) => {
		if (data.status === 'finished') {
			return <a className="btn-finished" href="javascript:;" style={{ background: '#ccc' }}>已结束</a>;
		}
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return <a className="btn" href="javascript:;" disabled>已申请</a>;
		}
		return <a className="btn" onClick={() => toApplayCommonHandler(router, { product: { ...data, title: data.name } }, M_APPLY_PRODUCTS)}>立即体验</a>;
	}

	if (loading) return <Spin style={{ position: "fixed", top: "50%", left: "50%" }} tip="正在加载中" />;

	if (product.title) document.title = product.title;

	let flows = null;

	try {
		flows = JSON.parse(product.flows) || null;
	} catch (error) {
		console.warn('当前产品流程为空')
	}

	return (
		<BaseLayout>
			<div className="product-detail-page">
				<div className="pro-nav">
					<Anchor className="anchor-nav" offsetTop={156}>
						<Link href="#product-introduction" title="产品介绍" />
						<Link href="#product-advantage" title="产品优势" />
						<Link href="#service-process" title="服务流程" />
					</Anchor>
				</div>
				<div className="banner">
					<img className="banner-bg-img" src={'/static/img/banner-bg.jpg'} />
					<div className="banner-box">
						<div className="img-box">
							<img
								className="service-bg-img"
								src={'/static/img/banner-icon-img.png'}
							/>
						</div>
						<div className="product-box">
							<img
								className="product-bg-img"
								src={product.flowsheet}
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
						<h4>{product.category ? product.category.title : '未知'}</h4>
					</li>
					<li>
						<p style={{ fontSize: 24 }}>
							<span>{product.name}</span>
						</p>
						<h4 style={{ fontSize: 14 }}>{product.slogan}</h4>
					</li>
					<li>
						{/* <p>
								<IconFont className="iconfont green-bg" type="icon-map1" />
								<span>产品地区</span>
							</p>
							<h4>江西省</h4> */}
					</li>
					<li>
						{toShowApplyButton(product)(user ? user.apply_products : null)}
					</li>
				</ul>

				<div className="product-main">
					<div className="img-box">
						<img src={product.cover} alt="product" />
					</div>
					<div className="product-main-right">
						<div id="product-introduction" className="product-item-main product-item-one">
							<h4 className="title">产品介绍</h4>
							{product.introduction || '未填写'}
							{/* <img src={config.staticImgUrl + "icon-img01.png"} /> */}
						</div>
						<div id="product-advantage" className="product-item-main product-item-two">
							<h4 className="title">产品优势</h4>
							{product.advantage || '未填写'}
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
						{!!flows && flows.map((item, index) => (
							<div className="process-item" key={index}>
								<p className="spot" />
								<p className="line">--------</p>
								<p className="text">
									{index + 1}. {item.value}
								</p>
							</div>
						))}
						{toShowApplyButtonA(product)(user ? user.apply_products : null)}
						<div style={{ width: "150px", margin: "4vw auto 0", display: "block" }}>
							<img id="qrcode" style={{ width: "150px", height: "150px", borderRadius: '6px', display: "block" }} src={config.staticImgUrl + '移动端二维码.png'} alt='placeholder+image' />
							<p style={{ fontSize: "14px", color: "#999", textAlign: "center" }}>在移动端查看此页面</p>
						</div>
					</div>
				</div>
				{/* <div className="img-chart">
									<img
										className="service-bg-img"
										src={!!detail.thumbnail ? detail.thumbnail.url : ''}
									/>
								</div> */}

				
			</div>
		</BaseLayout>
	)
})

