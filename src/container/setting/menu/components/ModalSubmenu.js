import React from 'react';
import { dataTableSubColumn } from '../config';
import { Button } from '../../../../components/buttons/buttons';
import { Modal } from '../../../../components/modals/antd-modals';
import DataTable from '../../../../components/table/DataTable';
import UilEllipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import { Link } from 'react-router-dom';
import ModalForm from './ModalForm';
import ConfirmModal from '../../../../components/atoms/ConfirmModal';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { useDispatch } from 'react-redux';
import { loadMenu } from '../../../../redux/setting/menu/actionCreator';
import { Dropdown } from '../../../../components/dropdown/dropdown';

function ModalSubmenu({ dataSource = [] }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Button type={'primary'} onClick={() => setVisible(true)} disabled={dataSource?.length < 1}>
        Sub Menu
      </Button>
      <Modal title={'Submenu List'} visible={visible} onCancel={() => setVisible(false)} width={800} footer={null}>
        <DataTable
          filter={false}
          filterOnchange
          tableData={dataSource}
          columns={[
            ...dataTableSubColumn,
            {
              title: 'Actions',
              dataIndex: 'action',
              key: 'action',
              align: 'center',
              render: (text, record, index) => {
                return (
                  <div>
                    <Dropdown
                      content={
                        <div>
                          <ModalForm
                            update
                            parents={record.parents}
                            initialValues={{ ...record, _method: 'PUT' }}
                            url={`/setting/menu/${record.id}`}
                            refetch={() => dispatch(loadMenu())}
                            roles={record.roles}
                          />
                          <ConfirmModal
                            url={`/setting/menu/${record.id}`}
                            refetch={() => {
                              setVisible(false);
                              setTimeout(() => {
                                dispatch(loadMenu());
                              }, 2000);
                            }}
                          >
                            <Link to="#">
                              <span>
                                <UilTrashAlt />
                                <span>Delete</span>
                              </span>
                            </Link>
                          </ConfirmModal>
                        </div>
                      }
                    >
                      <Link to="#">
                        <UilEllipsisH />
                      </Link>
                    </Dropdown>
                  </div>
                );
              },
            },
          ]}
          pagination={false}
        />
      </Modal>
    </div>
  );
}

export default ModalSubmenu;
