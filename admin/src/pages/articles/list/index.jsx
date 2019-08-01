import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_USER, Q_GET_ARTICLES } from '@/gql';
import { buildingQuery, IdentityMaps, UserStatusMaps } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Avatar, Col, message, Switch, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'category' }],
    sort: [{ field: 'sort', order: 'DESC' }, { field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const { loading, data, refetch } = useQuery(Q_GET_ARTICLES, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
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

  const { articles, articleCategoryTrees } = data;

  if (!articles) return <Skeleton loading={loading} active avatar />;

  const dataSource = articles.data;
  const total = articles.total;

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) => {
        return (
          <Fragment>
            <Link to={`/articles/detail/${val}`}>详情</Link>
          </Fragment>
        );
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      search: true,
    },
    {
      title: '作者',
      dataIndex: 'author',
      search: true,
    },
    {
      title: '来源',
      dataIndex: 'source',
      search: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      sorter: true,
    },
    {
      title: '是否置顶',
      dataIndex: 'is_top',
      render: val => <Switch checkedChildren="是" unCheckedChildren="否" checked={!!val} />,
      filterMultiple: false,
      filters: [{ text: '是', value: true }, { text: '否', value: false }],
    },
    {
      title: '是否发布',
      dataIndex: 'is_published',
      render: val => <Switch checkedChildren="是" unCheckedChildren="否" checked={!!val} />,
      filterMultiple: false,
      filters: [{ text: '是', value: true }, { text: '否', value: false }],
    },
    {
      title: '分类',
      dataIndex: 'category.id',
      render: (val, record) => (record.category ? record.category.title : ''),
      treeSelector: true,
      treeFilters: articleCategoryTrees,
    },
    {
      title: '发布时间',
      dataIndex: 'publish_at',
      render: val => (val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''),
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
    { name: '新增', icon: 'file-add', action: () => router.push('/articles/create') },
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
              <StandardActions actions={actions} />
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
