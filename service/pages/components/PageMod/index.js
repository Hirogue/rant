import React, { Component } from 'react';
import { Pagination, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import './page_mod.scss';

export default class PageMod extends Component {
	render() {
		const { total, pageSize, onChnage } = this.props;

		return (
			<div className="page-mod">
				<LocaleProvider locale={zhCN}>
					<Pagination
						className="page-ui"
						showQuickJumper
						pageSize={pageSize || 10}
						defaultCurrent={1}
						total={total}
						onChange={onChnage}
					/>
				</LocaleProvider>
			</div>
		);
	}
}
