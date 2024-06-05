import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal } from 'antd';
import { useState } from 'react';
import { setCurrentOrder } from '../features/orders/ordersSlice';

const PastOrders = () => {
  const dispatch = useDispatch();
  const pastOrders = useSelector(state => state.orders.pastOrders);
  const currentOrder = useSelector(state => state.orders.currentOrder);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const handleViewDetails = (order) => {
    dispatch(setCurrentOrder(order));
    setIsDetailsModalOpen(true);
  };

  const handleDetailsCancel = () => {
    setIsDetailsModalOpen(false);
  };

  const columns = [
    {
      title: 'Masa No',
      dataIndex: 'tableNumber',
      key: 'tableNumber',
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>Detaylar</Button>
      ),
    },
  ];

  return (
    <div className="p-4">
     <h2 className="text-xl font-bold mb-4">Geçmiş Siparişler</h2>
      <Table columns={columns} 
      dataSource={pastOrders} 
      rowKey="id" 
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
      }}
      />

      {currentOrder && (
        <Modal
          title="Sipariş Detayları"
          open={isDetailsModalOpen}
          onCancel={handleDetailsCancel}
          footer={[
            <Button key="close" onClick={handleDetailsCancel}>
              Kapat
            </Button>,
          ]}
        >
          <div>
            <p><strong>Masa No:</strong> {currentOrder.tableNumber}</p>
            <p><strong>Toplam Fiyat:</strong> ₺{currentOrder.totalPrice}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PastOrders;
