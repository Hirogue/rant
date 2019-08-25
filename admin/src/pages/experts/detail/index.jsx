import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import { M_CREATE_EXPERT, M_UPDATE_EXPERT, Q_GET_EXPERT } from '@/gql';
import { uploadOne } from '@/utils/fetch';
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
  Select,
  Skeleton,
  Switch,
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

const onUpload = async (file, target, mutation) => {
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
        <FormItem {...formItemLayout} label="分类">
          {getFieldDecorator('category', {
            initialValue: target.category,
            rules: [
              {
                required: true,
                message: '分类不能为空',
              },
            ],
          })(
            <Select>
              <Option value="知名投资人">知名投资人</Option>
              <Option value="目的地运营专家">目的地运营专家</Option>
              <Option value="行业研究专家">行业研究专家</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="公司">
          {getFieldDecorator('company', {
            initialValue: target.company,
            rules: [
              {
                required: true,
                message: '公司不能为空',
              },
            ],
          })(<Input placeholder="请填写公司" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="职位">
          {getFieldDecorator('position', {
            initialValue: target.position,
            rules: [
              {
                required: true,
                message: '职位不能为空',
              },
            ],
          })(<Input placeholder="请填写职位" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            initialValue: target.sort || 0,
          })(<InputNumber min={0} placeholder="请填写排序" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否发布">
          {getFieldDecorator('is_published', {
            initialValue: target.is_published,
          })(
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              defaultChecked={target.is_published}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="介绍">
          {getFieldDecorator('info', {
            initialValue: target.info,
          })(<TextArea placeholder="请填写介绍" rows={4} />)}
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
  let tabList = {
    basic: {
      name: '基础信息',
      render: () => <BasicForm target={data || {}} mutation={mutation} />,
    },
  };

  if (data) {
    tabList = Object.assign(tabList, {
      avatar: {
        name: '头像',
        render: () => (
          <ImageCropper
            url={data.avatar}
            onUpload={file => onUpload(file, data, mutation)}
            width={96}
            height={96}
          />
        ),
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

  const { loading, data, refetch } = useQuery(Q_GET_EXPERT, {
    notifyOnNetworkStatusChange: true,
    variables: { id: id || '', queryString: buildingQuery({ join: [{ field: 'category' }] }) },
  });

  const [createExpert] = useMutation(M_CREATE_EXPERT, {
    update: (proxy, { data }) => {
      if (data && data.createExpert) {
        message.success('保存成功');
        router.replace(`/experts/detail/${data.createExpert.id}`);
      }
    },
  });

  const [updateExpert] = useMutation(M_UPDATE_EXPERT, {
    update: (proxy, { data }) => {
      if (data) {
        refetch();
        message.success('保存成功');
      }
    },
  });

  if (loading || !data) return <Skeleton loading={loading} />;

  const { expert } = data;

  return renderContent(id ? expert : null, id ? updateExpert : createExpert, tabKey, setTabKey);
});
