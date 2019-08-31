import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_PRODUCT, M_UPDATE_PRODUCT, Q_GET_PRODUCTS } from '@/gql';
import { buildingQuery } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Col, message, Row, Skeleton, Switch } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { canDeleteAny, canCreateAny, canReadAny, canUpdateAny } from '@/utils/access-control';

const PATH = '/contents/products';
const AUTH_RESOURCE = '/product';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'category' }],
    sort: [{ field: 'sort', order: 'DESC', field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const { loading, data, refetch } = useQuery(Q_GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
  });

  const [deleteProduct] = useMutation(M_DELETE_PRODUCT, {
    update: (proxy, { data }) => {
      if (data.deleteProduct) {
        message.success('删除成功');
        refetch();
      } else {
        message.error('删除失败');
      }
    },
  });
  const [updateProduct] = useMutation(M_UPDATE_PRODUCT, {
    update: (proxy, { data }) => {
      if (data.updateProduct) {
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

  const { queryProduct, productCategoryTrees, areaTrees } = data;

  if (!queryProduct) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryProduct.data;
  const total = queryProduct.total;

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
      title: '名称',
      dataIndex: 'name',
      search: true,
    },
    {
      title: '标语',
      dataIndex: 'slogan',
      search: true,
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
              updateProduct({ variables: { id: record.id, data: { is_published: checked } } })
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
      treeFilters: productCategoryTrees,
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
        deleteProduct({ variables: { ids: selectedRows.map(item => item.id).join(',') } });
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
