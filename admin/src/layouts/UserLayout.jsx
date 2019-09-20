import SelectLang from '@/components/SelectLang';
import BlankLayout from '@/layouts/BlankLayout';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { connect } from 'dva';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  return (
    <BlankLayout>
      <DocumentTitle
        title={getPageTitle({
          pathname: location.pathname,
          breadcrumb,
          formatMessage,
          ...props,
        })}
      >
        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>旅游项目通</span>
                </Link>
              </div>
              <div className={styles.desc}>
                <FormattedMessage id="layout.user.description" />
              </div>
            </div>
            {children}
          </div>
          <DefaultFooter copyright="Rant Stack" links={[]} />
        </div>
      </DocumentTitle>
    </BlankLayout>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
