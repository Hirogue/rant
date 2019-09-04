import React, { Component } from 'react';
import { Pagination, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import './page_mod.scss';

export default ({ total, current, pageSize, onChange }) => {

	return (
		<div className="page-mod">
			<LocaleProvider locale={zhCN}>
				<Pagination
					className="page-ui"
					showQuickJumper
					current={current}
					pageSize={pageSize || 10}
					defaultCurrent={1}
					total={total}
					onChange={onChange}
				/>
			</LocaleProvider>
		</div>
	);
}
