import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List } from 'antd';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="settings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="settings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="settings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'settings.security.password',
        },
        {},
      ),
      description: (
        <Fragment>
          {formatMessage({
            id: 'settings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'settings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'settings.security.phone-description',
        },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'settings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'settings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="settings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'settings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'settings.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'settings.security.mfa',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'settings.security.mfa-description',
        },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage id="settings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;
