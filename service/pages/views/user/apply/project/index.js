import React from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';
import { Table } from 'antd';
import UserLayout from '../../../../components/Layout/UserLayout';
import './service_manage.scss';

@withRouter
export default class extends React.Component {
	columns = [
		{
			title: '项目名称',
			dataIndex: 'title',
			key: 'title',
			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
			searchable: true
		},
		{
			title: '服务商分类',
			dataIndex: 'category',
			key: 'category',
			sorter: (a, b) => !!a['category'] && a['category'].localeCompare(b['category'], 'zh-Hans-CN'),
			render: (text, row, index) => (text === 'PRJ_INVESTMENT' ? '资金' : '项目'),
			searchable: true
		},
		{
			title: '联系人',
			dataIndex: 'contacts',
			key: 'contacts',
			sorter: (a, b) => !!a['contacts'] && a['contacts'].localeCompare(b['contacts'], 'zh-Hans-CN'),
			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
			searchable: true
		},
		{
			title: '联系电话',
			dataIndex: 'phone',
			key: 'phone',
			sorter: (a, b) => !!a['phone'] && a['phone'].localeCompare(b['phone'], 'zh-Hans-CN'),
			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
			searchable: true
		},
		{
			title: '详细联系方式',
			dataIndex: 'description',
			key: 'description',
			sorter: (a, b) => !!a['description'] && a['description'].localeCompare(b['description'], 'zh-Hans-CN'),
			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
			searchable: true
		},
		{
			title: '发布时间',
			dataIndex: 'release_datetime',
			key: 'release_datetime',
			sorter: (a, b) =>
				new Date(a['release_datetime']).getTime() < new Date(b['release_datetime']).getTime() ? -1 : 1,
			render: (text, row, index) => moment(text).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '投递时间',
			dataIndex: 'apply_datetime',
			key: 'apply_datetime',
			sorter: (a, b) =>
				new Date(a['apply_datetime']).getTime() < new Date(b['apply_datetime']).getTime() ? -1 : 1,
			render: (text, row, index) => moment(text).format('YYYY-MM-DD HH:mm:ss')
		}
	];

	render() {
		const { data } = this.props.router.query;

		return (
			<UserLayout>
				<div className="fund-manage">
					<p className="right-title" />
					<Table
						columns={this.columns}
						dataSource={data}
						scroll={{ x: 1000 }}
						pagination={{ pageSize: 8, total: data.length }}
					/>
				</div>
			</UserLayout>
		);
	}
}
