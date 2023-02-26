import { message } from 'antd';
import React from 'react';
import { DataService } from '../../config/dataService/dataService';
import { Modal } from '../modals/antd-modals';

const ConfirmModal = ({ children, title = 'Konfirmasi Hapus', body = 'Yakin Ingin Hapus Data?', url, refetch }) => {
  const [visible, setVisible] = React.useState(false);
  const handleSubmit = () => {
    DataService.post(url, { _method: 'DELETE' })
      .then((res) => {
        setVisible(false);
        message.success(res.data.message);
        refetch();
      })
      .catch((err) => {
        const { data } = err.response;
        message.error(data?.message);
      });
  };
  return (
    <div>
      <div onClick={() => setVisible(true)} style={{ cursor: 'pointer' }}>
        {children}
      </div>

      <Modal visible={visible} title={title} onCancel={() => setVisible(false)} onOk={() => handleSubmit()}>
        <p>{body}</p>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
