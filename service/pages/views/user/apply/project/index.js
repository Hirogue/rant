import { useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Button, Spin } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../../../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../../../components/Layout/withContext';
import StandardTable from '../../../../components/StandardTable';
import { Q_GET_APPLY_PROJECTS } from '../../../../gql';
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

	const { loading, data: { queryApplyProject: res }, refetch } = useQuery(Q_GET_APPLY_PROJECTS, {
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
			dataIndex: 'project.cover',
			render: val => <img src={val} width="100" />
		},
		{
			title: '名称',
			dataIndex: 'project.title',
			render: (val, row) => <a href={`/project/detail?id=${row.project.id}`} target="_blank">{val}</a>
		},
		{
			title: '联系人',
			dataIndex: 'project.creator.realname',
		},
		{
			title: '联系电话',
			dataIndex: 'project.creator.phone',
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
					<Button type="primary" onClick={() => jump('/project')}>
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
