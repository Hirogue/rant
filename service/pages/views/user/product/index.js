import React from 'react';
import moment from 'moment';
import { Table, Button, Badge, message } from 'antd';
import { withRouter } from 'next/router';
import UserLayout from '../../../components/Layout/UserLayout';
import { apiUpdateProductApply } from '../../../services/common';
import './service_manage.scss';

const orderStatus = [
	{ value: 'PENDING', text: '待审核', icon: <Badge status="default" text="待审核" /> },
	{ value: 'FOLLOW', text: '待跟进', icon: <Badge status="processing" text="待跟进" /> },
	{ value: 'REJECT', text: '已驳回', icon: <Badge status="error" text="已驳回" /> },
	{ value: 'OVER', text: '已审核', icon: <Badge status="success" text="已审核" /> }
];

@withRouter
export default class extends React.Component {
	columns = [
		{
			title: '服务名称',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => !!a['name'] && a['name'].localeCompare(b['name'], 'zh-Hans-CN'),
			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
			searchable: true
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (text, row, index) => orderStatus.find((item) => item.value === row.status).icon
		},

		{
			title: '服务分类',
			dataIndex: 'category',
			key: 'category',
			sorter: (a, b) => !!a['category'] && a['category'].localeCompare(b['category'], 'zh-Hans-CN'),
			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
			searchable: true
		},
		{
			title: '申请时间',
			dataIndex: 'apply_time',
			key: 'apply_time',
			sorter: (a, b) => (new Date(a['apply_time']).getTime() < new Date(b['apply_time']).getTime() ? -1 : 1),
			render: (text, row, index) => moment(text).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '操作',
			key: 'operation',
			fixed: 'right',
			width: 120,
			render: (text, row) => (
				<div className="tabs-btns">
					<Button
						type="danger"
						onClick={() =>
							this.update({
								criteria: {
									id: row.apply_id
								},
								newvalue: {
									is_reserved: true
								}
							})}
					>
						取消
					</Button>
				</div>
			)
		}
	];

	update = (payload) => {
		apiUpdateProductApply(payload)
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => message.error('操作失败！'));
	};

	render() {
		const { data } = this.props.router.query;

		return (
			<UserLayout>
				<div className="fund-manage">
					<p className="right-title">
						<Button type="primary" onClick={() => (window.location.href = '/product')}>
							立即申请
						</Button>
					</p>
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
