import Logger from '@/utils/logger';
import { Card, Divider, Table } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

export default props => {
  const { tableProps, reset } = props;
  const [selectedCount, setSelectedCount] = useState(0);

  const pagination = {
    size: 'small',
    total: tableProps.total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条记录`,
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCount(selectedRowKeys.length);
      tableProps.onRowSelectionChange && tableProps.onRowSelectionChange(selectedRows);
      Logger.log('selectedRows:', selectedRows);
    },
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    let sort = null;
    let order = null;

    if (!isEmpty(sorter)) {
      sort = sorter.columnKey;
      order = sorter.order === 'ascend' ? 'ASC' : 'DESC';
    }

    Logger.log('onTableChange pagination:', pagination);
    Logger.log('onTableChange filters:', filters);
    Logger.log('onTableChange sorter:', sort, order);

    tableProps.refetch &&
      tableProps.refetch({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
  };

  return (
    <Card bordered={false} style={{ marginTop: 10 }} bodyStyle={{ padding: '0 10px' }}>
      <Divider orientation="left">{`已选中 ${selectedCount} 项 / 共 ${tableProps.dataSource.length} 项`}</Divider>
      <Table
        size={'middle'}
        rowKey={'id'}
        onChange={onTableChange}
        rowSelection={rowSelection}
        pagination={pagination}
        {...tableProps}
      />
    </Card>
  );
};
