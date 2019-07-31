import { Modal } from 'antd';

export default props => {
  const { title, visible, onOk, onCancel, children, reset } = props;
  return (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null} {...reset}>
      {children}
    </Modal>
  );
};
