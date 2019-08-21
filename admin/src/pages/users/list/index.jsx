import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_USER, Q_GET_USERS } from '@/gql';
import { buildingQuery, IdentityMaps, UserLevelMaps, UserStatusMaps } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Avatar, Col, message, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'org' }, { field: 'area' }],
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      queryString: buildingQuery(defaultVariables),
      metadataRoot: '地区',
    },
  });

  const [deleteUser] = useMutation(M_DELETE_USER, {
    update: (proxy, { data }) => {
      if (data.deleteUser) {
        message.success('删除成功');
        refetch();
      } else {
        message.error('删除失败');
      }
    },
  });

  useEffect(() => {
    const queryString = buildingQuery(variables);

    refetch({ queryString });
  }, [variables]);

  const { queryUser, orgTrees, metadataDescendantsTree } = data;

  if (!queryUser) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryUser.data;
  const total = queryUser.total;

  const columns = [
    {
      title: '详情',

      render: (val, row) => {
        return (
          <Fragment>
            <Link to={`/users/detail/${row.id}`}>详情</Link>
          </Fragment>
        );
      },
    },
    {
      title: '编号',
      dataIndex: 'id',
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
      title: '所属',
      dataIndex: 'org.id',
      render: (val, record) => (record.org ? record.org.title : ''),
      treeSelector: true,
      treeFilters: orgTrees,
    },
    {
      title: '地区',
      dataIndex: 'area.id',
      render: (val, record) => (record.area ? record.area.title : ''),
      treeSelector: true,
      treeFilters: metadataDescendantsTree || [],
    },
    {
      title: '身份',
      dataIndex: 'identity',
      render: val => IdentityMaps[val],
      filters: Object.keys(IdentityMaps).map(key => ({ text: IdentityMaps[key], value: key })),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => UserStatusMaps[val],
      filters: Object.keys(UserStatusMaps).map(key => ({ text: UserStatusMaps[key], value: key })),
    },
    {
      title: '等级',
      dataIndex: 'vip',
      render: val => UserLevelMaps[val],
      filters: Object.keys(UserLevelMaps).map(key => ({ text: UserLevelMaps[key], value: key })),
    },
    {
      title: '注册时间',
      dataIndex: 'create_at',
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
      sorter: true,
    },
    {
      title: '更新时间',
      dataIndex: 'update_at',
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
    { name: '新增', icon: 'file-add', action: () => router.push('/users/create') },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        deleteUser({ variables: { ids: selectedRows.map(item => item.id).join(',') } });
      },
      disabled: selectedRows.length <= 0,
      confirm: true,
      confirmTitle: `确定要删除吗?`,
    },
    { name: '导入', icon: 'import', action: () => refetch() },
    { name: '导出', icon: 'export', action: () => refetch() },
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
          state={variables}
          onChange={values => setVariables({ ...values })}
          onRowSelectionChange={selectedRows => setSelectedRows(selectedRows)}
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
