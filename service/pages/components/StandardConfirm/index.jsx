import { Modal, Button, Tooltip, Popconfirm, Icon, Input, Form } from 'antd';
import { useState } from 'react';

const TextArea = Input.TextArea;
const ButtonGroup = Button.Group;

export default Form.create()(props => {
  const { title, visible, onConfirm, setVisible, form } = props;
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
        onConfirm(values.text);
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
          {getFieldDecorator('text', {
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<TextArea />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});
