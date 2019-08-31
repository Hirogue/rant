import OrgSelector from '@/components/OrgSelector';
import LogReader from '@/components/LogReader';
import StandardActions from '@/components/StandardActions';
import StandardConfirm from '@/components/StandardConfirm';
import StandardRow from '@/components/StandardRow';
import StandardTable from '@/components/StandardTable';
import UserSelector from '@/components/UserSelector';
import { M_DELETE_CAPITAL, Q_GET_CAPITAL, Q_GET_CAPITALS } from '@/gql';
import {
  canCreateAny,
  canDeleteAny,
  canReadAny,
  canUpdateAny,
  canUpdateOwn,
} from '@/utils/access-control';
import { ProjectStatusEnum, LogTypeEnum } from '@/utils/enum';
import {
  buildingQuery,
  filterOrg,
  IFModeMaps,
  paramsAuth,
  ProjectStatusMaps,
} from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { Affix, Col, Divider, message, Popconfirm, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { M_APPROVAL_CAPITAL } from '../gql';

const PATH = '/if/capitals';
const AUTH_RESOURCE = '/capital';

export default () => {
  const defaultVariables = {
    page: 0,
    limit: 10,
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  const [followingVisible, setFollowingVisible] = useState(false);
  const [cancelledVisible, setCancelledVisible] = useState(false);
  const [orgSelectorVisible, setOrgSelectorVisible] = useState(false);
  const [userSelectorVisible, setUserSelectorVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_CAPITALS, {
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(paramsAuth(AUTH_RESOURCE, defaultVariables)) },
  });

  useEffect(() => {
    const queryString = buildingQuery(paramsAuth(AUTH_RESOURCE, variables));

    refetch({ queryString });
  }, [variables]);

  const { queryCapital, productCategoryTrees, areaTrees } = data;

  if (!queryCapital) return <Skeleton loading={loading} active avatar />;

  const dataSource = queryCapital.data;
  const total = queryCapital.total;

  const renderActions = record => (
    <Fragment>
      {ProjectStatusEnum.PENDING === record.status && canUpdateAny(AUTH_RESOURCE) ? (
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
          <Divider type="vertical" />
        </Fragment>
      ) : null}
      {(ProjectStatusEnum.CHECKED === record.status ||
        ProjectStatusEnum.WAITING === record.status) &&
      canUpdateAny(AUTH_RESOURCE) ? (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              setCurrent(record);
              setOrgSelectorVisible(true);
            }}
          >
            [{`${ProjectStatusEnum.CHECKED === record.status ? '' : '重新'}`}分配部门]
          </a>
          <Divider type="vertical" />
        </Fragment>
      ) : null}
      {(ProjectStatusEnum.WAITING === record.status ||
        ProjectStatusEnum.FOLLOWING === record.status) &&
      canUpdateAny(AUTH_RESOURCE) ? (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              setCurrent(record);
              setUserSelectorVisible(true);
            }}
          >
            [{`${ProjectStatusEnum.WAITING === record.status ? '' : '重新'}`}分配业务员]
          </a>
          <Divider type="vertical" />
        </Fragment>
      ) : null}
      {ProjectStatusEnum.FOLLOWING === record.status && canUpdateOwn(AUTH_RESOURCE) ? (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              setCurrent(record);
              setFollowingVisible(true);
            }}
          >
            [跟进]
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要完成吗?"
            onConfirm={() => {
              client.mutate({
                mutation: M_APPROVAL_CAPITAL,
                variables: {
                  data: {
                    id: record.id,
                    status: ProjectStatusEnum.FINISHED,
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
            <a href="#">[完成]</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a
            href="javascript:;"
            onClick={() => {
              setCurrent(record);
              setCancelledVisible(true);
            }}
          >
            [作废]
          </a>
          <Divider type="vertical" />
        </Fragment>
      ) : null}
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

  const columns = [
    {
      title: '详情',
      dataIndex: 'id',
      render: (val, row) =>
        canUpdateAny(AUTH_RESOURCE) ? <Link to={`${PATH}/detail/${row.id}`}>详情</Link> : '--',
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
      title: '浏览量',
      dataIndex: 'views',
    },
    {
      title: '地区',
      dataIndex: 'area.title',
      render: (val, record) => (record.area ? record.area.title : ''),
      search: true,
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
      title: '发布时间',
      dataIndex: 'publish_at',
      render: val => (val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''),
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
      name: '新增',
      icon: 'file-add',
      action: () => router.push(`${PATH}/create`),
      hide: !canCreateAny(AUTH_RESOURCE),
    },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        client.mutate({
          mutation: M_DELETE_CAPITAL,
          variables: { ids: selectedRows.map(item => item.id).join(',') },
          update: (proxy, { data }) => {
            if (data.deleteCapital) {
              message.success('删除成功');
              refetch();
            }
          },
        });
      },
      disabled: selectedRows.length <= 0,
      hide: !canDeleteAny(AUTH_RESOURCE),
      confirm: true,
      confirmTitle: `确定要删除吗?`,
    },
    { name: '导入', icon: 'import', action: () => refetch(), hide: !canCreateAny(AUTH_RESOURCE) },
    { name: '导出', icon: 'export', action: () => refetch(), hide: !canReadAny(AUTH_RESOURCE) },
  ];

  return (
    <Fragment>
      <PageHeaderWrapper>
        <LogReader
          title="日志"
          target={current ? current.id : null}
          type={LogTypeEnum.CAPITAL}
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
              mutation: M_APPROVAL_CAPITAL,
              variables: {
                data: {
                  id: current.id,
                  status: ProjectStatusEnum.FOLLOWING,
                  own,
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
        <OrgSelector
          title="请选择要分配的部门"
          data={filterOrg(AUTH_RESOURCE)}
          visible={orgSelectorVisible}
          setVisible={setOrgSelectorVisible}
          onConfirm={org => {
            client.mutate({
              mutation: M_APPROVAL_CAPITAL,
              variables: {
                data: {
                  id: current.id,
                  status: ProjectStatusEnum.WAITING,
                  org,
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
        <StandardConfirm
          title="请输入跟进日志"
          visible={followingVisible}
          setVisible={setFollowingVisible}
          onConfirm={reason => {
            client.mutate({
              mutation: M_APPROVAL_CAPITAL,
              variables: {
                data: {
                  id: current.id,
                  status: ProjectStatusEnum.FOLLOWING,
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
        <StandardConfirm
          title="请输入作废理由"
          visible={cancelledVisible}
          setVisible={setCancelledVisible}
          onConfirm={reason => {
            client.mutate({
              mutation: M_APPROVAL_CAPITAL,
              variables: {
                data: {
                  id: current.id,
                  status: ProjectStatusEnum.CANCELLED,
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
