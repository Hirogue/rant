import { Button, Table, Spin, message } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../../components/Layout/withContext';
import { jump, toFetchCurrentUser, ProjectStatusMaps, reload } from '../../../lib/global';
import './service_manage.scss';
import { useApolloClient } from '@apollo/react-hooks';
import { M_DELETE_APPLY_PRODUCT } from '../../../gql';

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

	const { apply_products: list } = user;

	console.log(user);

	const columns = [
		{
			title: '服务名称',
			dataIndex: 'product.name',
			render: (val, row) => <a href={`/product/detail?id=${row.product.id}`} target="_blank">{val}</a>
		},
		{
			title: '封面',
			dataIndex: 'product.cover',
			render: val => <img src={val} width="100" />
		},
		{
			title: '状态',
			dataIndex: 'product.status',
			render: val => ProjectStatusMaps[val]
		},
		{
			title: '服务分类',
			dataIndex: 'product.category.title',
		},
		{
			title: '申请时间',
			dataIndex: 'create_at',
			sorter: (a, b) => (new Date(a['create_at']).getTime() < new Date(b['create_at']).getTime() ? -1 : 1),
			render: (text, row, index) => moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '操作',
			key: 'operation',
			render: (text, row) => (
				<Button
					type="danger"
					onClick={() => {
						client.mutate({
							mutation: M_DELETE_APPLY_PRODUCT,
							variables: { ids: row.id },
							update: (_, { data }) => {
								const { deleteApplyProduct } = data;

								if (deleteApplyProduct) {
									message.success('取消成功');
									reload(1000);
								}
							}
						})
					}}
				>
					取消
		 		</Button>
			)
		}
	]

	return (
		<UserLayout>
			<div className="fund-manage">
				<p className="right-title">
					<Button type="primary" onClick={() => jump('/product')}>
						立即申请
 					</Button>
				</p>
				<Table
					rowKey="id"
					columns={columns}
					dataSource={list}
					pagination={{ pageSize: 10, total: list.length }}
				/>
			</div>
		</UserLayout>
	)
});

// import { withRouter } from 'next/router';
// import { apiUpdateProductApply } from '../../../services/common';


// const orderStatus = [
// 	{ value: 'PENDING', text: '待审核', icon: <Badge status="default" text="待审核" /> },
// 	{ value: 'FOLLOW', text: '待跟进', icon: <Badge status="processing" text="待跟进" /> },
// 	{ value: 'REJECT', text: '已驳回', icon: <Badge status="error" text="已驳回" /> },
// 	{ value: 'OVER', text: '已审核', icon: <Badge status="success" text="已审核" /> }
// ];

// @withRouter
// export default class extends React.Component {
// 	columns = [
// 		{
// 			title: '服务名称',
// 			dataIndex: 'name',
// 			key: 'name',
// 			sorter: (a, b) => !!a['name'] && a['name'].localeCompare(b['name'], 'zh-Hans-CN'),
// 			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
// 			searchable: true
// 		},
// 		{
// 			title: '状态',
// 			dataIndex: 'status',
// 			key: 'status',
// 			render: (text, row, index) => orderStatus.find((item) => item.value === row.status).icon
// 		},

// 		{
// 			title: '服务分类',
// 			dataIndex: 'category',
// 			key: 'category',
// 			sorter: (a, b) => !!a['category'] && a['category'].localeCompare(b['category'], 'zh-Hans-CN'),
// 			render: (text, row, index) => (!!text ? text.split(':').pop() : ''),
// 			searchable: true
// 		},
// 		{
// 			title: '申请时间',
// 			dataIndex: 'apply_time',
// 			key: 'apply_time',
// 			sorter: (a, b) => (new Date(a['apply_time']).getTime() < new Date(b['apply_time']).getTime() ? -1 : 1),
// 			render: (text, row, index) => moment(text).format('YYYY-MM-DD HH:mm:ss')
// 		},
// 		{
// 			title: '操作',
// 			key: 'operation',
// 			fixed: 'right',
// 			width: 120,
// 			render: (text, row) => (
// 				<div className="tabs-btns">
// 					<Button
// 						type="danger"
// 						onClick={() =>
// 							this.update({
// 								criteria: {
// 									id: row.apply_id
// 								},
// 								newvalue: {
// 									is_reserved: true
// 								}
// 							})}
// 					>
// 						取消
// 					</Button>
// 				</div>
// 			)
// 		}
// 	];

// 	update = (payload) => {
// 		apiUpdateProductApply(payload)
// 			.then((res) => {
// 				window.location.reload();
// 			})
// 			.catch((err) => message.error('操作失败！'));
// 	};

// 	render() {
// 		const { data } = this.props.router.query;

// 		return (
// 			<UserLayout>
// 				<div className="fund-manage">
// 					<p className="right-title">
// 						<Button type="primary" onClick={() => (window.location.href = '/product')}>
// 							立即申请
// 						</Button>
// 					</p>
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
