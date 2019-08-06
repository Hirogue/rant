import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import { M_CREATE_PRODUCT, M_UPDATE_PRODUCT, Q_GET_PRODUCT } from '@/gql';
import { uploadOne } from '@/utils/fetch';
import { buildingQuery, getTreeData } from '@/utils/global';
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
  Skeleton,
  TreeSelect,
} from 'antd';
import React, { Fragment, useState } from 'react';
import { router, withRouter } from 'umi';
import styles from './style.less';

const FormItem = Form.Item;
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

const onCoverUpload = async (file, target, mutation) => {
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

const onFlowsheetUpload = async (file, target, mutation) => {
  const res = await uploadOne(file);

  if (!!res && res.relativePath) {
    mutation({
      variables: {
        id: target.id,
        data: {
          flowsheet: res.relativePath,
        },
      },
    });
  }
};

const BasicForm = Form.create()(props => {
  const { productCategoryTrees, areaTrees, target, mutation, form } = props;

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
        <FormItem {...formItemLayout} label="标语">
          {getFieldDecorator('slogan', {
            initialValue: target.slogan,
            rules: [
              {
                required: true,
                message: '标语不能为空',
              },
            ],
          })(<Input placeholder="请填写标语" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分类">
          {getFieldDecorator('category.id', {
            initialValue: target.category ? target.category.id : null,
            rules: [
              {
                required: true,
                message: '请选择分类',
              },
            ],
          })(<TreeSelect showSearch treeNodeFilterProp="title" treeData={productCategoryTrees} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            initialValue: target.sort,
          })(<InputNumber min={0} placeholder="请填写排序" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="简介">
          {getFieldDecorator('introduction', {
            initialValue: target.introduction,
          })(<TextArea placeholder="请填写简介" rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="优势">
          {getFieldDecorator('advantage', {
            initialValue: target.advantage,
          })(<TextArea placeholder="请填写优势" rows={4} />)}
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

const renderContent = (productCategoryTrees, data, mutation, tabKey, setTabKey) => {
  let tabList = {
    basic: {
      name: '基础信息',
      render: () => (
        <BasicForm
          productCategoryTrees={getTreeData(productCategoryTrees)}
          target={data || {}}
          mutation={mutation}
        />
      ),
    },
  };

  if (data) {
    tabList = Object.assign(tabList, {
      cover: {
        name: '封面',
        render: () => (
          <ImageCropper
            key="cover"
            url={data.cover}
            onUpload={file => onCoverUpload(file, data, mutation)}
            width={372}
            height={232}
          />
        ),
      },
      flowsheet: {
        name: '流程图',
        render: () => (
          <ImageCropper
            key="flowsheet"
            url={data.flowsheet}
            onUpload={file => onFlowsheetUpload(file, data, mutation)}
            width={741.64}
            height={408.84}
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

  const { loading, data, refetch } = useQuery(Q_GET_PRODUCT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: id || '',
      queryString: buildingQuery({ join: [{ field: 'category' }] }),
    },
  });

  const [createProduct] = useMutation(M_CREATE_PRODUCT, {
    update: (proxy, { data }) => {
      if (data && data.createProduct) {
        message.success('保存成功');
        router.replace(`/products/detail/${data.createProduct.id}`);
      }
    },
  });

  const [updateProduct] = useMutation(M_UPDATE_PRODUCT, {
    update: (proxy, { data }) => {
      if (data) {
        refetch();
        message.success('保存成功');
      }
    },
  });

  if (loading || !data) return <Skeleton loading={loading} />;

  const { product, productCategoryTrees } = data;

  return renderContent(
    productCategoryTrees,
    id ? product : null,
    id ? updateProduct : createProduct,
    tabKey,
    setTabKey,
  );
});
