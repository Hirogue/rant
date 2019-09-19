import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_SEO, M_UPDATE_SEO, Q_GET_SEOS } from '@/gql';
import { buildingQuery } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Avatar, Col, message, Row, Skeleton, Switch } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { canUpdateAny, canCreateAny, canDeleteAny, canReadAny } from '@/utils/access-control';

const PATH = '/contents/seo';
const AUTH_RESOURCE = '/contents/seo/list';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'category' }],
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_SEOS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
  });

  const [updateSeo] = useMutation(M_UPDATE_SEO, {
    update: (proxy, { data }) => {
      if (data.updateSeo) {
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

  const { querySeo } = data;

  if (!querySeo) return <Skeleton loading={loading} active avatar />;

  const dataSource = querySeo.data;
  const total = querySeo.total;

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) =>
        canUpdateAny(AUTH_RESOURCE) ? <Link to={`${PATH}/detail/${row.id}`}>详情</Link> : '--',
    },
    {
      title: '路径',
      dataIndex: 'path',
      search: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      search: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      sorter: true,
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
          mutation: M_DELETE_SEO,
          variables: { ids: selectedRows.map(item => item.id).join(',') },
          update: (proxy, { data }) => {
            if (data.deleteSeo) {
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
