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

function RolePage() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    roles: [],
  });

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Site Management',
    },
    {
      path: 'first',
      breadcrumbName: 'Role',
    },
  ];

  const loadRoleData = () => {
    DataService.get('/setting/role').then((res) => {
      const { data } = res.data;
      const roles = data
        .filter((item) => !item.parent_id)
        .map((item) => {
          return {
            id: item.id,
            role_name: item.role_name,
            role_type: item.role_type,
            onChange: (e) => handleChangeRole(e),
          };
        });
      dispatch(loadMenu());
      setState((currentState) => ({ ...currentState, roles }));
    });
  };

  const handleChangeRole = ({ id, value, field, item }) => {
    const newItem = { ...item };
    newItem[field] = value ? '1' : '0';
    newItem['_method'] = 'PUT';

    DataService.post('/setting/role/' + id, newItem).then((res) => {
      loadRoleData();
    });
  };

  useEffect(() => {
    loadRoleData();
  }, []);

  // function onChange(pagination, filters, sorter, extra) {
  //   setState({ ...state, values: { pagination, filters, sorter, extra } });
  // }

  const { roles } = state;
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Table" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="List Role" isbutton={<ModalForm url={`/setting/role`} refetch={() => loadRoleData()} />}>
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={roles}
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
                                    url={`/setting/role/${record.id}`}
                                    refetch={() => loadRoleData()}
                                  />
                                  <ConfirmModal url={`/setting/role/${record.id}`} refetch={() => loadRoleData()}>
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

export default RolePage;
