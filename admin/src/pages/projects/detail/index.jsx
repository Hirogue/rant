import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import { M_CREATE_PROJECT, M_UPDATE_PROJECT, Q_GET_PROJECT } from '@/gql';
import { uploadOne } from '@/utils/fetch';
import { buildingQuery, getTreeData } from '@/utils/global';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Affix,
  Button,
  Card,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  message,
  Select,
  Skeleton,
} from 'antd';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { router, withRouter } from 'umi';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

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
          cover: res.relativePath,
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
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            initialValue: target.title,
            rules: [
              {
                required: true,
                message: '标题不能为空',
              },
            ],
          })(<Input placeholder="请填写标题" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="联系人">
          {getFieldDecorator('contact', {
            initialValue: target.contact,
            rules: [
              {
                required: true,
                message: '联系人不能为空',
              },
            ],
          })(<Input placeholder="请填写联系人" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('phone', {
            initialValue: target.phone,
            rules: [
              {
                required: true,
                message: '手机号不能为空',
              },
            ],
          })(<Input placeholder="请填写手机号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="公司">
          {getFieldDecorator('company', {
            initialValue: target.company,
          })(<Input placeholder="请填写公司" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="发布时间">
          {getFieldDecorator('publish_at', {
            initialValue: moment(target.publish_at),
          })(<DatePicker showTime />)}
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

  const { loading, data, refetch } = useQuery(Q_GET_PROJECT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: id || '',
      queryString: buildingQuery({ join: [{ field: 'category' }, { field: 'area' }] }),
    },
  });

  const [createProject] = useMutation(M_CREATE_PROJECT, {
    update: (proxy, { data }) => {
      if (data && data.createProject) {
        message.success('保存成功');
        router.replace(`/if/projects/detail/${data.createProject.id}`);
      }
    },
  });

  const [updateProject] = useMutation(M_UPDATE_PROJECT, {
    update: (proxy, { data }) => {
      if (data) {
        refetch();
        message.success('保存成功');
      }
    },
  });

  if (loading || !data) return <Skeleton loading={loading} />;

  const { project, metadataTrees } = data;

  const target = id ? project : {};
  const mutation = id ? updateProject : createProject;
  const trees = metadataTrees.find(item => item.title === '地区') || {};

  let tabList = {
    basic: {
      name: '基础信息',
      render: () => (
        <BasicForm
          metadataTrees={getTreeData(trees.children || [])}
          target={target || {}}
          mutation={mutation}
        />
      ),
    },
  };

  if (target) {
    tabList = Object.assign(tabList, {
      cover: {
        name: '封面',
        render: () => (
          <ImageCropper
            url={target.cover}
            onUpload={file => onUpload(file, target, mutation)}
            width={400}
            height={200}
          />
        ),
      },
    });
  }

  return (
    <PageHeaderWrapper
      title={target ? '编辑' : '新增'}
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
});
