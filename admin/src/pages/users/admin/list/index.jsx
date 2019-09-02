import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_USER, Q_GET_USERS } from '@/gql';
import { canCreateAny, canDeleteAny, canReadAny, canUpdateAny } from '@/utils/access-control';
import { IdentityEnum } from '@/utils/enum';
import { buildingQuery, filterOrg, paramsAuth } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Affix, Avatar, Col, message, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';

const PATH = '/users/admin';
const AUTH_RESOURCE = '/user/admin';

export default () => {
  const defaultFilter = [
    { field: 'identity', operator: CondOperator.EQUALS, value: IdentityEnum.USER },
  ];
  const defaultVariables = {
    page: 0,
    limit: 10,
    filter: defaultFilter,
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      queryString: buildingQuery(paramsAuth(AUTH_RESOURCE, defaultVariables, defaultFilter)),
    },
  });

  useEffect(() => {
    const queryString = buildingQuery(paramsAuth(AUTH_RESOURCE, variables, defaultFilter));

    refetch({ queryString });
  }, [variables]);

  const { queryUser = {}, roles = [] } = data;

  const dataSource = queryUser.data;
  const total = queryUser.total;

  const columns = [
    {
      title: '详情',
      render: (val, row) =>
        canUpdateAny(AUTH_RESOURCE) ? <Link to={`${PATH}/detail/${row.id}`}>详情</Link> : '--',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: val => <Avatar src={val} />,
    },
    {
      title: '账户',
      dataIndex: 'account',
      search: true,
    },
    {
      title: '姓名',
      dataIndex: 'realname',
      search: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      search: true,
    },
    {
      title: '部门',
      dataIndex: 'org.id',
      render: (val, record) => (record.org ? record.org.title : ''),
      treeSelector: true,
      treeFilters: filterOrg(AUTH_RESOURCE),
    },
    {
      title: '角色',
      dataIndex: 'role.id',
      render: (val, record) => {
        if (record.isSuperAdmin) {
          return '超级管理员';
        } else {
          return record.role ? record.role.name : '';
        }
      },
      treeSelector: true,
      treeNodeFilterProp: 'name',
      treeNodeLabelProp: 'name',
      treeFilters: roles.map(item => ({ title: item.name, ...item })),
    },
    {
      title: '注册时间',
      dataIndex: 'create_at',
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
      sorter: true,
    },
  ];

  const pagination = {
    size: 'small',
    total,
    current: variables.page,
    pageSize: variables.limit,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条记录`,
  };

  const actions = [
    { name: '刷新', icon: 'reload', action: () => refetch() },
    {
      name: '新增',
      icon: 'file-add',
      action: () => router.push(`${PATH}/create`),
      hide: !canCreateAny(AUTH_RESOURCE),
    },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        client.mutate({
          mutation: M_DELETE_USER,
          variables: { ids: selectedRows.map(item => item.id).join(',') },
          update: (proxy, { data }) => {
            if (data.deleteUser) {
              message.success('删除成功');
              refetch();
            }
          },
        });
      },
      disabled: selectedRows.length <= 0,
      hide: !canDeleteAny(AUTH_RESOURCE),
      confirm: true,
      confirmTitle: `确定要删除吗?`,
    },
    {
      name: '导入',
      icon: 'import',
      action: () => refetch(),
      hide: !canCreateAny(AUTH_RESOURCE),
    },
    { name: '导出', icon: 'export', action: () => refetch(), hide: !canReadAny(AUTH_RESOURCE) },
  ];

  return (
    <Fragment>
      <PageHeaderWrapper>
        <StandardRow>
          <Row gutter={16}>
            <Col lg={6}>
              <Affix style={{ display: 'inline-block' }} offsetTop={80}>
                <StandardActions actions={actions} />
              </Affix>
            </Col>
          </Row>
        </StandardRow>

        <StandardTable
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          defaultFilter={defaultFilter}
          state={variables}
          onChange={values => setVariables({ ...values })}
          onRowSelectionChange={selectedRows => setSelectedRows(selectedRows)}
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
