import Logger from '@/utils/logger';
import { useMutation } from '@apollo/react-hooks';
import { M_LOGIN } from './gql/login';
import React, { useState } from 'react';
import { router } from 'umi';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import LoginComponents from './components/Login';
import styles from './style.less';
import { getPageQuery } from './utils/utils';

const { Tab, UserName, Password, Submit } = LoginComponents;

export default () => {
  const [loginForm, setLoginForm] = useState(null);
  const [login, { loading }] = useMutation(M_LOGIN, {
    update: (proxy, { data }) => {
      Logger.log('login data:', data);

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
        <Submit loading={false}>
          <FormattedMessage id="user-login.login.login" />
        </Submit>
      </LoginComponents>
    </div>
  );
};
