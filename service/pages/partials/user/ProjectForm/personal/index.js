import React from "react";
import { Form, Select, Input, Button, Upload, Icon, Modal } from "antd";

const Option = Select.Option;

class UserPersonal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      previewVisible2: false,
      previewImage2: "",
      fileList2: []
    };
  }
  //图片上传
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  handleChange = ({ fileList }) => this.setState({ fileList });

  handleCancel2 = () => this.setState({ previewVisible2: false });
  handlePreview2 = file => {
    this.setState({
      previewImage2: file.url || file.thumbUrl,
      previewVisible2: true
    });
  };
  handleChange = ({ fileList2 }) => this.setState({ fileList2 });
  //表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList, previewVisible2, previewImage2, fileList2  } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">身份证正面</div>
      </div>
    );
    const uploadButton2 = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">身份证反面</div>
      </div>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label={"姓名："}>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "姓名" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"身份证正面："}>
          {getFieldDecorator("id1", {
            rules: [{ required: true, message: "上传身份证正面" }]
          })(
            <div className="clearfix">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          )}
        </Form.Item>
        {/* <Form.Item label={"身份证反面："}>
          {getFieldDecorator("id2", {
            rules: [{ required: true, message: "上传身份证反面" }]
          })(
            <div className="clearfix">
              <Upload
                listType="picture-card"
                fileList={fileList2}
                onPreview={this.handlePreview2}
                onChange={this.handleChange2}
              >
                {fileList2.length >= 1 ? null : uploadButton2}
              </Upload>
              <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancel2}>
                <img alt="example" style={{ width: '100%' }} src={previewImage2} />
              </Modal>
            </div>
          )}
        </Form.Item> */}
        <Form.Item label="联系地址：" hasFeedback>
          {getFieldDecorator("select1", {
            rules: [{ required: true, message: "请选择（省）" }]
          })(
            <Select
              placeholder="请选择（省）"
              style={{ width: 120, marginRight: 10 }}
            >
              <Option value="北京">北京</Option>
              <Option value="上海">U.S.A</Option>
            </Select>
          )}
          {getFieldDecorator("select2", {
            rules: [{ required: true, message: "请选择（市）" }]
          })(
            <Select
              placeholder="请选择（市）"
              style={{ width: 120, marginRight: 10 }}
            >
              <Option value="北京">北京</Option>
              <Option value="上海">U.S.A</Option>
            </Select>
          )}
          {getFieldDecorator("select3", {
            rules: [{ required: true, message: "请选择（县/区）" }]
          })(
            <Select placeholder="请选择（县/区）" style={{ width: 120 }}>
              <Option value="北京">China</Option>
              <Option value="上海">U.S.A</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={"联系电话"}>
          {getFieldDecorator("iphone", {
            rules: [{ required: true, message: "联系电话!", whitespace: true }]
          })(<Input type="number" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存资料
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "validate_other" })(UserPersonal);
