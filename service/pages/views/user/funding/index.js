import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Button, Spin } from 'antd';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../../components/Layout/withContext';
import StandardTable from '../../../components/StandardTable';
import { Q_GET_APPLY_CAPITALS } from '../../../gql';
import { buildingQuery, jump, toFetchCurrentUser } from '../../../lib/global';
import './fund_manage.scss';

export const M_APPROVAL_CAPITAL = gql`
  mutation approvalCapital($data: CapitalInput!) {
    approvalCapital(data: $data)
  }
`;

export default withContext(props => {

	const client = useApolloClient();
	const ctx = useContext(GlobalContext);
	const [flag, setFlag] = useState(false);
	const [finishedVisible, setFinishedVisible] = useState(false);
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
			{ field: 'creator.id', operator: CondOperator.EQUALS, value: ctx.user.id }
		];

		defaultVariables['filter'] = defaultFilter;
	}

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
			render: (val, row) => <a href={`/user/publish/finance?id=${row.capital.id}`}>{val}</a>
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
		},
		{
			title: '操作',
			key: 'operation',
			render: (val, row) => (
				<>
					{ProjectStatusEnum.FINISHED !== row.status ?
						<>
							<a
								href="javascript:;"
								onClick={() => {
									setCurrent(row);
									setFinishedVisible(true);
								}}
							>
								[完成]
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
	];

	return (
		<UserLayout>
			<div className="fund-manage">
				<StandardConfirm
					title="请输入完成总结"
					visible={finishedVisible}
					setVisible={setFinishedVisible}
					onConfirm={reason => {
						client.mutate({
							mutation: M_APPROVAL_CAPITAL,
							variables: {
								data: {
									id: current.id,
									status: ProjectStatusEnum.FINISHED,
									reason,
								},
							},
							update: (proxy, { data }) => {
								if (data.approvalProject) {
									message.success('操作成功');
									refetch();
								}
							},
						});
					}}
				/>
				<LogReader
					title="日志"
					target={current ? current.id : null}
					type={LogTypeEnum.PROJECT}
					visible={logVisible}
					setVisible={setLogVisible}
				/>
				<p className="right-title">
					<Button type="primary" onClick={() => jump('/user/publish/finance')}>
						立即发布
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
