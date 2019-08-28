import React, { Component } from 'react';

import './product_item.scss';

import GlobalContext from '../../../components/context/GlobalContext';

export default class List extends Component {
	render() {
		const { data } = this.props;
		const flows = !!data.ex_info ? (data.ex_info.DynamicKV ? data.ex_info.DynamicKV : []) : [];
		const introduce = !!data.ex_info ? (data.ex_info.richtext ? data.ex_info.richtext.html : '') : '';
		const plainText = !!introduce ? introduce.replace(new RegExp('<.+?>', 'g'), '') : '';
		const subtitle = plainText.length >= 60 ? plainText.substr(0, 60) + '...' : plainText;

		return (
			<GlobalContext.Consumer>
				{(context) => {
					const productApplys = context.productApplys || [];

					return (
						<div>
							<div className="product-item">
								<a
									className="img-link"
									as={`/product/detail/${data.id}`}
									href={`/product/detail?id=${data.id}`}
									target="_blank"
								>
									<img src={!!data.thumbnail ? data.thumbnail.url : ''} />
								</a>
								<div className="product-text">
									<h4 className="title">{data.name}</h4>
									<p className="text-p">
										{/* {data.category} <br />
										<br /> */}
										{subtitle}
									</p>
									<ul className="list">
										{flows.map((item, index) => (
											<li key={index}>
												{index + 1}. {item.value}
											</li>
										))}
									</ul>
									<p className="btns">
										{productApplys.find((apply) => apply.product_id === data.id) ? (
											<a className="btn-a" style={{ background: '#ccc' }}>
												已申请
											</a>
										) : (
											<a className="btn-a" onClick={() => context.applyProduct(data.id)}>
												立即申请
											</a>
										)}
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
					);
				}}
			</GlobalContext.Consumer>
		);
	}
}
