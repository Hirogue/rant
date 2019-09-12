import GrantsTable from '@/components/GrantsTable';
import StandardTabList from '@/components/StandardTabList';
import { M_CREATE_ROLE, M_UPDATE_ROLE, Q_GET_ROLE } from '@/gql';
import { buildingQuery } from '@/utils/global';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Button, Card, Form, Input, InputNumber, message, Select, Skeleton } from 'antd';
import React, { Fragment, useState } from 'react';
import { router, withRouter } from 'umi';
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

const renderContent = (refetch, data, mutation, tabKey, setTabKey) => {
  let tabList = {
    basic: {
      name: '基础信息',
      render: () => <BasicForm target={data || {}} mutation={mutation} />,
    },
  };

  if (data) {
    tabList = Object.assign(tabList, {
      grants: {
        name: '授权',
        render: () => (
          <GrantsTable
            id={data.id}
            refetch={refetch}
            defaultGrants={data.grants ? JSON.parse(data.grants) : {}}
          />
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
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    match: {
      params: { id },
    },
  } = props;

  let result = {};

  if (!!id) {
    result = useQuery(Q_GET_ROLE, {
      notifyOnNetworkStatusChange: true,
      variables: { id, queryString: buildingQuery({}) },
    });
  }

  const { data = {}, refetch = () => {} } = result;

  const [createRole] = useMutation(M_CREATE_ROLE, {
    update: (proxy, { data }) => {
      if (data && data.createRole) {
        message.success('保存成功');
        router.replace(`/role/detail/${data.createRole.id}`);
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

  const { role } = data;

  return renderContent(refetch, role, id ? updateRole : createRole, tabKey, setTabKey);
});
