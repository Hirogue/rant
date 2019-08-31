import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_ARTICLE, M_UPDATE_ARTICLE, Q_GET_ARTICLES } from '@/gql';
import { canCreateAny, canDeleteAny, canReadAny, canUpdateAny } from '@/utils/access-control';
import { buildingQuery } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Col, message, Row, Skeleton, Switch } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';

const PATH = '/contents/articles';
const AUTH_RESOURCE = '/article';

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

  const [deleteArticle] = useMutation(M_DELETE_ARTICLE, {
    update: (proxy, { data }) => {
      if (data.deleteArticle) {
        message.success('删除成功');
        refetch();
      } else {
        message.error('删除失败');
      }
    },
  });
  const [updateArticle] = useMutation(M_UPDATE_ARTICLE, {
    update: (proxy, { data }) => {
      if (data.updateArticle) {
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

  const { queryArticle, articleCategoryTrees } = data;

  if (!queryArticle) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryArticle.data;
  const total = queryArticle.total;

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) =>
        canUpdateAny(AUTH_RESOURCE) ? <Link to={`${PATH}/detail/${row.id}`}>详情</Link> : '--',
    },
    {
      title: '封面',
      dataIndex: 'cover',
      render: val => <img src={val} width="100" height="60" />,
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
      title: '浏览量',
      dataIndex: 'views',
      sorter: true,
    },
    {
      title: '是否置顶',
      dataIndex: 'is_top',
      render: (val, record) =>
        canUpdateAny(AUTH_RESOURCE) ? (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            checked={!!val}
            onChange={checked =>
              updateArticle({ variables: { id: record.id, data: { is_top: checked } } })
            }
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
      title: '是否发布',
      dataIndex: 'is_published',
      render: (val, record) =>
        canUpdateAny(AUTH_RESOURCE) ? (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            checked={!!val}
            onChange={checked =>
              updateArticle({ variables: { id: record.id, data: { is_published: checked } } })
            }
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
        deleteArticle({ variables: { ids: selectedRows.map(item => item.id).join(',') } });
      },
      disabled: selectedRows.length <= 0,
      hide: !canDeleteAny(AUTH_RESOURCE),
      confirm: true,
      confirmTitle: `确定要删除吗?`,
    },
    { name: '导入', icon: 'import', action: () => refetch(), hide: !canCreateAny(AUTH_RESOURCE) },
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
          state={variables}
          onChange={values => setVariables({ ...values })}
          onRowSelectionChange={selectedRows => setSelectedRows(selectedRows)}
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
