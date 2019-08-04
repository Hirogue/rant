import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_PROVIDER, M_UPDATE_PROVIDER, Q_GET_PROVIDERS } from '@/gql';
import { buildingQuery } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Col, message, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { CondOperator } from '@nestjsx/crud-request';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'category' }, { field: 'area' }, { field: 'creator' }],
    sort: [{ field: 'create_at', order: 'DESC' }],
  };

  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const { loading, data, refetch } = useQuery(Q_GET_PROVIDERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      queryString: buildingQuery(defaultVariables),
      metadataRoot: '地区',
    },
  });

  const [deleteProvider] = useMutation(M_DELETE_PROVIDER, {
    update: (proxy, { data }) => {
      if (data.deleteProvider) {
        message.success('删除成功');
        refetch();
      } else {
        message.error('删除失败');
      }
    },
  });
  const [updateProvider] = useMutation(M_UPDATE_PROVIDER, {
    update: (proxy, { data }) => {
      if (data.updateProvider) {
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

  const { queryProvider, providerCategoryTrees, metadataDescendantsTree } = data;

  if (!queryProvider) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryProvider.data;
  const total = queryProvider.total;

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) => {
        return (
          <Fragment>
            <Link to={`/providers/detail/${val}`}>详情</Link>
          </Fragment>
        );
      },
    },
    {
      title: 'logo',
      dataIndex: 'logo',
      render: val => <img src={val} />,
    },
    {
      title: '名称',
      dataIndex: 'name',
      search: true,
    },
    {
      title: '简称',
      dataIndex: 'slogan',
      search: true,
    },
    {
      title: '分类',
      dataIndex: 'category.id',
      render: (val, record) => (record.category ? record.category.title : ''),
      treeSelector: true,
      treeFilters: providerCategoryTrees,
    },
    {
      title: '地区',
      dataIndex: 'area.id',
      render: (val, record) => (record.area ? record.area.title : ''),
      treeSelector: true,
      treeFilters: metadataDescendantsTree || [],
    },
    {
      title: '创建人',
      dataIndex: 'creator.realname',
      search: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
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
    { name: '新增', icon: 'file-add', action: () => router.push('/providers/create') },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        deleteProvider({ variables: { ids: selectedRows.map(item => item.id).join(',') } });
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
