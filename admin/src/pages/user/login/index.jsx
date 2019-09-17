import { M_LOGIN, Q_FETCH_CURRENT_USER } from '@/gql';
import Logger from '@/utils/logger';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Button } from 'antd';
import React, { useState, useRef } from 'react';
import { router } from 'umi';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import LoginComponents from './components/Login';
import styles from './style.less';
import { getPageQuery } from './utils/utils';

const { Tab, UserName, Password, Submit } = LoginComponents;

export default () => {
  const loginFormRef = useRef(null);
  const client = useApolloClient();
  const [login, { loading }] = useMutation(M_LOGIN, {
    update: async (cache, { data }) => {
      const login = data.login;

      if (login && login.token) {
        localStorage.setItem('token', login.token);

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        const { data } = await client.query({
          query: Q_FETCH_CURRENT_USER,
          fetchPolicy: 'no-cache',
        });

        cache.writeQuery({
          query: Q_FETCH_CURRENT_USER,
          data,
        });

        Logger.log('redirect:', redirect);

        router.replace(redirect || '/');
      }
    },
  });

  const handleSubmit = (err, values) => {
    if (err) return false;

    login({
      variables: { loginData: values },
    });
  };

  return (
    <div className={styles.main}>
      <LoginComponents defaultActiveKey="account" onSubmit={handleSubmit} ref={loginFormRef}>
        <Tab
          key="account"
          tab={formatMessage({
            id: 'user-login.login.tab-login-credentials',
          })}
        >
          <UserName
            name="account"
            placeholder={`${formatMessage({
              id: 'user-login.login.userName',
            })}`}
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
            })}`}
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
              loginFormRef.current.validateFields(handleSubmit);
            }}
          />
        </Tab>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="link" onClick={() => router.push('/user/register')}>
            <FormattedMessage id="user-login.login.register-now" />
          </Button>
          <Button type="link" onClick={() => router.push('/user/forgot')}>
            <FormattedMessage id="user-login.login.forgot-password" />
          </Button>
        </div>
        <Submit loading={false}>
          <FormattedMessage id="user-login.login.login" />
        </Submit>
      </LoginComponents>
    </div>
  );
};
