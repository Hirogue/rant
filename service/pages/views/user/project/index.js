import React from 'react';
import moment from 'moment';
import { Table, Button, Badge, message } from 'antd';
import { withRouter } from 'next/router';
import UserLayout from '../../../components/Layout/UserLayout';
import { apiUpdateProject } from '../../../services/common';
import './project_manage.scss';

const orderStatus = [
	{ value: 'PENDING', text: '待审核', icon: <Badge status="default" text="待审核" /> },
	{ value: 'FOLLOW', text: '待跟进', icon: <Badge status="processing" text="待跟进" /> },
	{ value: 'REJECT', text: '已驳回', icon: <Badge status="error" text="已驳回" /> },
	{ value: 'OVER', text: '已审核', icon: <Badge status="success" text="已审核" /> }
];

@withRouter
export default class extends React.Component {
	state = {
		data: []
	};

	columns = [
		{
			title: '标题',
			width: 150,
			dataIndex: 'title',
			key: 'title'
			// fixed: 'left'
		},
		{
			title: '状态',
			// fixed: 'left',
			dataIndex: 'status',
			key: 'status',
			render: (text, row, index) => orderStatus.find((item) => item.value === row.status).icon
		},
		// {
		// 	title: '融资方式',
		// 	dataIndex: 'project_mode',
		// 	key: 'project_mode',
		// 	sorter: (a, b) => !!a['project_mode'] && a['project_mode'].localeCompare(b['project_mode'], 'zh-Hans-CN'),
		// 	render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
		// 	searchable: true
		// },
		// {
		// 	title: '项目阶段',
		// 	dataIndex: 'project_state',
		// 	key: 'project_state',
		// 	sorter: (a, b) =>
		// 		!!a['project_state'] && a['project_state'].localeCompare(b['project_state'], 'zh-Hans-CN'),
		// 	render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
		// 	searchable: true
		// },
		// {
		// 	title: '金额',
		// 	dataIndex: 'capital_amount',
		// 	key: 'capital_amount',
		// 	sorter: (a, b) =>
		// 		!!a['capital_amount'] && a['capital_amount'].localeCompare(b['capital_amount'], 'zh-Hans-CN'),
		// 	render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
		// 	searchable: true
		// },
		// {
		// 	title: '所在地区',
		// 	dataIndex: 'area',
		// 	key: 'area',
		// 	sorter: (a, b) => !!a['area'] && a['area'].localeCompare(b['area'], 'zh-Hans-CN'),
		// 	render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
		// 	searchable: true
		// },
		// {
		// 	title: '行业',
		// 	dataIndex: 'industry',
		// 	key: 'industry',
		// 	sorter: (a, b) => !!a['industry'] && a['industry'].localeCompare(b['industry'], 'zh-Hans-CN'),
		// 	render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
		// 	searchable: true
		// },
		{
			title: '发布时间',
			dataIndex: 'release_datetime',
			key: 'release_datetime',
			sorter: (a, b) =>
				new Date(a['release_datetime']).getTime() < new Date(b['release_datetime']).getTime() ? -1 : 1,
			render: (text, row, index) => moment(text).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '操作',
			key: 'operation',
			fixed: 'right',
			width: 120,
			render: (text, row) => (
				<div className="tabs-btns">
					<a as={`/user/publish/project/${row.id}`} href={`/user/publish/project?id=${row.id}`}>
						<Button>编辑</Button>
					</a>
					<Button
						type="danger"
						onClick={() =>
							this.update({
								criteria: {
									id: row.id
								},
								newvalue: {
									is_reserved: true
								}
							})}
					>
						删除
					</Button>
				</div>
			)
		}
	];

	update = (payload) => {
		apiUpdateProject(payload)
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
						<Button type="primary" onClick={() => (window.location.href = '/user/publish/project')}>
							发布
						</Button>
					</p>
					<Table
						columns={this.columns}
						dataSource={data}
						scroll={{ x: 1200 }}
						pagination={{ pageSize: 8, total: data.length }}
					/>
				</div>
			</UserLayout>
		);
	}
}
