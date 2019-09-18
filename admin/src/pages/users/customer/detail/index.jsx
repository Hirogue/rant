import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import { M_CREATE_USER, M_UPDATE_USER, Q_GET_USER } from '@/gql';
import { uploadOne } from '@/utils/fetch';
import {
  buildingQuery,
  getTreeData,
  IdentityMaps,
  UserStatusMaps,
  UserLevelMaps,
} from '@/utils/global';
import Logger from '@/utils/logger';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Affix,
  Avatar,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Dropdown,
  Form,
  Icon,
  Input,
  message,
  Select,
  Skeleton,
  Statistic,
  TreeSelect,
} from 'antd';
import React, { Fragment, useState } from 'react';
import { router, withRouter } from 'umi';
import styles from './style.less';
import { IdentityEnum } from '@/utils/enum';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const PATH = '/users/admin';

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
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
        span: 12,
      },
      md: {
        span: 10,
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
              values.identity = IdentityEnum.FINANCER;
              const variables = { data: values };

              if (target.id) {
                variables.id = target.id;
              }

              mutation({ variables });
            }
          });
        }}
      >
        <FormItem {...formItemLayout} label="账户名">
          {getFieldDecorator('account', {
            initialValue: target.account,
            rules: [
              {
                required: true,
                message: '账户名不能为空',
              },
            ],
          })(<Input disabled={!!target.account} placeholder="请填写账户名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('realname', {
            initialValue: target.realname,
            rules: [
              {
                required: true,
                message: '请填写姓名',
              },
            ],
          })(<Input placeholder="请填写姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('phone', {
            initialValue: target.phone,
            rules: [
              {
                required: true,
                message: '请填写手机号',
              },
            ],
          })(<Input placeholder="请填写手机号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator('status', {
            initialValue: target.status,
          })(
            <Select>
              {Object.keys(UserStatusMaps).map(key => (
                <Option key={key} value={parseInt(key)}>
                  {UserStatusMaps[key]}
                </Option>
              ))}
            </Select>,
          )}
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

const renderContent = (data, mutation, tabKey, setTabKey) => {
  const tabList = {
    basic: {
      name: '基础信息',
      render: () => <BasicForm target={data || {}} mutation={mutation} />,
    },
  };

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

  const { loading, data, refetch } = useQuery(Q_GET_USER, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: id || '',
      queryString: buildingQuery({}),
    },
  });

  const [updateUser] = useMutation(M_UPDATE_USER, {
    update: (proxy, { data }) => {
      if (data) {
        refetch();
        message.success('保存成功');
      }
    },
  });

  if (loading || !data) return <Skeleton loading={loading} />;

  const { user } = data;

  return renderContent(id ? user : null, id ? updateUser : createUser, tabKey, setTabKey);
});
