import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import {
  M_CREATE_PROVIDER,
  M_UPDATE_PROVIDER,
  Q_GET_PROVIDER,
  Q_GET_PROVIDER_CATEGORY_TREES,
  Q_METADATA_DESCENDANTS_TREE,
} from '@/gql';
import { uploadOne } from '@/utils/fetch';
import { buildingQuery, getTreeData } from '@/utils/global';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Button, Card, Form, Input, message, TreeSelect } from 'antd';
import React, { Fragment, useState } from 'react';
import { router, withRouter } from 'umi';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

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

const onUpload = async (file, target, mutation) => {
  const res = await uploadOne(file);

  if (!!res && res.relativePath) {
    mutation({
      variables: {
        id: target.id,
        data: {
          logo: res.relativePath,
        },
      },
    });
  }
};

const BasicForm = Form.create()(props => {
  const { providerCategoryTrees, metadataDescendantsTree, target, mutation, form } = props;

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
        {/* <FormItem {...formItemLayout} label="简称">
          {getFieldDecorator('slogan', {
            initialValue: target.slogan,
          })(<Input placeholder="请填写简称" />)}
        </FormItem> */}
        <FormItem {...formItemLayout} label="分类">
          {getFieldDecorator('category.id', {
            initialValue: target.category ? target.category.id : null,
            rules: [
              {
                required: true,
                message: '请选择分类',
              },
            ],
          })(<TreeSelect showSearch treeNodeFilterProp="title" treeData={providerCategoryTrees} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="地区">
          {getFieldDecorator('area.id', {
            initialValue: target.area ? target.area.id : null,
            rules: [
              {
                required: true,
                message: '请选择地区',
              },
            ],
          })(
            <TreeSelect showSearch treeNodeFilterProp="title" treeData={metadataDescendantsTree} />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="简介">
          {getFieldDecorator('introduction', {
            initialValue: target.introduction,
          })(<TextArea placeholder="请填写简介" rows={4} />)}
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
  providerCategoryTrees,
  metadataDescendantsTree,
  data,
  mutation,
  tabKey,
  setTabKey,
) => {
  let tabList = {
    basic: {
      name: '基础信息',
      render: () => (
        <BasicForm
          providerCategoryTrees={getTreeData(providerCategoryTrees)}
          metadataDescendantsTree={getTreeData(metadataDescendantsTree)}
          target={data || {}}
          mutation={mutation}
        />
      ),
    },
  };

  if (data) {
    tabList = Object.assign(tabList, {
      cover: {
        name: '图标',
        render: () => (
          <ImageCropper
            url={data.logo}
            onUpload={file => onUpload(file, data, mutation)}
            width={148}
            height={62.31}
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
  const {
    match: {
      params: { id },
    },
  } = props;

  const [tabKey, setTabKey] = useState('basic');
  const [areaList, setAreaList] = useState([]);

  let result = {};

  if (!!id) {
    result = useQuery(Q_GET_PROVIDER, {
      notifyOnNetworkStatusChange: true,
      variables: {
        id,
        queryString: buildingQuery({ join: [{ field: 'category' }, { field: 'area' }] }),
      },
    });
  }

  const { data = {}, refetch = () => {} } = result;

  const providerCategoryResult = useQuery(Q_GET_PROVIDER_CATEGORY_TREES);
  const metadataDescendantsResult = useQuery(Q_METADATA_DESCENDANTS_TREE, {
    variables: { root: '地区' },
  });

  const [createProvider] = useMutation(M_CREATE_PROVIDER, {
    update: (proxy, { data }) => {
      if (data && data.createProvider) {
        message.success('保存成功');
        router.replace(`/providers/detail/${data.createProvider.id}`);
      }
    },
  });

  const [updateProvider] = useMutation(M_UPDATE_PROVIDER, {
    update: (proxy, { data }) => {
      if (data) {
        refetch();
        message.success('保存成功');
      }
    },
  });

  const { providerCategoryTrees = [] } = providerCategoryResult ? providerCategoryResult.data : {};
  const { metadataDescendantsTree = [] } = metadataDescendantsResult
    ? metadataDescendantsResult.data
    : {};
  const { provider } = data;

  return renderContent(
    providerCategoryTrees,
    metadataDescendantsTree,
    provider,
    id ? updateProvider : createProvider,
    tabKey,
    setTabKey,
  );
});
