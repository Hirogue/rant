import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StandardRow from '@/components/StandardRow';
import {
  Row,
  Col,
  Card,
  Tree,
  Input,
  Button,
  Skeleton,
  InputNumber,
  Divider,
  Form,
  message,
  Spin,
} from 'antd';
import StandardActions from '@/components/StandardActions';
import StandardTree from '@/components/StandardTree';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Q_GET_ORG, M_UPDATE_ORG, Q_GET_ORG_TREES } from './gql';
import { arrayToTree } from '@/utils/global';
import { useState } from 'react';

const { TreeNode } = Tree;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
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

export default () => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const { loading, data, refetch, client } = useQuery(Q_GET_ORG_TREES, {
    notifyOnNetworkStatusChange: true,
  });

  const { orgTrees } = data;

  if (!orgTrees) return <Skeleton />;

  const TreeInfoForm = Form.create()(props => {
    const { form } = props;
    const { getFieldDecorator } = form;

    const [updateOrg, { loading }] = useMutation(M_UPDATE_ORG, {
      update: (cache, { data }) => {
        if (data) {
          refetch();
          setSelectedNode(data.updateOrg);
          message.success('保存成功');
        }
      },
    });

    const { org } = data;

    return (
      <Card bordered={false} loading={loading}>
        <Form
          onSubmit={e => {
            e.preventDefault();
            form.validateFields((err, values) => {
              if (!err) {
                updateOrg({ variables: { id: selectedNode.id, data: values } });
              }
            });
          }}
        >
          <FormItem {...formItemLayout} label="组织名称">
            {getFieldDecorator('title', {
              initialValue: selectedNode ? selectedNode.title : '',
              rules: [
                {
                  required: true,
                  message: '组织名称不能为空',
                },
              ],
            })(<Input placeholder="请填写组织名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="排序">
            {getFieldDecorator('sort', {
              initialValue: selectedNode ? selectedNode.sort : 0,
              rules: [
                {
                  required: true,
                  message: '排序不能为空',
                },
              ],
            })(<InputNumber min={0} placeholder="请填写排序" />)}
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  });

  const actions = [
    { name: '刷新', icon: 'reload', action: () => refetch() },
    { name: '新增', icon: 'file-add', action: () => '' },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        // deleteUser({ variables: { ids: selectedRows.map(item => item.id).join(',') } });
      },
      disabled: checkedKeys.length <= 0,
      confirm: true,
      confirmTitle: `确定要删除吗?`,
    },
  ];

  return (
    <PageHeaderWrapper>
      <StandardRow>
        <Row>
          <Col lg={6}>
            <StandardActions actions={actions} />
          </Col>
        </Row>
      </StandardRow>
      <StandardRow bodyStyle={{ marginTop: 10 }}>
        <Row>
          <Col lg={8}>
            <StandardTree
              treeData={orgTrees}
              onCheck={checkedKeys => setCheckedKeys(checkedKeys)}
              onSelect={e => !!e && setSelectedNode(e)}
            />
          </Col>
          <Col lg={15} offset={1}>
            <Divider orientation="left">详情</Divider>
            {selectedNode ? <TreeInfoForm /> : ''}
          </Col>
        </Row>
      </StandardRow>
    </PageHeaderWrapper>
  );
};
