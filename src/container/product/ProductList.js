/* eslint-disable react/jsx-no-bind */
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import UilEllipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import { Col, message, Pagination, Row, Switch } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Dropdown } from '../../components/dropdown/dropdown';
import { PageHeader } from '../../components/page-headers/page-headers';
import DataTable from '../../components/table/DataTable';
import { DataService } from '../../config/dataService/dataService';
import { updateStatus } from '../../utility/utility';
import { BorderLessHeading, Main } from '../styled';
import ModalForm from './components/ModalForm';
import { columnsLists } from './config';

function ProductList({ type = 'prepaid' }) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    products: [],
    loading: false,
    loadingSync: false,
    total: 0,
    currentPage: 1,
    search: null,
  });

  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Product',
    },
  ];

  const loadProducts = (url = '/product/list', perpage = 10, params = { page: state.currentPage }) => {
    setState((currentState) => ({ ...currentState, loading: true }));
    DataService.post(url, { perpage, ...params, product_type: type })
      .then((res) => {
        const { data, total, current_page } = res.data.data;
        setState((currentState) => ({
          ...currentState,
          loading: false,
          products: data,
          total,
          currentPage: current_page,
        }));
      })
      .catch((err) => {
        setState((currentState) => ({
          ...currentState,
          loading: false,
        }));
      });
  };

  const syncProduct = () => {
    setState((currentState) => ({ ...currentState, loadingSync: true }));
    DataService.post('/product/sync', { type })
      .then((res) => {
        const { data } = res.data;
        message.success('Sync Product Berhasil');
        setState((currentState) => ({ ...currentState, loadingSync: false }));
        loadProducts();
      })
      .catch((err) => {
        message.error('Sync Product Gaggal');
        setState((currentState) => ({ ...currentState, loadingSync: false }));
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onChange = (page, pageSize = 10) => {
    loadProducts(`/product/list/?page=${page}`, pageSize, {
      search: state.search,
      page,
    });
  };

  const actions = [
    {
      title: 'Status',
      dataIndex: 'checked',
      key: 'checked',
      render: (text, record, index) => {
        return (
          <Switch
            value={record.product_status > 0 ? 0 : 1}
            checked={record.product_status > 0}
            onChange={(val) => {
              updateStatus({
                url: `/product/update/status/${record.id}`,
                data: { product_status: val ? 1 : 0 },
              });
              loadProducts();
            }}
          />
        );
      },
    },
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
                    initialValues={{ ...record }}
                    url={`/product/update/${record.id}`}
                    refetch={() => loadProducts()}
                    type={type}
                  />
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
  ];

  const { products, currentPage, total, search, loading, loadingSync } = state;
  const { columns } = columnsLists.filter((item) => item.type === type)[0];
  const productType = type === 'prepaid' ? 'Prabayar' : 'Pasca Bayar';
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Product" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards
                title={`List Product ${productType}`}
                isbutton={
                  <Button onClick={() => (loadingSync ? null : syncProduct())} type="primary" disabled={loadingSync}>
                    {loadingSync ? <LoadingOutlined /> : <SyncOutlined color="#fff" />}

                    <span className="ml-2">Sync Product</span>
                  </Button>
                }
              >
                <DataTable
                  filterOption
                  loading={loading || loadingSync}
                  tableData={products}
                  columns={[...columns, ...actions]}
                  filterOnchange={(e) => setState((currentState) => ({ ...currentState, search: e }))}
                  onSearch={(e) => {
                    loadProducts(`/product/list`, 10, {
                      search: e || search,
                    });
                  }}
                  refetch={() => loadProducts()}
                />
                <Pagination
                  defaultCurrent={1}
                  current={currentPage}
                  total={total}
                  className="mt-4 text-center"
                  onChange={onChange}
                  pageSizeOptions={['10', '20', '50', '100', '200', '500']}
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default ProductList;
