import React from 'react';
import { withRouter } from 'next/router';
import { toApplayCommonHandler } from '../../../lib/global';
import { M_APPLY_PRODUCTS } from '../../../gql';

import './product_item.scss';

export default withRouter(({ data, router }) => {

	let user = {};

	try {
		user = JSON.parse(localStorage.getItem('u_user')) || null;
	} catch (error) {
		user = {};
		console.info('您还未登录！');
	}

	const toShowApplyButton = (data) => (applyArray) => {
		if (data.status === 'finished') {
			return <a className="btn" href="javascript:;" style={{ background: '#ccc' }}>已结束</a>
		}
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return <a className="btn-a" style={{ background: '#ccc' }}>已申请</a>
		}
		return (
			<a className="btn-a" onClick={() => toApplayCommonHandler(router, { product: { ...data, title: data.name } }, M_APPLY_PRODUCTS)}>立即申请</a>
		)
	}

	let flows = null;
	try {
		flows = JSON.parse(data.flows) || null;
	} catch (error) {
		console.warn('产品流程为空')
	}

	return (
		<div>
			<div className="product-item">
				<a
					className="img-link"
					as={`/product/detail/${data.id}`}
					href={`/product/detail?id=${data.id}`}
					target="_blank"
				>
					<img src={data.cover} />
				</a>
				<div className="product-text">
					<h4 className="title">{data.name}</h4>
					<p className="text-p">
						{/* {data.category} <br />
										<br /> */}
						{data.introduction}
					</p>
					<ul className="list">
						{flows && flows.map((item, index) => (
							<li key={index}>
								{index + 1}. {item.value}
							</li>
						))}
					</ul>
					<p className="btns">
						{toShowApplyButton(data)(user && user.apply_capitals)}
						<a
							className="btn-a"
							as={`/product/detail/${data.id}`}
							href={`/product/detail?id=${data.id}`}
							target="_blank"
						>
							查看详情
						</a>
					</p>
				</div>
			</div>
		</div>
	)
})
