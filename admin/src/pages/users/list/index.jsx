import StandardActions from '@/components/StandardActions';
import StandardConfirm from '@/components/StandardConfirm';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_USER, Q_GET_USERS } from '@/gql';
import { UserStatusEnum } from '@/utils/enum';
import {
  buildingQuery,
  IdentityMaps,
  UserLevelMaps,
  UserStatusMaps,
  UserTypeMaps,
} from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { Affix, Avatar, Col, Divider, message, Popconfirm, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { M_ADMIN_APPROVAL } from '../gql';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'org' }, { field: 'area' }],
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      queryString: buildingQuery(defaultVariables),
      metadataRoot: '地区',
    },
  });

  useEffect(() => {
    const queryString = buildingQuery(variables);

    refetch({ queryString });
  }, [variables]);

  const { queryUser, orgTrees, metadataDescendantsTree } = data;

  if (!queryUser) return <Skeleton loading={loading} active avatar />;

  const renderActions = record => {
    if (UserStatusEnum.PENDING === record.status) {
      return (
        <Fragment>
          <Popconfirm
            title="确定要审核吗?"
            onConfirm={() => {
              client.mutate({
                mutation: M_ADMIN_APPROVAL,
                variables: {
                  data: {
                    user: {
                      id: record.id,
                      status: UserStatusEnum.CHECKED,
                    },
                  },
                },
                update: (cache, { data }) => {
                  if (data.adminApproval) {
                    message.success('操作成功');
                    refetch();
                  }
                },
              });
            }}
          >
            <a href="#">[审核]</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => setVisible(true)}>
            [驳回]
          </a>
          <StandardConfirm
            title="请输入驳回理由"
            visible={visible}
            setVisible={setVisible}
            onConfirm={reason => {
              client.mutate({
                mutation: M_ADMIN_APPROVAL,
                variables: {
                  data: {
                    user: {
                      id: record.id,
                      status: UserStatusEnum.REJECTED,
                      reason,
                    },
                  },
                },
                update: (proxy, { data }) => {
                  if (data.adminApproval) {
                    message.success('操作成功');
                    refetch();
                  }
                },
              });
            }}
          />
        </Fragment>
      );
    } else {
      return null;
    }
  };

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
      search: true,
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
      title: '类型',
      dataIndex: 'type',
      render: val => UserTypeMaps[val],
      filters: Object.keys(UserTypeMaps).map(key => ({ text: UserTypeMaps[key], value: key })),
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
      title: '操作',
      render: (val, record) => renderActions(record),
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
        client.mutate({
          mutation: M_DELETE_USER,
          variables: { ids: selectedRows.map(item => item.id).join(',') },
          update: (proxy, { data }) => {
            if (data.deleteUser) {
              message.success('操删除成功');
              refetch();
            }
          },
        });
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
