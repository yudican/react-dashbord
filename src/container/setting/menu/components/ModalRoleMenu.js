import React from 'react';
import { dataTableRolesColumn } from '../config';
import { Button } from '../../../../components/buttons/buttons';
import { Modal } from '../../../../components/modals/antd-modals';
import DataTable from '../../../../components/table/DataTable';

function ModalRoleMenu({ dataSource = [] }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button type={'primary'} onClick={() => setVisible(true)}>
        Roles
      </Button>
      <Modal title={'Submenu List'} visible={visible} onCancel={() => setVisible(false)} width={800} footer={null}>
        <DataTable
          filter={false}
          filterOnchange
          tableData={dataSource}
          columns={dataTableRolesColumn}
          pagination={false}
        />
      </Modal>
    </div>
  );
}

export default ModalRoleMenu;
