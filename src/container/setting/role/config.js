const dataTableColumn = [
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
];

export { dataTableColumn };
