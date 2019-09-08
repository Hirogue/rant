import { useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Button, Spin } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../../../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../../../components/Layout/withContext';
import StandardTable from '../../../../components/StandardTable';
import { Q_GET_APPLY_PROVIDERS } from '../../../../gql';
import { buildingQuery, jump, toFetchCurrentUser } from '../../../../lib/global';
import './service_manage.scss';

export default withContext(props => {

	const ctx = useContext(GlobalContext);
	const [flag, setFlag] = useState(false);

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

	const { loading, data: { queryApplyProvider: res }, refetch } = useQuery(Q_GET_APPLY_PROVIDERS, {
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
			title: '机构logo',
			dataIndex: 'provider.logo',
			render: val => <img src={val} width="100" />
		},
		{
			title: '机构名称',
			dataIndex: 'provider.name',
			render: (val, row) => <a href={`/service/detail?id=${row.provider.id}`} target="_blank">{val}</a>
		},
		{
			title: '机构类型',
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
			title: '交换时间',
			dataIndex: 'create_at',
			sorter: true,
			render: val => moment(val).format('YYYY-MM-DD HH:mm:ss')
		},
	]

	return (
		<UserLayout>
			<div className="fund-manage">
				<p className="right-title">
					<Button type="primary" onClick={() => jump('/service')}>
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
