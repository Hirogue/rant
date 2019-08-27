import StandardTabList from '@/components/StandardTabList';
import StandardTreeTable from '@/components/StandardTreeTable';
import { M_CREATE_ROLE, M_UPDATE_ROLE, Q_GET_ROLE } from '@/gql';
import { buildingQuery } from '@/utils/global';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Affix,
  Button,
  Card,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Skeleton,
} from 'antd';
import React, { Fragment, useState } from 'react';
import { router, withRouter } from 'umi';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<Icon type="down" />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }

      return (
        <Fragment>
          <Affix style={{ display: 'inline-block' }} offsetTop={80}>
            <Button style={{ borderRadius: 4 }} type="primary" onClick={() => router.goBack()}>
              返回
            </Button>
          </Affix>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

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

const renderContent = (data, dataSource, mutation, tabKey, setTabKey) => {
  let tabList = {
    basic: {
      name: '基础信息',
      render: () => <BasicForm target={data || {}} mutation={mutation} />,
    },
  };

  if (data) {
    const renderGrantAction = (action, record) => (
      <Fragment>
        <Radio.Group defaultValue="">
          <Radio value="">无</Radio>
          <Radio value={`${action}:any`}>任意</Radio>
          <Radio value={`${action}:own`}>所属</Radio>
        </Radio.Group>
      </Fragment>
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
      grant: {
        name: '授权',
        render: () => <StandardTreeTable dataSource={dataSource} columns={columns} />,
      },
    });
  }

  return (
    <PageHeaderWrapper
      title={data ? '编辑' : '新增'}
      extra={action}
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

  const {
    match: {
      params: { id },
    },
  } = props;

  const { loading, data, refetch } = useQuery(Q_GET_ROLE, {
    notifyOnNetworkStatusChange: true,
    variables: { id: id || '', queryString: buildingQuery({ join: [{ field: 'category' }] }) },
  });

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
        refetch();
        message.success('保存成功');
      }
    },
  });

  if (loading || !data) return <Skeleton loading={loading} />;

  const { role, authorityTrees } = data;

  return renderContent(
    id ? role : null,
    authorityTrees,
    id ? updateRole : createRole,
    tabKey,
    setTabKey,
  );
});
