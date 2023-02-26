import { formatNumber } from '../../utility/utility';

// prabayar
const dataTableColumn = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'SKU',
    dataIndex: 'product_sku',
    key: 'product_sku',
  },
  {
    title: 'Vendor Name',
    dataIndex: 'product_original_name',
    key: 'product_original_name',
  },
  {
    title: 'Product name',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Vendor Price',
    dataIndex: 'product_original_price',
    key: 'product_original_price',
    render: (text) => formatNumber(text, 'Rp '),
  },
  {
    title: 'Sale Price',
    dataIndex: 'product_price',
    key: 'product_price',
    render: (text) => formatNumber(text, 'Rp '),
  },
  {
    title: 'Commission',
    dataIndex: 'commission_fee',
    key: 'commission_fee',
    render: (text) => formatNumber(text, 'Rp '),
  },

  {
    title: 'Category',
    dataIndex: 'product_category',
    key: 'product_category',
  },
  {
    title: 'Provider',
    dataIndex: 'product_brand',
    key: 'product_brand',
  },
];

// pasca bayar
const dataTablePascaColumn = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'SKU',
    dataIndex: 'product_sku',
    key: 'product_sku',
  },
  {
    title: 'Vendor Name',
    dataIndex: 'product_original_name',
    key: 'product_original_name',
  },
  {
    title: 'Product name',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Vendor Admin Fee',
    dataIndex: 'vendor_admin_fee',
    key: 'vendor_admin_fee',
    render: (text) => formatNumber(text, 'Rp '),
  },
  {
    title: 'Admin Fee',
    dataIndex: 'admin_fee',
    key: 'admin_fee',
    render: (text) => formatNumber(text, 'Rp '),
  },
  {
    title: 'Commission',
    dataIndex: 'commission_fee',
    key: 'commission_fee',
    render: (text) => formatNumber(text, 'Rp '),
  },

  {
    title: 'Category',
    dataIndex: 'product_category',
    key: 'product_category',
  },
  {
    title: 'Provider',
    dataIndex: 'product_brand',
    key: 'product_brand',
  },
];

const columnsLists = [
  {
    type: 'prepaid',
    columns: dataTableColumn,
  },
  {
    type: 'pasca',
    columns: dataTablePascaColumn,
  },
];

export { columnsLists };
