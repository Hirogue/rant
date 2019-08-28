import StandardActions from '@/components/StandardActions';
import StandardTabList from '@/components/StandardTabList';
import StandardTreeTable from '@/components/StandardTreeTable';
import { M_CREATE_ROLE, M_UPDATE_ROLE, Q_GET_ROLE } from '@/gql';
import { buildingQuery } from '@/utils/global';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import {
  Affix,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Skeleton,
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { router, withRouter } from 'umi';
import { M_UPDATE_GRANTS } from '../gql';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const BasicForm = Form.create()(props => {
  const { target, mutation, form } = props;

  const { getFieldDecorator, getFieldValue } = form;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
      md: {
        span: 12,
      },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  return (
    <Card bordered={false}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              const variables = { data: values };

              if (target.id) {
                variables.id = target.id;
              }

              mutation({ variables });
            }
          });
        }}
      >
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            initialValue: target.name,
            rules: [
              {
                required: true,
                message: '名称不能为空',
              },
            ],
          })(<Input placeholder="请填写名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            initialValue: target.sort || 0,
          })(<InputNumber min={0} placeholder="请填写排序" />)}
        </FormItem>
        <FormItem
          {...submitFormLayout}
          style={{
            marginTop: 32,
          }}
        >
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
});

const renderContent = (
  grants,
  setGrants,
  data,
  dataSource,
  mutation,
  client,
  refetch,
  tabKey,
  setTabKey,
) => {
  let tabList = {
    basic: {
      name: '基础信息',
      render: () => <BasicForm target={data || {}} mutation={mutation} />,
    },
  };

  if (data) {
    const getGrantValue = (action, record) => {
      const grant = grants[record.value];

      if (!!grant) {
        if (!!grant[`${action}:any`]) return 'any';
        if (!!grant[`${action}:own`]) return 'own';
      }

      return '';
    };

    const onGrantChange = (action, value, record) => {
      if (grants[record.value]) {
        delete grants[record.value][`${action}:any`];
        delete grants[record.value][`${action}:own`];

        if (!!value) {
          grants[record.value][`${action}:${value}`] = ['*'];
        }
        setGrants({ ...grants });
      }
    };

    const renderGrantAction = (action, record) =>
      grants[record.value] ? (
        <Fragment>
          <Radio.Group
            value={getGrantValue(action, record)}
            onChange={e => onGrantChange(action, e.target.value, record)}
          >
            <Radio value="">无</Radio>
            <Radio value="any">任意</Radio>
            <Radio value="own">所属</Radio>
          </Radio.Group>
        </Fragment>
      ) : (
        ''
      );

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      // {
      //   title: '值',
      //   dataIndex: 'value',
      // },
      {
        title: '新增',
        render: (val, record) => renderGrantAction('create', record),
      },
      {
        title: '查询',
        render: (val, record) => renderGrantAction('read', record),
      },
      {
        title: '修改',
        render: (val, record) => renderGrantAction('update', record),
      },
      {
        title: '删除',
        render: (val, record) => renderGrantAction('delete', record),
      },
    ];

    tabList = Object.assign(tabList, {
      grants: {
        name: '授权',
        render: () => (
          <Fragment>
            <Affix style={{ display: 'inline-block', marginBottom: 10 }} offsetTop={80}>
              <StandardActions
                actions={[
                  { name: '刷新', icon: 'reload', action: () => refetch() },
                  // { name: '新增', icon: 'file-add', action: () => { } },
                  {
                    name: '保存',
                    icon: 'save',
                    action: () => {
                      client.mutate({
                        mutation: M_UPDATE_GRANTS,
                        variables: {
                          id: data.id,
                          data: { grants: JSON.stringify(grants) },
                        },
                        update: (cache, { data }) => {
                          if (data.updateGrants) {
                            refetch();
                            setGrants({ ...grants });
                            message.success('授权成功');
                          }
                        },
                      });
                    },
                  },
                ]}
              />
            </Affix>
            <StandardTreeTable
              dataSource={dataSource}
              columns={columns}
              grants={grants}
              setGrants={setGrants}
            />
          </Fragment>
        ),
      },
    });
  }

  return (
    <PageHeaderWrapper
      title={data ? '编辑' : '新增'}
      extra={
        <RouteContext.Consumer>
          {() => (
            <Fragment>
              <Affix style={{ display: 'inline-block' }} offsetTop={80}>
                <Button style={{ borderRadius: 4 }} type="primary" onClick={() => router.goBack()}>
                  返回
                </Button>
              </Affix>
            </Fragment>
          )}
        </RouteContext.Consumer>
      }
      className={styles.pageHeader}
      content={null}
      extraContent={null}
    >
      <div className={styles.main}>
        <GridContent>
          <StandardTabList
            activeTabKey={tabKey}
            onActiveTabKeyChange={key => setTabKey(key)}
            tabList={tabList}
          />
        </GridContent>
      </div>
    </PageHeaderWrapper>
  );
};

export default withRouter(props => {
  const [tabKey, setTabKey] = useState('basic');
  const [grants, setGrants] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    match: {
      params: { id },
    },
  } = props;

  const client = useApolloClient();

  const { loading, data, refetch } = useQuery(Q_GET_ROLE, {
    notifyOnNetworkStatusChange: true,
    variables: { id: id || '', queryString: buildingQuery({}) },
  });

  useEffect(() => {
    if (data.role) {
      setGrants(data.role.grants ? JSON.parse(data.role.grants) : {});
    }
  }, [data]);

  const [createRole] = useMutation(M_CREATE_ROLE, {
    update: (proxy, { data }) => {
      if (data && data.createRole) {
        message.success('保存成功');
        router.replace(`/accesss-control/role/detail/${data.createRole.id}`);
      }
    },
  });

  const [updateRole] = useMutation(M_UPDATE_ROLE, {
    update: (proxy, { data }) => {
      if (data) {
        message.success('保存成功');
        refetch();
      }
    },
  });

  if (loading || !data) return <Skeleton loading={loading} />;

  const { role, authorityTrees } = data;

  return renderContent(
    grants,
    setGrants,
    id ? role : null,
    authorityTrees,
    id ? updateRole : createRole,
    client,
    refetch,
    tabKey,
    setTabKey,
  );
});
