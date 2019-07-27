import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { buildingQuery, IdentityMaps, UserStatusMaps } from '@/utils/global';
import Logger from '@/utils/logger';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Card, Col, Row, Spin, Statistic, Skeleton, Tooltip } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'umi';
import { Q_GET_USERS, Q_GET_USER_STATISTICS } from './gql/user';
import styles from './style.less';

const ButtonGroup = Button.Group;

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

  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
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
    {
      title: '操作',
      dataIndex: 'id',
      render: (val, row) => {
        return (
          <Fragment>
            <Link to={`/users/detail/${val}`}>详情</Link>
          </Fragment>
        );
      },
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

  return (
    <Fragment>
      <PageHeaderWrapper>
        {/* {renderStatistics()} */}
        <StandardRow>
          <Row gutter={16}>
            <Col lg={4}>
              <ButtonGroup>
                <Tooltip title="刷新">
                  <Button icon="reload" onClick={() => refetch()} />
                </Tooltip>
                <Tooltip title="新增">
                  <Button icon="file-add" />
                </Tooltip>
                <Tooltip title="导入">
                  <Button icon="import" />
                </Tooltip>
                <Tooltip title="导出">
                  <Button icon="export" />
                </Tooltip>
              </ButtonGroup>
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
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
