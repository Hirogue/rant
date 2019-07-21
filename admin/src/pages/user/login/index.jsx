import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import Logger from '@/utils/logger';
import styles from './style.less';
import { M_LOGIN, Q_ME } from './gql';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

const renderMessage = content => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

export default () => {
  const [loginForm, setLoginForm] = useState(null);
  const [login, { loading }] = useMutation(M_LOGIN, {
    variables: { loginData: loginForm ? loginForm.props.form.getFieldsValue() : null },
    update: (proxy, { data }) => {
      Logger.log('-->', data);

      // TODO: handle login
    },
  });

  const handleSubmit = (err, values) => {
    login();
  };

  return (
    <div className={styles.main}>
      <LoginComponents
        defaultActiveKey="account"
        onSubmit={handleSubmit}
        wrappedComponentRef={formRef => setLoginForm(formRef)}
      >
        <Tab
          key="account"
          tab={formatMessage({
            id: 'user-login.login.tab-login-credentials',
          })}
        >
          {/* {status === 'error' &&
            loginType === 'account' &&
            !submitting &&
            this.renderMessage(
              formatMessage({
                id: 'user-login.login.message-invalid-credentials',
              }),
            )} */}
          <UserName
            name="account"
            placeholder={`${formatMessage({
              id: 'user-login.login.userName',
            })}: admin or user`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'user-login.userName.required',
                }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({
              id: 'user-login.login.password',
            })}: ant.design`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'user-login.password.required',
                }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              loginForm.validateFields(handleSubmit);
            }}
          />
        </Tab>
        <div>
          <a
            style={{
              float: 'right',
            }}
            href=""
          >
            <FormattedMessage id="user-login.login.forgot-password" />
          </a>
        </div>
        <Submit loading={loading}>
          <FormattedMessage id="user-login.login.login" />
        </Submit>
      </LoginComponents>
    </div>
  );
};
