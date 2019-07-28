import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { buildingQuery, IdentityMaps, UserStatusMaps } from '@/utils/global';
import Logger from '@/utils/logger';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Avatar, Card, Col, Row, Skeleton, Spin, Statistic, message } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'umi';
import { M_DELETE_USER, Q_GET_USERS, Q_GET_USER_STATISTICS } from '../gql/user';
import styles from './style.less';

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <Statistic title={title} value={value} />
    {bordered && <em />}
  </div>
);

const renderStatistics = () => {
  const { loading, data, refetch } = useQuery(Q_GET_USER_STATISTICS, {
    notifyOnNetworkStatusChange: true,
  });

  const userStatistics = data.userStatistics || {};

  return (
    <Spin spinning={loading} size="large">
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Row>
          <Col sm={3} xs={24}>
            <Info title="用户总数" value={userStatistics.all} bordered />
          </Col>
          <Col sm={3} xs={24}>
            <Info title="资金方" value={userStatistics.investors} bordered />
          </Col>
          <Col sm={3} xs={24}>
            <Info title="项目方" value={userStatistics.financers} bordered />
          </Col>
          <Col sm={3} xs={24}>
            <Info title="服务商" value={userStatistics.providers} bordered />
          </Col>
          <Col sm={3} xs={24}>
            <Info title="游客" value={userStatistics.tourists} bordered />
          </Col>
          <Col sm={3} xs={24}>
            <Info title="后台用户" value={userStatistics.users} bordered />
          </Col>
          <Col sm={3} xs={24}>
            <Info title="待审核" value={userStatistics.pendingCount} bordered />
          </Col>
          <Col sm={3} xs={24}>
            <Info title="待跟进" value={userStatistics.rejectCount} />
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default () => {
  const defaultVariables = { page: 0, limit: 10 };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
  });

  const [deleteUser] = useMutation(M_DELETE_USER, {
    update: (proxy, { data }) => {
      Logger.log('login data:', data);

      if (data.deleteUser) {
        message.success('删除成功');
        refetch();
      } else {
        message.error('删除失败');
      }
    },
  });

  useEffect(() => {
    Logger.log('variables:', variables);

    const queryString = buildingQuery(variables);

    Logger.log('queryString:', queryString);

    refetch({ queryString });
  }, [variables]);

  const { users } = data;

  if (!users) return <Skeleton loading={loading} active avatar />;

  const dataSource = users.data;
  const total = users.total;

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) => {
        return (
          <Fragment>
            <Link to={`/users/detail/${val}`}>详情</Link>
          </Fragment>
        );
      },
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
      title: '身份',
      dataIndex: 'identity',
      render: val => IdentityMaps[val],
      filters: Object.keys(IdentityMaps).map(key => ({ text: IdentityMaps[key], value: key })),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => UserStatusMaps[val],
      filters: Object.keys(UserStatusMaps).map(key => ({ text: UserStatusMaps[key], value: key })),
    },
    {
      title: '注册时间',
      dataIndex: 'create_at',
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
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
    { name: '新增', icon: 'file-add', action: () => refetch() },
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
            <Col lg={4}>
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
