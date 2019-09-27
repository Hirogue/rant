import { Button, Tooltip, Popconfirm, Icon } from 'antd';

const ButtonGroup = Button.Group;

export default props => {
  const { actions } = props;
  return (
    <ButtonGroup>
      {actions.map((action, index) => {
        if (action.hide) return null;
        return (
          <Tooltip title={action.name} key={index}>
            {action.confirm ? (
              <Popconfirm
                disabled={action.disabled}
                title={action.confirmTitle}
                onConfirm={action.action}
              >
                {action.render ? (
                  <span style={{ display: 'inline-block' }}>{action.render(action)}</span>
                ) : (
                  <Button disabled={action.disabled} icon={action.icon} />
                )}
              </Popconfirm>
            ) : action.render ? (
              <span style={{ display: 'inline-block' }}>{action.render(action)}</span>
            ) : (
              <Button disabled={action.disabled} icon={action.icon} onClick={action.action} />
            )}
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
};
