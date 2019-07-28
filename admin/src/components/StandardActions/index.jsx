import { Button, Tooltip, Popconfirm, Icon } from 'antd';

const ButtonGroup = Button.Group;

export default props => {
  const { actions } = props;
  return (
    <ButtonGroup>
      {actions.map((action, index) => {
        return (
          <Tooltip title={name} key={index}>
            {action.confirm ? (
              <Popconfirm
                disabled={action.disabled}
                title={action.confirmTitle}
                onConfirm={action.action}
              >
                <Button disabled={action.disabled} icon={action.icon} />
              </Popconfirm>
            ) : (
              <Button disabled={action.disabled} icon={action.icon} onClick={action.action} />
            )}
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
};
