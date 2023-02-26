import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TableWrapper } from '../../container/styled';
import { DataTableStyleWrap } from './Style';

function DataTable({
  filterOnchange,
  onSearch,
  rowSelection,
  tableData,
  columns,
  pagination = false,
  filter = true,
  refetch,
  loading = false,
}) {
  const [search, setSearch] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  return (
    <DataTableStyleWrap>
      {filter && (
        <div className="ninjadash-datatable-filter">
          <div className="ninjadash-datatable-filter__right">
            <Input
              placeholder="Search..."
              onPressEnter={(e) => {
                setSearch(e);
                filterOnchange(e);
                onSearch(e);
              }}
              suffix={
                isSearch ? (
                  <CloseCircleFilled
                    onClick={() => {
                      refetch();
                      setSearch(null);
                      setIsSearch(false);
                    }}
                  />
                ) : (
                  <SearchOutlined
                    onClick={() => {
                      onSearch();
                      setIsSearch(true);
                    }}
                  />
                )
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                filterOnchange(e.target.value);
              }}
            />
          </div>
        </div>
      )}

      <div className="ninjadasj-datatable">
        <TableWrapper className="table-data-view table-responsive">
          {rowSelection ? (
            <Table
              rowSelection={{
                // type: state.selectionType,
                ...rowSelection,
              }}
              pagination={pagination && { pageSize: 10, showSizeChanger: true }}
              dataSource={tableData}
              columns={columns}
              loading={loading}
            />
          ) : (
            <Table
              pagination={pagination && { pageSize: 10, showSizeChanger: true }}
              dataSource={tableData}
              columns={columns}
              loading={loading}
            />
          )}
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
}

DataTable.propTypes = {
  filterOnchange: PropTypes.bool,
  rowSelection: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
