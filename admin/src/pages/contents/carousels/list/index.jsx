import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_CAROUSEL, M_UPDATE_CAROUSEL, Q_GET_CAROUSELS } from '@/gql';
import { canCreateAny, canDeleteAny, canUpdateAny } from '@/utils/access-control';
import { buildingQuery } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Col, message, Row, Skeleton, Switch } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';

const PATH = '/contents/carousels';
const AUTH_RESOURCE = '/contents/carousels/list';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'category' }],
    sort: [{ field: 'sort', order: 'DESC' }, { field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_CAROUSELS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
  });

  const [updateCarousel] = useMutation(M_UPDATE_CAROUSEL, {
    update: (proxy, { data }) => {
      if (data.updateCarousel) {
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

  const { queryCarousel } = data;

  if (!queryCarousel) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryCarousel.data;
  const total = queryCarousel.total;

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) =>
        canUpdateAny(AUTH_RESOURCE) ? <Link to={`${PATH}/detail/${row.id}`}>详情</Link> : '--',
    },
    {
      title: '图片',
      dataIndex: 'url',
      render: val => <img src={val} width="100" height="60" />,
    },
    {
      title: '标题',
      dataIndex: 'title',
      search: true,
    },
    {
      title: '地址',
      dataIndex: 'link',
      search: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      sorter: true,
    },
    {
      title: '是否发布',
      dataIndex: 'is_published',
      render: (val, record) =>
        canUpdateAny(AUTH_RESOURCE) ? (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            checked={!!val}
            onChange={checked => {
              client.mutate({
                mutation: M_UPDATE_CAROUSEL,
                variables: { id: record.id, data: { is_published: checked } },
                update: (proxy, { data }) => {
                  if (data.deleteCarousel) {
                    message.success('删除成功');
                    refetch();
                  }
                },
              });
            }}
          />
        ) : !!val ? (
          '是'
        ) : (
          '否'
        ),
      filterMultiple: false,
      filters: [{ text: '是', value: true }, { text: '否', value: false }],
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
          mutation: M_DELETE_CAROUSEL,
          variables: { ids: selectedRows.map(item => item.id).join(',') },
          update: (proxy, { data }) => {
            if (data.deleteCarousel) {
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
