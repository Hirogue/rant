import { Button, Form, Input, Select, Upload, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment, useState } from 'react';
import { connect } from 'dva';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';
import { useQuery } from '@apollo/react-hooks';
import { Q_FETCH_CURRENT_USER } from '@/gql/login';

const FormItem = Form.Item;
const { Option } = Select;

const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage id="settings.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value;

  if (!province.key) {
    callback('Please input your province!');
  }

  if (!city.key) {
    callback('Please input your city!');
  }

  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

@connect(({ settings }) => ({
  currentUser: settings.currentUser,
}))
class BaseView extends Component {
  view = undefined;

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;

    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        message.success(
          formatMessage({
            id: 'settings.basic.update.success',
          }),
        );
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem
              label={formatMessage({
                id: 'settings.basic.email',
              })}
            >
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'settings.basic.email-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'settings.basic.nickname',
              })}
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'settings.basic.nickname-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'settings.basic.profile',
              })}
            >
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'settings.basic.profile-message',
                      },
                      {},
                    ),
                  },
                ],
              })(
                <Input.TextArea
                  placeholder={formatMessage({
                    id: 'settings.basic.profile-placeholder',
                  })}
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'settings.basic.country',
              })}
            >
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'settings.basic.country-message',
                      },
                      {},
                    ),
                  },
                ],
              })(
                <Select
                  style={{
                    maxWidth: 220,
                  }}
                >
                  <Option value="China">中国</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'settings.basic.geographic',
              })}
            >
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'settings.basic.geographic-message',
                      },
                      {},
                    ),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'settings.basic.address',
              })}
            >
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'settings.basic.address-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'settings.basic.phone',
              })}
            >
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'settings.basic.phone-message',
                      },
                      {},
                    ),
                  },
                  {
                    validator: validatorPhone,
                  },
                ],
              })(<PhoneView />)}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>
              <FormattedMessage id="settings.basic.update" defaultMessage="Update Information" />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={getAvatarURL()} />
        </div>
      </div>
    );
  }
}

const getAvatarURL = currentUser => {
  if (currentUser) {
    if (currentUser.avatar) {
      return currentUser.avatar;
    }

    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  return '';
};

export default Form.create()(props => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const [view, setView] = useState(null);
  const { loading, data } = useQuery(Q_FETCH_CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  const currentUser = data.me || {};

  const handlerSubmit = e => {
    e.preventDefault();

    form.validateFields(err => {
      if (!err) {
        message.success(
          formatMessage({
            id: 'settings.basic.update.success',
          }),
        );
      }
    });
  };

  console.log(currentUser);

  return (
    <div className={styles.baseView} ref={ref => setView(ref)}>
      <div className={styles.left}>
        <Form layout="vertical" hideRequiredMark>
          <FormItem
            label={formatMessage({
              id: 'settings.basic.profile',
            })}
          >
            {getFieldDecorator('profile', {
              initialValue: currentUser.profile,
              rules: [
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'settings.basic.profile-message',
                    },
                    {},
                  ),
                },
              ],
            })(
              <Input.TextArea
                placeholder={formatMessage({
                  id: 'settings.basic.profile-placeholder',
                })}
                rows={4}
              />,
            )}
          </FormItem>
          <FormItem
            label={formatMessage({
              id: 'settings.basic.address',
            })}
          >
            {getFieldDecorator('address', {
              initialValue: currentUser.address,
              rules: [
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'settings.basic.address-message',
                    },
                    {},
                  ),
                },
              ],
            })(<Input />)}
          </FormItem>
          <Button type="primary" onClick={handlerSubmit}>
            <FormattedMessage id="settings.basic.update" defaultMessage="Update Information" />
          </Button>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={getAvatarURL(currentUser)} />
      </div>
    </div>
  );
});
