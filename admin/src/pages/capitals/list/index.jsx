import StandardActions from '@/components/StandardActions';
import StandardConfirm from '@/components/StandardConfirm';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { M_DELETE_CAPITAL, M_UPDATE_CAPITAL, Q_GET_CAPITALS } from '@/gql';
import { ProjectStatusEnum } from '@/utils/enum';
import { buildingQuery, IFModeMaps, ProjectStatusMaps } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Col, Divider, message, Popconfirm, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { M_APPROVAL_CAPITAL } from '../gql';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    join: [{ field: 'creator' }],
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_CAPITALS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
  });

  const [deleteCapital] = useMutation(M_DELETE_CAPITAL, {
    update: (proxy, { data }) => {
      if (data.deleteCapital) {
        message.success('删除成功');
        refetch();
      } else {
        message.error('删除失败');
      }
    },
  });
  const [updateCapital] = useMutation(M_UPDATE_CAPITAL, {
    update: (proxy, { data }) => {
      if (data.updateCapital) {
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

  const { queryCapital, areaTrees } = data;

  if (!queryCapital) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryCapital.data;
  const total = queryCapital.total;

  const renderActions = record => {
    if (ProjectStatusEnum.PENDING === record.status) {
      return (
        <Fragment>
          <Popconfirm
            title="确定要审核吗?"
            onConfirm={() => {
              client.mutate({
                mutation: M_APPROVAL_CAPITAL,
                variables: {
                  data: {
                    id: record.id,
                    status: ProjectStatusEnum.CHECKED,
                  },
                },
                update: (cache, { data }) => {
                  if (data.approvalCapital) {
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
          <a
            href="javascript:;"
            onClick={() => {
              setCurrent(record);
              setVisible(true);
            }}
          >
            [驳回]
          </a>
        </Fragment>
      );
    } else {
      return null;
    }
  };

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) => {
        return (
          <Fragment>
            <Link to={`/if/capitals/detail/${val}`}>详情</Link>
          </Fragment>
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'title',
      search: true,
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      search: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      search: true,
    },
    {
      title: '访问量',
      dataIndex: 'views',
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: val => IFModeMaps[val],
      filters: Object.keys(IFModeMaps).map(key => ({ text: IFModeMaps[key], value: key })),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => ProjectStatusMaps[val],
      filters: Object.keys(ProjectStatusMaps).map(key => ({
        text: ProjectStatusMaps[key],
        value: key,
      })),
    },
    {
      title: '创建人',
      dataIndex: 'creator.realname',
      search: true,
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
    { name: '新增', icon: 'file-add', action: () => router.push('/if/capitals/create') },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        deleteCapital({ variables: { ids: selectedRows.map(item => item.id).join(',') } });
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
        <StandardConfirm
          title="请输入驳回理由"
          visible={visible}
          setVisible={setVisible}
          onConfirm={reason => {
            client.mutate({
              mutation: M_APPROVAL_CAPITAL,
              variables: {
                data: {
                  id: current.id,
                  status: ProjectStatusEnum.REJECTED,
                  reason,
                },
              },
              update: (proxy, { data }) => {
                if (data.approvalCapital) {
                  message.success('操作成功');
                  refetch();
                }
              },
            });
          }}
        />

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
