import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { Q_GET_USERS } from '@/gql';
import { canReadAny } from '@/utils/access-control';
import { IdentityEnum } from '@/utils/enum';
import { ExcelHelper } from '@/utils/excel';
import { buildingQuery, paramsAuth } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Affix, Col, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';

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

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      queryString: buildingQuery(paramsAuth(AUTH_RESOURCE, defaultVariables, defaultFilter)),
    },
  });

  useEffect(() => {
    const queryString = buildingQuery(paramsAuth(AUTH_RESOURCE, variables, defaultFilter));

    refetch({ queryString });
  }, [variables]);

  const { queryUser, roles } = data;

  if (!queryUser) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryUser.data;
  const total = queryUser.total;

  const columns = [
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
      title: '注册时间',
      dataIndex: 'create_at',
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
      name: '导出',
      icon: 'export',
      action: () => {
        const excelColumns = columns
          .filter(item => !!item.dataIndex)
          .map(item => ({ header: item.title, key: item.dataIndex, ...item }));
        ExcelHelper.export(
          dataSource,
          excelColumns,
          '游客_' + moment().format('YYYY_MM_DD_HH_mm_ss'),
        );
      },
      hide: !canReadAny(AUTH_RESOURCE),
    },
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
          defaultFilter={defaultFilter}
          state={variables}
          onChange={values => setVariables({ ...values })}
          onRowSelectionChange={selectedRows => setSelectedRows(selectedRows)}
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
