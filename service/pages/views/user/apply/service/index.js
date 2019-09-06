import { Button, Table, Spin, message } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../../../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../../../components/Layout/withContext';
import { jump, toFetchCurrentUser, ProjectStatusMaps, reload } from '../../../../lib/global';
import './service_manage.scss';
import { useApolloClient } from '@apollo/react-hooks';
import { M_DELETE_APPLY_PRODUCT } from '../../../../gql';

export default withContext(props => {

	const client = useApolloClient();
	const ctx = useContext(GlobalContext);
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		(async () => {
			const currentUser = await toFetchCurrentUser();
			ctx.setCurrentUser(currentUser);

			setFlag(true);
		})();
	}, []);

	if (!flag) return <Spin style={{ position: 'fixed', top: '50%', left: '50%' }} tip="loading..." />;

	const user = ctx.user;

	const { apply_providers: list } = user;

	const columns = [
		{
			title: '封面',
			dataIndex: 'provider.logo',
			render: val => <img src={val} width="100" />
		},
		{
			title: '机构名称',
			dataIndex: 'provider.name',
			render: (val, row) => <a href={`/service/detail?id=${row.provider.id}`} target="_blank">{val}</a>
		},
		{
			title: '机构分类',
			dataIndex: 'provider.category.title',
		},
		{
			title: '联系人',
			dataIndex: 'provider.creator.realname',
		},
		{
			title: '联系电话',
			dataIndex: 'provider.creator.phone',
		},
		{
			title: '申请时间',
			dataIndex: 'create_at',
			sorter: (a, b) => (new Date(a['create_at']).getTime() < new Date(b['create_at']).getTime() ? -1 : 1),
			render: (text, row, index) => moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')
		}
	]

	return (
		<UserLayout>
			<div className="fund-manage">
				<p className="right-title">
					<Button type="primary" onClick={() => jump('/service')}>
						立即申请
 					</Button>
				</p>
				<Table
					rowKey="id"
					size="small"
					columns={columns}
					dataSource={list}
					pagination={{ pageSize: 10, total: list.length }}
				/>
			</div>
		</UserLayout>
	)
});


// import React from 'react';
// import moment from 'moment';
// import { withRouter } from 'next/router';
// import { Table } from 'antd';
// import UserLayout from '../../../../components/Layout/UserLayout';
// import './service_manage.scss';

// @withRouter
// export default class extends React.Component {
// 	columns = [
// 		{
// 			title: '服务商名称',
// 			dataIndex: 'name',
// 			key: 'name',
// 			sorter: (a, b) => !!a['name'] && a['name'].localeCompare(b['name'], 'zh-Hans-CN'),
// 			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
// 			searchable: true
// 		},
// 		{
// 			title: '服务商分类',
// 			dataIndex: 'category',
// 			key: 'category',
// 			sorter: (a, b) => !!a['category'] && a['category'].localeCompare(b['category'], 'zh-Hans-CN'),
// 			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
// 			searchable: true
// 		},
// 		{
// 			title: '联系人',
// 			dataIndex: 'contacts',
// 			key: 'contacts',
// 			sorter: (a, b) => !!a['contacts'] && a['contacts'].localeCompare(b['contacts'], 'zh-Hans-CN'),
// 			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
// 			searchable: true
// 		},
// 		{
// 			title: '联系电话',
// 			dataIndex: 'phone',
// 			key: 'phone',
// 			sorter: (a, b) => !!a['phone'] && a['phone'].localeCompare(b['phone'], 'zh-Hans-CN'),
// 			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
// 			searchable: true
// 		},
// 		{
// 			title: '交换时间',
// 			dataIndex: 'apply_datetime',
// 			key: 'apply_datetime',
// 			sorter: (a, b) => (new Date(a['apply_datetime']).getTime() < new Date(b['apply_datetime']).getTime() ? -1 : 1),
// 			render: (text, row, index) => moment(text).format('YYYY-MM-DD HH:mm:ss')
// 		}
// 	];

// 	render() {
// 		const { data } = this.props.router.query;

// 		return (
// 			<UserLayout>
// 				<div className="fund-manage">
// 					<p className="right-title" />
// 					<Table
// 						columns={this.columns}
// 						dataSource={data}
// 						scroll={{ x: 1000 }}
// 						pagination={{ pageSize: 8, total: data.length }}
// 					/>
// 				</div>
// 			</UserLayout>
// 		);
// 	}
// }
