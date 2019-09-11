import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import { M_CREATE_USER, M_UPDATE_USER, Q_GET_USER } from '@/gql';
import { IdentityEnum } from '@/utils/enum';
import { uploadOne } from '@/utils/fetch';
import { buildingQuery, getTreeData, IdentityMaps } from '@/utils/global';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Affix,
  Avatar,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Form,
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

const PageHeaderContent = ({ user }) => {
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={user.avatar} />
      </div>
      <div className={styles.content}>{renderDescription(user)}</div>
    </div>
  );
};

const renderDescription = user => (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={1}>
        <Descriptions.Item label="账户名">{user.account}</Descriptions.Item>
        <Descriptions.Item label="身份">{IdentityMaps[user.identity]}</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const onAvatarUpload = async (file, target, mutation) => {
  const res = await uploadOne(file);

  if (!!res && res.relativePath) {
    mutation({
      variables: {
        id: target.id,
        data: {
          avatar: res.relativePath,
        },
      },
    });
  }
};

const BasicForm = Form.create()(props => {
  const { orgTrees, roles, target, mutation, form } = props;

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
              values.identity = IdentityEnum.USER;

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
        <FormItem {...formItemLayout} label="部门">
          {getFieldDecorator('org.id', {
            initialValue: target.org ? target.org.id : null,
            rules: [
              {
                required: true,
                message: '请选择所属部门',
              },
            ],
          })(<TreeSelect showSearch treeNodeFilterProp="title" treeData={orgTrees} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="角色">
          {getFieldDecorator('role.id', {
            initialValue: target.role ? target.role.id : null,
            rules: [
              {
                required: true,
                message: '请分配角色',
              },
            ],
          })(<TreeSelect showSearch treeData={roles} />)}
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
      queryString: buildingQuery({ join: [{ field: 'role' }, { field: 'org' }] }),
    },
  });

  const [createUser] = useMutation(M_CREATE_USER, {
    update: (proxy, { data }) => {
      if (data && data.createUser) {
        message.success('保存成功');
        router.replace(`${PATH}/detail/${data.createUser.id}`);
      }
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

  const { user, orgTrees, roles } = data;

  let mutation = createUser;

  if (id) {
    mutation = updateUser;
  }

  const target = user;

  let tabList = {
    basic: {
      name: '基础信息',
      render: () => (
        <BasicForm
          orgTrees={getTreeData(orgTrees)}
          roles={getTreeData(roles.map(item => ({ title: item.name, ...item })))}
          target={target || {}}
          mutation={mutation}
        />
      ),
    },
  };

  if (target) {
    tabList = Object.assign(tabList, {
      avatar: {
        name: '头像',
        render: () => (
          <ImageCropper
            url={target.avatar}
            onUpload={file => onAvatarUpload(file, target, mutation)}
            width={128}
            height={128}
          />
        ),
      },
    });
  }

  return (
    <PageHeaderWrapper
      title={target ? '编辑' : '新增'}
      extra={null}
      className={styles.pageHeader}
      content={id ? <PageHeaderContent user={target} /> : null}
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
});
