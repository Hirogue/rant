import React from 'react';
import { Form, Select, Input, Button, Upload, Icon } from 'antd';

const Option = Select.Option;

class UserEnterprise extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label={'企业全称：'}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '企业全称', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label={'组织机构代码证：'}
        >
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '组织机构代码证', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="企业地址："
          hasFeedback
        >
          {getFieldDecorator('select1', {
            rules: [
              { required: true, message: '请选择（省）' },
            ],
          })(
            <Select placeholder="请选择（省）" style={{ width: 120, marginRight: 10 }}>
              <Option value="北京">北京</Option>
              <Option value="上海">U.S.A</Option>
            </Select>
          )}
          {getFieldDecorator('select2', {
            rules: [
              { required: true, message: '请选择（市）' },
            ],
          })(
            <Select placeholder="请选择（市）" style={{ width: 120, marginRight: 10 }}>
              <Option value="北京">北京</Option>
              <Option value="上海">U.S.A</Option>
            </Select>
          )}
          {getFieldDecorator('select3', {
            rules: [
              { required: true, message: '请选择（县/区）' },
            ],
          })(
            <Select placeholder="请选择（县/区）" style={{ width: 120 }}>
              <Option value="北京">China</Option>
              <Option value="上海">U.S.A</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="营业执照照片"
          extra="请上传图片"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              { required: true, message: '请上传营业执照照片' },
            ],
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> 请上传图片
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item
          label={'联系电话'}
        >
          {getFieldDecorator('iphone', {
            rules: [{ required: true, message: '联系电话!', whitespace: true }],
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">保存资料</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'validate_other' })(UserEnterprise)