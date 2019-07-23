import { Q_GET_USERS, Q_GET_USER_STATISTICS } from '@/gql/user';
import { IdentityMaps, UserStatusMaps } from '@/utils/global';
import Logger from '@/utils/logger';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Card, Col, Input, Radio, Row, Select, Spin, Table, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { Fragment } from 'react';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
const SelectOption = Select.Option;
const { Search } = Input;

const extraContent = refetch => (
  <div className={styles.extraContent}>
    <RadioGroup
      defaultValue=""
      buttonStyle="solid"
      onChange={e => refetch({ page: 0, identity: e.target.value })}
    >
      <RadioButton value="">全部</RadioButton>
      <RadioButton value="investor">资金方</RadioButton>
      <RadioButton value="financer">项目方</RadioButton>
      <RadioButton value="provider">服务商</RadioButton>
      <RadioButton value="tourist">游客</RadioButton>
      <RadioButton value="user">后台用户</RadioButton>
    </RadioGroup>
    <Select
      className={styles.extraStateFilter}
      defaultValue={-1}
      onChange={status => refetch({ page: 0, status: parseInt(status) })}
    >
      <SelectOption value={-1}>全部状态</SelectOption>
      {Object.keys(UserStatusMaps).map((key, index) => (
        <SelectOption key={index} value={key}>
          {UserStatusMaps[key]}
        </SelectOption>
      ))}
    </Select>
    <Search
      className={styles.extraContentSearch}
      placeholder="请输入搜索关键词"
      onSearch={keyword => refetch({ page: 0, keyword })}
    />
    <ButtonGroup className={styles.extraActionList}>
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
  </div>
);

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    render: val => <Avatar src={val} />,
  },
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '姓名',
    dataIndex: 'realname',
  },
  {
    title: '身份',
    dataIndex: 'identity',
    render: val => IdentityMaps[val],
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: val => val,
  },
  {
    title: '注册时间',
    dataIndex: 'create_at',
    render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const renderStatistics = () => {
  const { loading, data, refetch } = useQuery(Q_GET_USER_STATISTICS, {
    notifyOnNetworkStatusChange: true,
  });

  const userStatistics = data.userStatistics || {};

  return (
    <Spin spinning={loading} size="large">
      <Card bordered={false}>
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
  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
  });

  const { users } = data;

  let list = [];
  let paginationProps = false;

  if (!!users) {
    const { items, total } = users;

    list = items;
    paginationProps = {
      size: 'small',
      total,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条记录`,
    };
  }

  const onTableChange = (pagination, filters, sorter, extra) => {
    let sort = null;
    let order = null;

    if (!isEmpty(sorter)) {
      sort = sorter.columnKey;
      order = sorter.order === 'ascend' ? 'ASC' : 'DESC';
    }

    Logger.log('onTableChange pagination:', pagination);
    Logger.log('onTableChange filters:', filters);
    Logger.log('onTableChange sorter:', sort, order);

    refetch({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <Fragment>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          {renderStatistics()}

          <Card
            className={styles.listCard}
            bordered={false}
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent(refetch)}
          >
            <Spin spinning={loading} size="large">
              <Table
                rowKey="id"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={list}
                pagination={paginationProps}
                onChange={onTableChange}
              />
            </Spin>
          </Card>
        </div>
      </PageHeaderWrapper>
    </Fragment>
  );
};
