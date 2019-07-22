import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Avatar,
  Button,
  Tooltip,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Result,
  Row,
  Select,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './style.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
class Users extends Component {
  state = {
    visible: false,
    done: false,
    current: undefined,
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  addBtn = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/fetch',
      payload: {
        count: 5,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'users/submit',
        payload: {
          id,
          ...fieldsValue,
        },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/submit',
      payload: {
        id,
      },
    });
  };

  render() {
    const {
      users: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? {
          footer: null,
          onCancel: this.handleDone,
        }
      : {
          okText: '保存',
          onOk: this.handleSubmit,
          onCancel: this.handleCancel,
        };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="investor">资金方</RadioButton>
          <RadioButton value="financer">项目方</RadioButton>
          <RadioButton value="provider">服务商</RadioButton>
          <RadioButton value="tourist">游客</RadioButton>
          <RadioButton value="user">后台用户</RadioButton>
        </RadioGroup>
        <Select className={styles.extraStateFilter} defaultValue="lucy">
          <SelectOption value="jack">Jack</SelectOption>
          <SelectOption value="lucy">Lucy</SelectOption>
          <SelectOption value="Yiminghe">yiminghe</SelectOption>
        </Select>
        <Search
          className={styles.extraContentSearch}
          placeholder="搜索 用户名 | 手机号 | 真实姓名 | 公司"
          onSearch={() => ({})}
        />
        <ButtonGroup className={styles.extraActionList}>
          <Tooltip title="刷新">
            <Button icon="reload" />
          </Tooltip>
          <Tooltip title="新增">
            <Button icon="plus" />
          </Tooltip>
          <Tooltip title="导入">
            <Button icon="import" />
          </Tooltip>
          <Tooltip title="导出">
            <Button icon="export" />
          </Tooltip>
        </ButtonGroup>
      </div>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>注册时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress
            percent={percent}
            status={status}
            strokeWidth={6}
            style={{
              width: 180,
            }}
          />
        </div>
      </div>
    );

    const MoreBtn = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key="edit">审核</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            status="success"
            title="操作成功"
            subTitle="一系列的信息描述，很短同样也可以带标点。"
            extra={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="任务名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入任务名称',
                },
              ],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [
                {
                  required: true,
                  message: '请选择开始时间',
                },
              ],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{
                  width: '100%',
                }}
              />,
            )}
          </FormItem>
          <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [
                {
                  required: true,
                  message: '请选择任务负责人',
                },
              ],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>,
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [
                {
                  message: '请输入至少五个字符的产品描述！',
                  min: 5,
                },
              ],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };

    return (
      <Fragment>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card bordered={false}>
              <Row>
                <Col sm={3} xs={24}>
                  <Info title="用户总数" value="8" bordered />
                </Col>
                <Col sm={3} xs={24}>
                  <Info title="资金方" value="8" bordered />
                </Col>
                <Col sm={3} xs={24}>
                  <Info title="项目方" value="60" bordered />
                </Col>
                <Col sm={3} xs={24}>
                  <Info title="服务商" value="24" bordered />
                </Col>
                <Col sm={3} xs={24}>
                  <Info title="游客" value="8" bordered />
                </Col>
                <Col sm={3} xs={24}>
                  <Info title="后台用户" value="8" bordered />
                </Col>
                <Col sm={3} xs={24}>
                  <Info title="待审核" value="32" bordered />
                </Col>
                <Col sm={3} xs={24}>
                  <Info title="已驳回" value="32" />
                </Col>
              </Row>
            </Card>

            <Card
              className={styles.listCard}
              bordered={false}
              style={{
                marginTop: 24,
              }}
              bodyStyle={{
                padding: '0 32px 40px 32px',
              }}
              extra={extraContent}
            >
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={e => {
                          e.preventDefault();
                          this.showEditModal(item);
                        }}
                      >
                        编辑
                      </a>,
                      <MoreBtn key="more" item={item} />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo} shape="square" size="large" />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.subDescription}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageHeaderWrapper>

        <Modal
          title={done ? null : `任务${current ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={
            done
              ? {
                  padding: '72px 0',
                }
              : {
                  padding: '28px 0 0',
                }
          }
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </Fragment>
    );
  }
}

export default Form.create()(Users);
