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

	const columns = [
		{
			title: '封面',
			dataIndex: 'product.cover',
			render: val => <img src={val} width="100" />
		},
		{
			title: '服务名称',
			dataIndex: 'product.name',
			render: (val, row) => <a href={`/product/detail?id=${row.product.id}`} target="_blank">{val}</a>
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
					size="small"
					columns={columns}
					dataSource={list}
					pagination={{ pageSize: 10, total: list.length }}
				/>
			</div>
		</UserLayout>
	)
});
