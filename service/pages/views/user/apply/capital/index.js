import { useQuery } from '@apollo/react-hooks';
import { Button, Spin } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../../../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../../../components/Layout/withContext';
import StandardTable from '../../../../components/StandardTable';
import { Q_GET_APPLY_CAPITALS } from '../../../../gql';
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

	const [variables, setVariables] = useState(defaultVariables);

	const { loading, data: { queryApplyCapital: res }, refetch } = useQuery(Q_GET_APPLY_CAPITALS, {
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
			title: '名称',
			dataIndex: 'capital.title',
			render: (val, row) => <a href={`/finance/detail?id=${row.capital.id}`} target="_blank">{val}</a>
		},
		{
			title: '联系人',
			dataIndex: 'capital.creator.realname',
		},
		{
			title: '联系电话',
			dataIndex: 'capital.creator.phone',
		},
		{
			title: '申请时间',
			dataIndex: 'create_at',
			sorter: true,
			render: val => moment(val).format('YYYY-MM-DD HH:mm:ss')
		}
	]

	return (
		<UserLayout>
			<div className="fund-manage">
				<p className="right-title">
					<Button type="primary" onClick={() => jump('/finance')}>
						立即申请
 					</Button>
				</p>
				<StandardTable
					loading={loading}
					dataSource={list}
					columns={columns}
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
