import React, { Component } from 'react';
import _ from 'lodash';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import TagTop from '../../components/TagTop';
import List from '../../partials/product/List';
import config from '../../config/config';
import { withRouter } from 'next/router';

import '../../partials/product/product.scss';
import GlobalContext from '../../components/context/GlobalContext';

@withRouter
export default class ProductPage extends Component {
	state = {
		category: ''
	};

	componentDidMount() {
		const { list, category } = this.props.router.query;

		this.setState((state) => ({
			...state,
			list,
			category
		}));
	}

	onChange = (category) => {
		this.setState((state) => ({
			...state,
			category
		}));
	};

	render() {
		const { list, category } = this.state;

		const newList = _.filter(list, (item) => {
			if (!!category && item.category !== category) return false;

			return item;
		});

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const { mainData } = context;

						if (!mainData) return '';

						return (
							<React.Fragment>
								<div className="product-page">
									<img className="banner-bg-img" src={config.staticImgUrl + 'product-banner.png'} />
									<BreadCrumb adrname_two={'江旅金融'} adrname_thr={'所有产品'} />
									<div className="product-list">
										<TagTop name={'江旅金融'} />
										<div className="nav">
											<p
												className={`${!category ? 'active' : ''}`}
												onClick={() => this.onChange('')}
											>
												全部
											</p>
											{mainData.products.map((item) => (
												<p
													key={item.id}
													className={`${category === item.name ? 'active' : ''}`}
													onClick={() => this.onChange(item.name)}
												>
													{item.name}
												</p>
											))}
										</div>
										<div className="product-items">
											{newList.map((item) => <List data={item} key={item.id} />)}
										</div>
										{/* <PageMod total={data.length} pageSize={pageSize} onChnage={this.onPageChange} /> */}
									</div>
								</div>
							</React.Fragment>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
