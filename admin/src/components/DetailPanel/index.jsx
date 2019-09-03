import { Modal } from 'antd';

export default props => {
  const { title, children, visible, setVisible } = props;

  return (
    <Modal
      title={title}
      visible={visible}
      width={'60%'}
      maskClosable={true}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      {children}
    </Modal>
  );
};
