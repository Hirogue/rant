import StandardActions from '@/components/StandardActions';
import StandardConfirm from '@/components/StandardConfirm';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { Q_GET_USERS } from '@/gql';
import { canCreateAny, canReadAny, canUpdateAny } from '@/utils/access-control';
import { IdentityEnum, UserStatusEnum } from '@/utils/enum';
import { buildingQuery, UserLevelMaps, UserStatusMaps, UserTypeMaps } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Affix, Col, Divider, message, Popconfirm, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'umi';
import { M_APPROVAL_USER } from '../../gql';

const PATH = '/users/tourist';
const AUTH_RESOURCE = '/user/tourist';

export default () => {
  const defaultFilter = [
    { field: 'identity', operator: CondOperator.EQUALS, value: IdentityEnum.TOURIST },
  ];
  const defaultVariables = {
    page: 0,
    limit: 10,
    filter: defaultFilter,
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      queryString: buildingQuery(defaultVariables),
    },
  });

  useEffect(() => {
    const queryString = buildingQuery(variables);

    refetch({ queryString });
  }, [variables]);

  const { queryUser, roles } = data;

  if (!queryUser) return <Skeleton loading={loading} active avatar />;

  const renderActions = record => {
    if (UserStatusEnum.PENDING === record.status && canUpdateAny(AUTH_RESOURCE)) {
      return (
        <Fragment>
          <Popconfirm
            title="确定要审核吗?"
            onConfirm={() => {
              client.mutate({
                mutation: M_APPROVAL_USER,
                variables: {
                  data: {
                    id: record.id,
                    status: UserStatusEnum.CHECKED,
                  },
                },
                update: (cache, { data }) => {
                  if (data.approvalUser) {
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

  const dataSource = queryUser.data;
  const total = queryUser.total;

  const columns = [
    {
      title: '详情',

      render: (val, row) =>
        canUpdateAny(AUTH_RESOURCE) ? <Link to={`${PATH}/detail/${row.id}`}>详情</Link> : '--',
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
      title: '地区',
      dataIndex: 'area.title',
      render: (val, record) => (record.area ? record.area.title : ''),
      search: true,
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
    {
      name: '导入',
      icon: 'import',
      action: () => refetch(),
      hide: !canCreateAny(AUTH_RESOURCE),
    },
    { name: '导出', icon: 'export', action: () => refetch(), hide: !canReadAny(AUTH_RESOURCE) },
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
              mutation: M_APPROVAL_USER,
              variables: {
                data: {
                  id: current.id,
                  status: UserStatusEnum.REJECTED,
                  reason,
                },
              },
              update: (proxy, { data }) => {
                if (data.approvalUser) {
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
          defaultFilter={defaultFilter}
          state={variables}
          onChange={values => setVariables({ ...values })}
          onRowSelectionChange={selectedRows => setSelectedRows(selectedRows)}
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
