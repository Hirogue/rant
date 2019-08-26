import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_AUTHORITY, M_UPDATE_AUTHORITY, Q_GET_AUTHORITYS } from '@/gql';
import { buildingQuery } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Avatar, Col, message, Row, Skeleton, Switch } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [],
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_AUTHORITYS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
  });

  const [updateAuthority] = useMutation(M_UPDATE_AUTHORITY, {
    update: (proxy, { data }) => {
      if (data.updateAuthority) {
        message.success('操作成功');
        refetch();
      } else {
        message.error('操作失败');
      }
    },
  });

  useEffect(() => {
    const queryString = buildingQuery(variables);

    refetch({ queryString });
  }, [variables]);

  const { queryAuthority } = data;

  if (!queryAuthority) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryAuthority.data;
  const total = queryAuthority.total;

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) => {
        return (
          <Fragment>
            <Link to={`/rbac/authority/detail/${val}`}>详情</Link>
          </Fragment>
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      search: true,
    },
    {
      title: '值',
      dataIndex: 'value',
      search: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      render: val => (val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''),
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
    { name: '新增', icon: 'file-add', action: () => router.push('/rbac/authority/create') },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        client.mutate({
          mutation: M_DELETE_AUTHORITY,
          variables: { ids: selectedRows.map(item => item.id).join(',') },
          update: (proxy, { data }) => {
            if (data.deleteAuthority) {
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
