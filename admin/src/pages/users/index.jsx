import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { Q_GET_USERS, Q_GET_USER_STATISTICS } from '@/gql/user';
import Logger from '@/utils/logger';
import { IdentityMaps, UserStatusMaps } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useQuery } from '@apollo/react-hooks';
import Highlighter from 'react-highlight-words';
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Radio,
  Row,
  Select,
  Spin,
  Statistic,
  Tooltip,
} from 'antd';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
const SelectOption = Select.Option;
const { Search } = Input;

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

const renderColumns = keyowrd => [
  {
    title: '头像',
    dataIndex: 'avatar',
    render: val => <Avatar src={val} />,
  },
  {
    title: '账户',
    dataIndex: 'account',
    render: val => <Highlighter searchWords={[keyowrd]} textToHighlight={val} />,
  },
  {
    title: '姓名',
    dataIndex: 'realname',
    render: val => <Highlighter searchWords={[keyowrd]} textToHighlight={val} />,
  },
  {
    title: '身份',
    dataIndex: 'identity',
    render: val => IdentityMaps[val],
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: val => UserStatusMaps[val],
  },
  {
    title: '注册时间',
    dataIndex: 'create_at',
    render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export default () => {
  const [keyword, setKeyword] = useState('');
  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
  });

  const { users } = data;

  let dataSource = [];
  let total = 0;

  if (!!users) {
    dataSource = users.items;
    total = users.total;
  }

  Logger.log('keyword:', keyword);

  return (
    <Fragment>
      <PageHeaderWrapper>
        {renderStatistics()}
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
            <Col lg={8}>
              <Search
                className={styles.extraContentSearch}
                placeholder="请输入搜索关键词"
                onChange={e => {
                  setKeyword(e.target.value);
                  refetch({ page: 0, keyword });
                }}
              />
            </Col>
            <Col lg={4}>
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
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 10 }}>
            <Col lg={24}>
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
            </Col>
          </Row>
        </StandardRow>

        <StandardTable
          tableProps={{
            loading,
            columns: renderColumns(keyword),
            dataSource,
            total,
            refetch,
          }}
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
