import { useSelector, useDispatch } from 'react-redux';
import { Table, Breadcrumb, Button, Modal } from 'antd';
import { useState } from 'react';
import { setCurrentOrder } from '../features/orders/ordersSlice';

const PastOrders = () => {
  const dispatch = useDispatch();
  const pastOrders = useSelector(state => state.orders.pastOrders);
  const currentOrder = useSelector(state => state.orders.currentOrder);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

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
      <Breadcrumb items={[{ title: 'Geçmiş Siparişler' }]} />
      <Table columns={columns} dataSource={pastOrders} rowKey="id" />

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
