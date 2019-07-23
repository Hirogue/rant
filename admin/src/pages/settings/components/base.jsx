import { Q_FETCH_CURRENT_USER } from '@/gql/login';
import { M_UPDATE_USER } from '@/gql/user';
import Logger from '@/utils/logger';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Form, Input, message, Select, Upload } from 'antd';
import { connect } from 'dva';
import React, { Component, Fragment, useState } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';

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
  const { loading, data, refetch } = useQuery(Q_FETCH_CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  const [updateUser] = useMutation(M_UPDATE_USER, {
    update: (proxy, { data }) => {
      Logger.log('update user data:', data);

      refetch();

      message.success(
        formatMessage({
          id: 'settings.basic.update.success',
        }),
      );
    },
  });

  const currentUser = data.me || {};

  const handlerSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        updateUser({
          variables: {
            updateUserData: {
              id: currentUser.id,
              payload: JSON.stringify(values),
            },
          },
        });
      }
    });
  };

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
