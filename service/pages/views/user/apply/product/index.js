import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Button, Divider, message, Spin } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../../../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../../../components/Layout/withContext';
import LogReader from '../../../../components/LogReader';
import StandardTable from '../../../../components/StandardTable';
import { M_DELETE_APPLY_PRODUCT, Q_GET_APPLY_PRODUCTS } from '../../../../gql';
import { LogTypeEnum, ProjectStatusEnum } from '../../../../lib/enum';
import { buildingQuery, jump, ProjectStatusMaps, toFetchCurrentUser } from '../../../../lib/global';
import './service_manage.scss';

export default withContext(props => {

	const client = useApolloClient();
	const ctx = useContext(GlobalContext);
	const [flag, setFlag] = useState(false);
	const [logVisible, setLogVisible] = useState(false);
	const [current, setCurrent] = useState(null);

	const defaultVariables = {
		page: 0,
		limit: 10,
		sort: [{ field: 'create_at', order: 'DESC' }],
	};

	let defaultFilter = null;
	if (ctx.user) {
		defaultFilter = [
			{ field: 'applicant.id', operator: CondOperator.EQUALS, value: ctx.user.id }
		];

		defaultVariables['filter'] = defaultFilter;
	}

	const [variables, setVariables] = useState(defaultVariables);

	const { loading, data: { queryApplyProduct: res }, refetch } = useQuery(Q_GET_APPLY_PRODUCTS, {
		notifyOnNetworkStatusChange: true,
		variables: { queryString: buildingQuery(defaultVariables) },
	});

	useEffect(() => {
		const queryString = buildingQuery(variables);
		refetch({ queryString });
	}, [variables]);

	useEffect(() => {
		(async () => {
			const currentUser = await toFetchCurrentUser();
			ctx.setCurrentUser(currentUser);
			setFlag(true);
		})();
	}, []);

	if (!flag) return <Spin style={{ position: 'fixed', top: '50%', left: '50%' }} tip="loading..." />;

	const { data: list, total } = res || {};

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
			dataIndex: 'status',
			render: val => ProjectStatusMaps[val]
		},
		{
			title: '服务分类',
			dataIndex: 'product.category.title',
		},
		{
			title: '申请时间',
			dataIndex: 'create_at',
			sorter: true,
			render: val => moment(val).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '操作',
			key: 'operation',
			render: (val, row) => (
				<>
					{ProjectStatusEnum.CHECKED !== val ?
						<>
							<a
								href="javascript:;"
								onClick={() => {
									client.mutate({
										mutation: M_DELETE_APPLY_PRODUCT,
										variables: { ids: row.id },
										update: (_, { data }) => {
											const { deleteApplyProduct } = data;

											if (deleteApplyProduct) {
												message.success('取消成功');
												refetch();
											}
										}
									})
								}}
							>
								[取消]
							</a>
							<Divider type="vertical" />
						</>
						: null}
					<a
						href="javascript:;"
						onClick={() => {
							setCurrent(row);
							setLogVisible(true);
						}}
					>
						[日志]
			   		</a>
				</>
			)
		}
	]

	return (
		<UserLayout>
			<div className="fund-manage">
				<LogReader
					title="日志"
					target={current ? current.id : null}
					type={LogTypeEnum.PRODUCT}
					visible={logVisible}
					setVisible={setLogVisible}
				/>
				<p className="right-title">
					<Button type="primary" onClick={() => jump('/product')}>
						立即申请
 					</Button>
				</p>
				<StandardTable
					loading={loading}
					dataSource={list}
					columns={columns}
					defaultFilter={defaultFilter}
					pagination={{
						size: 'small',
						total,
						current: variables.page,
						pageSize: variables.limit,
						showTotal: total => `共 ${total} 条记录`,
					}}
					state={variables}
					onChange={values => setVariables({ ...values })}
				/>
			</div>
		</UserLayout>
	)
});
