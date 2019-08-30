import { Form, Modal, TreeSelect } from 'antd';

export default Form.create()(props => {
  const { title, visible, data, onConfirm, setVisible, form } = props;
  const { getFieldDecorator, validateFields } = form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  const handleOk = () => {
    validateFields((err, values) => {
      if (!err) {
        setVisible(false);
        onConfirm({ id: values.org });
      }
    });
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      maskClosable={false}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item>
          {getFieldDecorator('org', {
            rules: [
              {
                required: true,
                message: '请选择部门',
              },
            ],
          })(<TreeSelect showSearch treeNodeFilterProp="title" treeData={data} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});
