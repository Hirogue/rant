import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import { Spin } from 'antd';
import { withRouter } from 'next/router';
import { CondOperator } from '@nestjsx/crud-request';
import { useQuery } from '@apollo/react-hooks';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import TagTop from '../../components/TagTop';
import List from '../../partials/product/List';
import config from '../../config/config';

import { createApolloClient } from "../../lib/apollo";
import { buildingQuery, getUrlParam, toApplayCommonHandler } from "../../lib/global";
import { Q_GET_PRODUCTS } from '../../gql'
import '../../partials/product/product.scss';

const client = createApolloClient();

const defaultVariables = {
	page: 1,
	limit: 1000,
	join: [{ field: "category" }],
	filter: [{ field: 'is_published', operator: CondOperator.EQUALS, value: true }],
	sort: [{ field: 'create_at', order: 'DESC' }],
}

export default withRouter((props) => {

	const { router } = props;
	const [ category, setCategory ] = useState(getUrlParam(router, 'category') || '')
	

	const { loading, data: { queryProduct, productCategoryTrees } } = useQuery(Q_GET_PRODUCTS, {
		client: client,
		variables: {
			queryString: buildingQuery(defaultVariables)
		},
	});

	useEffect(() => {
		if (category) document.title = category + "-旅游项目通";
	}, [])

	const onChange = (nextCategory) => () => {
		if (nextCategory === '旅游产业投资基金') {
			window.location.href = '/news/detail?id=dfba0ee3-fea2-4af1-8cde-de74f8b5f61a';
		} else if (nextCategory === '策略投资') {
			window.location.href = '/news/detail?id=32ea9776-250e-420d-9fbd-6bdff649e1dd';
		} else {
			window.history.pushState({}, '', `${window.location.pathname}?category=${nextCategory}`)
			setCategory(nextCategory);
		}
	};

	return (
		<BaseLayout>
			<div className="product-page">
				<img className="banner-bg-img" src={config.staticImgUrl + 'product-banner.png'} />
				<BreadCrumb adrname_two={'江旅金融'} adrname_thr={'所有产品'} />
				<div className="product-list">
					<TagTop name={'江旅金融'} />
					{loading ? (
						<Spin style={{ position: "fixed", top: "50%", left: "50%" }} tip="正在加载中" />
					) : (
						<Fragment>
							<div className="nav">
								<p className={`${!category ? 'active' : ''}`} onClick={onChange('')}>全部</p>
								{!!productCategoryTrees && productCategoryTrees.map((item) => (
									<p
										key={item.id}
										className={`${category === item.title ? 'active' : ''}`}
										onClick={onChange(item.title)}
									>
										{item.title}
									</p>
								))}
							</div>
							<div className="product-items">
								{queryProduct && queryProduct.data.filter(item => !category || item.category.title === category).map((item) => <List data={item} key={item.id} />)}
							</div>
						</Fragment>
					)}
					
					{/* <PageMod total={data.length} pageSize={pageSize} onChnage={this.onPageChange} /> */}
				</div>
			</div>
		</BaseLayout>
	)
})

