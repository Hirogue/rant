import StandardActions from '@/components/StandardActions';
import StandardPanel from '@/components/StandardPanel';
import StandardRow from '@/components/StandardRow';
import StandardTree from '@/components/StandardTree';
import {
  M_CREATE_PRODUCT_CATEGORY,
  M_DELETE_PRODUCT_CATEGORY,
  M_UPDATE_PRODUCT_CATEGORY,
  Q_GET_PRODUCT_CATEGORY_TREES,
} from '@/gql';
import { canCreateAny, canDeleteAny, canUpdateAny } from '@/utils/access-control';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Affix,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Skeleton,
  Tree,
} from 'antd';
import { useEffect, useState } from 'react';

const AUTH_RESOURCE = '/contents/products/category';

const { TreeNode } = Tree;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8 },
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

const InfoForm = Form.create()(props => {
  const { target, mutation, form, isUpdate } = props;
  const { getFieldDecorator, resetFields } = form;

  useEffect(() => {
    if (!isUpdate) {
      resetFields();
    }
  }, [mutation]);

  return (
    <Card bordered={false}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              const variables = { data: values };

              if (isUpdate) {
                variables.id = target.id;
              } else {
                variables.data.parent = target;
              }

              mutation({ variables });
            }
          });
        }}
      >
        {target && !isUpdate ? (
          <FormItem {...formItemLayout} label="父节点">
            <Input disabled value={target.title} />
          </FormItem>
        ) : (
          ''
        )}
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('title', {
            initialValue: target && isUpdate ? target.title : '',
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
            initialValue: target && isUpdate ? target.sort : 0,
            rules: [
              {
                required: true,
                message: '排序不能为空',
              },
            ],
          })(<InputNumber min={0} placeholder="请填写排序" />)}
        </FormItem>
        {canUpdateAny(AUTH_RESOURCE) ? (
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
        ) : null}
      </Form>
    </Card>
  );
});

export default () => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const { loading, data, refetch, client } = useQuery(Q_GET_PRODUCT_CATEGORY_TREES, {
    notifyOnNetworkStatusChange: true,
  });
  const [updateProductCategory] = useMutation(M_UPDATE_PRODUCT_CATEGORY, {
    update: (cache, { data }) => {
      if (data) {
        refetch();
        setSelectedNode(data.updateProductCategory);
        message.success('保存成功');
      }
    },
  });
  const [createProductCategory] = useMutation(M_CREATE_PRODUCT_CATEGORY, {
    update: (cache, { data }) => {
      if (data) {
        refetch();
        setPanelVisible(false);
        message.success('新增成功');
      }
    },
  });
  const [deleteProductCategory] = useMutation(M_DELETE_PRODUCT_CATEGORY, {
    update: (cache, { data }) => {
      if (data) {
        refetch();
        setCheckedKeys([]);
        setSelectedNode(null);
        message.success('删除成功');
      }
    },
  });

  const { productCategoryTrees } = data;

  if (!productCategoryTrees) return <Skeleton />;

  const actions = [
    { name: '刷新', icon: 'reload', action: () => refetch() },
    {
      name: '新增',
      icon: 'file-add',
      action: () => setPanelVisible(true),
      hide: !canCreateAny(AUTH_RESOURCE),
    },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        deleteProductCategory({ variables: { ids: checkedKeys.join(',') } });
      },
      disabled: checkedKeys.length <= 0,
      hide: !canDeleteAny(AUTH_RESOURCE),
      confirm: true,
      confirmTitle: `确定要删除吗?`,
    },
  ];

  return (
    <PageHeaderWrapper>
      <StandardRow>
        <Row>
          <Col lg={6}>
            <Affix offsetTop={100}>
              <StandardActions actions={actions} />
            </Affix>
          </Col>
        </Row>
      </StandardRow>
      <StandardRow bodyStyle={{ marginTop: 10 }}>
        <Row>
          <Col lg={8}>
            <StandardTree
              treeData={productCategoryTrees}
              checkedKeys={checkedKeys}
              onCheck={checkedKeys => setCheckedKeys(checkedKeys)}
              onSelect={e => setSelectedNode(e.selected ? e.node.props.dataRef : null)}
              onDrop={(current, target) => {
                updateProductCategory({
                  variables: {
                    id: current.id,
                    data: {
                      ...current,
                      parent: target,
                    },
                  },
                });
              }}
            />
          </Col>
          <Col lg={15} offset={1}>
            <Divider orientation="left">详情</Divider>
            {selectedNode ? (
              <InfoForm isUpdate={true} mutation={updateProductCategory} target={selectedNode} />
            ) : (
              ''
            )}
          </Col>
        </Row>
      </StandardRow>
      <StandardPanel
        title={selectedNode ? '新增子节点' : '新增根节点'}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
      >
        <InfoForm mutation={createProductCategory} target={selectedNode} />
      </StandardPanel>
    </PageHeaderWrapper>
  );
};
