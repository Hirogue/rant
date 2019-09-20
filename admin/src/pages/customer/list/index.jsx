import StandardActions from '@/components/StandardActions';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import { Q_GET_CUSTOMERS } from '@/gql';
import { canReadAny, canUpdateOwn } from '@/utils/access-control';
import { ProjectStatusEnum, UserStatusEnum } from '@/utils/enum';
import { ExcelHelper } from '@/utils/excel';
import { buildingQuery, paramsAuth, ProjectStatusMaps } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { Affix, Checkbox, Col, Divider, Popconfirm, Row, Skeleton, message } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { M_APPROVAL_CUSTOMER } from '../gql';

const PATH = '/customer';
const AUTH_RESOURCE = '/customer';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_CUSTOMERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      queryString: buildingQuery(paramsAuth(AUTH_RESOURCE, defaultVariables)),
    },
  });

  useEffect(() => {
    const queryString = buildingQuery(paramsAuth(AUTH_RESOURCE, variables));

    refetch({ queryString });
  }, [variables]);

  const { queryCustomer } = data;

  if (!queryCustomer) return <Skeleton loading={loading} active avatar />;

  const renderActions = record => {
    if (ProjectStatusEnum.PENDING !== record.status) return null;
    return (
      <Fragment>
        {canUpdateOwn(AUTH_RESOURCE) ? (
          <Fragment>
            <Popconfirm
              title="确定要审核吗?"
              onConfirm={() => {
                client.mutate({
                  mutation: M_APPROVAL_CUSTOMER,
                  variables: {
                    data: {
                      id: record.id,
                      status: ProjectStatusEnum.CHECKED,
                    },
                  },
                  update: (cache, { data }) => {
                    if (data.approvalCustomer) {
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
            <Popconfirm
              title="确定要驳回吗?"
              onConfirm={() => {
                client.mutate({
                  mutation: M_APPROVAL_CUSTOMER,
                  variables: {
                    data: {
                      id: record.id,
                      status: ProjectStatusEnum.REJECTED,
                    },
                  },
                  update: (cache, { data }) => {
                    if (data.approvalCustomer) {
                      message.success('操作成功');
                      refetch();
                    }
                  },
                });
              }}
            >
              <a href="#">[驳回]</a>
            </Popconfirm>
          </Fragment>
        ) : null}
      </Fragment>
    );
  };

  const dataSource = queryCustomer.data;
  const total = queryCustomer.total;

  const columns = [
    {
      title: '联系人',
      dataIndex: 'realname',
      search: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      search: true,
    },
    {
      title: '企业全称',
      dataIndex: 'company',
      search: true,
    },
    {
      title: '地区',
      dataIndex: 'area_path',
      search: true,
    },
    {
      title: '食宿安排',
      dataIndex: 'board_and_lodging',
      render: (_, row) => {
        const info = JSON.parse(row.ex_info);
        return (
          <Checkbox.Group
            options={[
              { label: '5日晚餐', value: 'dinner5' },
              { label: '5日住宿（含早餐）', value: 'stay5' },
              { label: '6日午餐', value: 'lunch6' },
            ]}
            value={info.board_and_lodging || []}
          />
        );
      },
    },
    {
      title: '参会人',
      dataIndex: 'participants',
      search: true,
      render: (_, row) => {
        const info = JSON.parse(row.ex_info);
        return info.participants.map(item => item.realname).join(',');
      },
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
      title: '报名时间',
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
      name: '导出',
      icon: 'export',
      action: () => {
        const excelColumns = columns
          .filter(item => !!item.dataIndex)
          .map(item => ({ header: item.title, key: item.dataIndex, ...item }));
        ExcelHelper.export(
          dataSource,
          excelColumns,
          '促进会报名_' + moment().format('YYYY_MM_DD_HH_mm_ss'),
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
          state={variables}
          onChange={values => setVariables({ ...values })}
          onRowSelectionChange={selectedRows => setSelectedRows(selectedRows)}
        />
      </PageHeaderWrapper>
    </Fragment>
  );
};
