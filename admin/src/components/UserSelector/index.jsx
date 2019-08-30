import { Q_GET_USERS } from '@/gql';
import { IdentityEnum } from '@/utils/enum';
import { buildingQuery, paramsAuth } from '@/utils/global';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Form, Modal, Skeleton, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StandardTable from '../StandardTable';

const AUTH_RESOURCE = '/user/admin';

export default Form.create()(props => {
  const { title, visible, orgTree, onConfirm, setVisible, form } = props;
  const { getFieldDecorator, validateFields } = form;

  const defaultFilter = [
    { field: 'identity', operator: CondOperator.EQUALS, value: IdentityEnum.USER },
  ];
  const defaultVariables = {
    page: 0,
    limit: 10,
    filter: defaultFilter,
    sort: [{ field: 'create_at', order: 'DESC' }],
  };
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedRows, setSelectedRows] = useState([]);
  const [current, setCurrent] = useState(null);

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

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  const dataSource = queryUser.data;
  const total = queryUser.total;

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      render: val => <Avatar src={val} />,
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
      title: '部门',
      dataIndex: 'org.id',
      render: (val, record) => (record.org ? record.org.title : ''),
      treeSelector: true,
      treeFilters: orgTree,
    },
    {
      title: '角色',
      dataIndex: 'role.id',
      render: (val, record) => (record.role ? record.role.name : ''),
      treeSelector: true,
      treeNodeFilterProp: 'name',
      treeNodeLabelProp: 'name',
      treeFilters: roles.map(item => ({ title: item.name, ...item })),
    },
    {
      title: '操作',
      render: (val, record) => (
        <a href="javascript:;" onClick={() => handleOk({ id: record.id })}>
          [选择]
        </a>
      ),
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

  const handleOk = own => {
    setVisible(false);
    onConfirm(own);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      maskClosable={false}
      onCancel={handleCancel}
      footer={null}
      width={'60%'}
    >
      <StandardTable
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        defaultFilter={defaultFilter}
        state={variables}
        onChange={values => setVariables({ ...values })}
      />
    </Modal>
  );
});
