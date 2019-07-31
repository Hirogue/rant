import ImageCropper from '@/components/ImageCropper';
import { Q_FETCH_CURRENT_USER } from '@/gql/common';
import { M_UPDATE_USER } from '@/gql/user';
import { uploadOne } from '@/utils/fetch';
import Logger from '@/utils/logger';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Form, Input, message, Select } from 'antd';
import React, { useState } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select;

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
            id: currentUser.id,
            data: values,
          },
        });
      }
    });
  };

  const onAvatarUpload = async file => {
    Logger.log('upload file:', file);

    const res = await uploadOne(file);

    Logger.log('res:', res);

    if (!!res && res.relativePath) {
      updateUser({
        variables: {
          id: currentUser.id,
          data: { avatar: res.relativePath },
        },
      });
    }
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
        <div className={styles.avatar_title}>
          <FormattedMessage id="settings.basic.avatar" defaultMessage="Avatar" />
        </div>
        <div className={styles.avatar}>
          <ImageCropper
            url={currentUser.avatar}
            onUpload={onAvatarUpload}
            width={128}
            height={128}
          />
        </div>
      </div>
    </div>
  );
});
