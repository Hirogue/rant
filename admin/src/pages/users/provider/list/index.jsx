import DetailPanel from '@/components/DetailPanel';
import LogReader from '@/components/LogReader';
import OrgSelector from '@/components/OrgSelector';
import StandardActions from '@/components/StandardActions';
import StandardConfirm from '@/components/StandardConfirm';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import UserSelector from '@/components/UserSelector';
import { Q_GET_USERS } from '@/gql';
import { canReadAny, canUpdateAny, canUpdateOwn } from '@/utils/access-control';
import { IdentityEnum, LogTypeEnum, UserStatusEnum, UserTypeEnum } from '@/utils/enum';
import {
  buildingQuery,
  filterOrg,
  paramsAuth,
  UserLevelMaps,
  UserStatusMaps,
  UserTypeMaps,
} from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Affix, Col, Descriptions, Divider, message, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import Zmage from 'react-zmage';
import { M_APPROVAL_USER } from '../../gql';

const PATH = '/users/provider';
const AUTH_RESOURCE = '/user/provider';

export default () => {
  const defaultFilter = [
    { field: 'identity', operator: CondOperator.EQUALS, value: IdentityEnum.PROVIDER },
  ];
  const defaultVariables = {
    page: 0,
    limit: 10,
    filter: defaultFilter,
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [checkedVisible, setCheckedVisible] = useState(false);
  const [rejectedVisible, setRejectedVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  const [followingVisible, setFollowingVisible] = useState(false);
  const [cancelledVisible, setCancelledVisible] = useState(false);
  const [orgSelectorVisible, setOrgSelectorVisible] = useState(false);
  const [userSelectorVisible, setUserSelectorVisible] = useState(false);
  const [current, setCurrent] = useState({});

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

  const renderActions = record => (
    <Fragment>
      {UserStatusEnum.PENDING === record.status ? (
        <Fragment>
          {canUpdateOwn(AUTH_RESOURCE) ? (
            <Fragment>
              <a
                href="javascript:;"
                onClick={() => {
                  setCurrent(record);
                  setCheckedVisible(true);
                }}
              >
                [审核]
              </a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() => {
                  setCurrent(record);
                  setRejectedVisible(true);
                }}
              >
                [驳回]
              </a>
              <Divider type="vertical" />
            </Fragment>
          ) : null}
          {canUpdateAny(AUTH_RESOURCE) ? (
            <Fragment>
              <a
                href="javascript:;"
                onClick={() => {
                  setCurrent(record);
                  setOrgSelectorVisible(true);
                }}
              >
                [{`${!record.org ? '' : '重新'}`}分配部门]
              </a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() => {
                  setCurrent(record);
                  setUserSelectorVisible(true);
                }}
              >
                [{`${!record.own ? '' : '重新'}`}分配业务员]
              </a>
              <Divider type="vertical" />
            </Fragment>
          ) : null}
        </Fragment>
      ) : null}
      <a
        href="javascript:;"
        onClick={() => {
          setCurrent(record);
          setDetailVisible(true);
        }}
      >
        [详情]
      </a>
      <Divider type="vertical" />
      <a
        href="javascript:;"
        onClick={() => {
          setCurrent(record);
          setLogVisible(true);
        }}
      >
        [日志]
      </a>
    </Fragment>
  );

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
      title: '地区',
      dataIndex: 'area_path',
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
      title: '部门',
      dataIndex: 'org.id',
      render: (val, record) => (record.org ? record.org.title : ''),
      treeSelector: true,
      treeFilters: filterOrg(AUTH_RESOURCE),
    },
    {
      title: '业务员',
      dataIndex: 'own.realname',
      search: true,
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
    { name: '导出', icon: 'export', action: () => refetch(), hide: !canReadAny(AUTH_RESOURCE) },
  ];

  return (
    <Fragment>
      <PageHeaderWrapper>
        <DetailPanel title="详细信息" visible={detailVisible} setVisible={setDetailVisible}>
          {UserTypeEnum.PERSONAL === current.type ? (
            <Descriptions title="个人用户" layout="vertical">
              <Descriptions.Item label="真实姓名">{current.realname}</Descriptions.Item>
              <Descriptions.Item label="手机号">{current.phone}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{current.idCard}</Descriptions.Item>
              <Descriptions.Item label="身份证头像面" span={2}>
                <Zmage width={320} height={200} src={current.idCardA} />
              </Descriptions.Item>
              <Descriptions.Item label="身份证国徽面">
                <Zmage width={320} height={200} src={current.idCardB} />
              </Descriptions.Item>
            </Descriptions>
          ) : null}
          {UserTypeEnum.ENTERPRISE === current.type ? (
            <Descriptions title="企业用户" layout="vertical">
              <Descriptions.Item label="负责人姓名">{current.realname}</Descriptions.Item>
              <Descriptions.Item label="联系电话" span={2}>
                {current.phone}
              </Descriptions.Item>
              <Descriptions.Item label="企业名称" span={2}>
                {current.company}
              </Descriptions.Item>
              <Descriptions.Item label="组织机构代码" span={2}>
                {current.org_code}
              </Descriptions.Item>
              <Descriptions.Item label="营业执照">
                <Zmage width={400} height={573} src={current.business_license} />
              </Descriptions.Item>
            </Descriptions>
          ) : null}
        </DetailPanel>
        <LogReader
          title="日志"
          target={current ? current.id : null}
          type={LogTypeEnum.USER}
          visible={logVisible}
          setVisible={setLogVisible}
        />
        <UserSelector
          title="请选择要分配的业务员"
          orgTree={filterOrg(AUTH_RESOURCE)}
          visible={userSelectorVisible}
          setVisible={setUserSelectorVisible}
          onConfirm={own => {
            client.mutate({
              mutation: M_APPROVAL_USER,
              variables: {
                data: {
                  id: current.id,
                  status: UserStatusEnum.PENDING,
                  own,
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
        <OrgSelector
          title="请选择要分配的部门"
          data={filterOrg(AUTH_RESOURCE)}
          visible={orgSelectorVisible}
          setVisible={setOrgSelectorVisible}
          onConfirm={org => {
            client.mutate({
              mutation: M_APPROVAL_USER,
              variables: {
                data: {
                  id: current.id,
                  status: UserStatusEnum.PENDING,
                  org,
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
        <StandardConfirm
          title="请输入审批总结"
          visible={checkedVisible}
          setVisible={setCheckedVisible}
          onConfirm={reason => {
            client.mutate({
              mutation: M_APPROVAL_USER,
              variables: {
                data: {
                  id: current.id,
                  status: UserStatusEnum.CHECKED,
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
        <StandardConfirm
          title="请输入驳回理由"
          visible={rejectedVisible}
          setVisible={setRejectedVisible}
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
