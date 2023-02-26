/* eslint-disable react/jsx-no-bind */
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { dataTableColumn } from './config';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import DataTable from '../../../components/table/DataTable';
import { DataService } from '../../../config/dataService/dataService';
import { BorderLessHeading, Main } from '../../styled';
import { useDispatch } from 'react-redux';
import { loadMenu } from '../../../redux/setting/menu/actionCreator';
import ModalForm from './components/ModalForm';
import { Dropdown } from '../../../components/dropdown/dropdown';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Link } from 'react-router-dom';
import UilEllipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import ConfirmModal from '../../../components/atoms/ConfirmModal';

function MenuPage() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    menuLists: [],
    roles: [],
  });

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Table',
    },
  ];

  const loadRoles = () => {
    DataService.get('/setting/role').then((res) => {
      const { data } = res.data;
      setState((currentState) => ({ ...currentState, roles: data }));
      loadMenuData(data);
    });
  };

  const loadMenuData = (roles = []) => {
    DataService.get('/setting/menu').then((res) => {
      const { data } = res.data;
      const menuLists = data
        .filter((item) => !item.parent_id)
        .map((item) => {
          return {
            id: item.id,
            menu_label: item.menu_label,
            menu_icon: item.menu_icon,
            menu_route: item.menu_route,
            menu_order: item.menu_order,
            show_menu: item.show_menu,
            parent_id: item.parent_id,
            role_id: item.roles.map((role) => role.id),
            parents: data,
            roles: roles.map((role) => {
              return {
                ...role,
                checked: item.roles.map((role) => role.id).includes(role.id),
                menu_id: item.id,
                onChangeRole: (e) => handleChangeRole(e),
              };
            }),
            items: item.children.map((child) => {
              return {
                id: child.id,
                menu_label: child.menu_label,
                menu_icon: child.menu_icon,
                menu_route: child.menu_route,
                menu_order: child.menu_order,
                show_menu: child.show_menu,
                parent_id: child.parent_id,
                role_id: child.roles.map((role) => role.id),
                parents: data,
                roles: roles.map((role) => {
                  return {
                    ...role,
                    checked: item.roles.map((role) => role.id).includes(role.id),
                    menu_id: child.id,
                    onChangeRole: (e) => handleChangeRole(e),
                  };
                }),
                onChange: (e) => handleChangeMenu(e),
              };
            }),
            onChange: (e) => handleChangeMenu(e),
          };
        });
      dispatch(loadMenu());
      setState((currentState) => ({ ...currentState, menuLists }));
    });
  };

  const handleChangeMenu = ({ id, value, field, item }) => {
    const newItem = { ...item };
    newItem[field] = value ? '1' : '0';
    newItem['_method'] = 'PUT';

    DataService.post('/setting/menu/' + id, newItem).then((res) => {
      loadRoles();
    });
  };

  const handleChangeRole = ({ item }) => {
    const newItem = { ...item };
    DataService.post('/setting/menu/role/' + newItem.menu_id, newItem).then((res) => {
      loadRoles();
    });
  };

  useEffect(() => {
    loadRoles();
  }, []);

  // function onChange(pagination, filters, sorter, extra) {
  //   setState({ ...state, values: { pagination, filters, sorter, extra } });
  // }

  const { menuLists, roles } = state;
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Table" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards
                title="List Menu"
                isbutton={
                  <ModalForm
                    parents={menuLists}
                    url={`/setting/menu`}
                    refetch={() => loadMenuData(roles)}
                    roles={roles}
                  />
                }
              >
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={menuLists}
                  columns={[
                    ...dataTableColumn,
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
                                <>
                                  <ModalForm
                                    update
                                    parents={record.parents}
                                    initialValues={{ ...record, _method: 'PUT' }}
                                    url={`/setting/menu/${record.id}`}
                                    refetch={() => loadMenuData(record.roles)}
                                    roles={record.roles}
                                  />
                                  <ConfirmModal
                                    url={`/setting/menu/${record.id}`}
                                    refetch={() => loadMenuData(record.roles)}
                                  >
                                    <Link to="#">
                                      <UilTrashAlt />
                                      Delete
                                    </Link>
                                  </ConfirmModal>
                                </>
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
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default MenuPage;
