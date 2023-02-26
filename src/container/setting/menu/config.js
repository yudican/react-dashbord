import { Switch } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilEllipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import { Dropdown } from '../../../components/dropdown/dropdown';
import ModalRoleMenu from './components/ModalRoleMenu';
import ModalSubmenu from './components/ModalSubmenu';
import { Link } from 'react-router-dom';
import ModalForm from './components/ModalForm';

const dataTableColumn = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Nama Menu',
    dataIndex: 'menu_label',
    key: 'menu_label',
  },
  {
    title: 'Submenu',
    dataIndex: 'parent_id',
    key: 'parent_id',
    render: (text, record) => {
      return <ModalSubmenu dataSource={record.items} />;
    },
  },
  {
    title: 'Roles',
    dataIndex: 'role_id',
    key: 'role_id',
    render: (text, record) => {
      return <ModalRoleMenu dataSource={record.roles} />;
    },
  },
  {
    title: 'Status',
    dataIndex: 'show_menu',
    key: 'show_menu',
    render: (text, record, index) => {
      return (
        <Switch
          value={text > 0 ? 0 : 1}
          checked={text > 0}
          onChange={(val) =>
            record.onChange({
              id: record.id,
              key: index,
              value: val,
              field: 'show_menu',
              item: record,
            })
          }
        />
      );
    },
  },
];

const dataTableSubColumn = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Nama Menu',
    dataIndex: 'menu_label',
    key: 'menu_label',
  },
  {
    title: 'Roles',
    dataIndex: 'role_id',
    key: 'role_id',
    render: (text, record) => {
      return <ModalRoleMenu dataSource={record.roles} />;
    },
  },
  {
    title: 'Status',
    dataIndex: 'show_menu',
    key: 'show_menu',
    render: (text, record, index) => {
      return (
        <Switch
          value={text > 0 ? 0 : 1}
          checked={text > 0}
          onChange={(val) =>
            record.onChange({
              id: record.id,
              key: index,
              value: val,
              field: 'show_menu',
              item: record,
            })
          }
        />
      );
    },
  },
];

const dataTableRolesColumn = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Nama Role',
    dataIndex: 'role_name',
    key: 'role_name',
  },
  {
    title: 'Status',
    dataIndex: 'checked',
    key: 'checked',
    render: (text, record, index) => {
      return (
        <Switch
          value={text > 0 ? 0 : 1}
          checked={text > 0}
          onChange={(val) =>
            record.onChangeRole({
              item: record,
            })
          }
        />
      );
    },
  },
];

export { dataTableColumn, dataTableSubColumn, dataTableRolesColumn };
