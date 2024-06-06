import { useDispatch, useSelector } from 'react-redux';
import { completeOrder, setCurrentOrder, addPayment, updatePayment, deletePayment, resetPayments } from '../features/orders/ordersSlice';
import { Table, Button, Modal, Input, message, Space } from 'antd';
import { useState } from 'react';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const currentOrder = useSelector(state => state.orders.currentOrder);
  const paymentAmounts = useSelector(state => state.orders.paymentAmounts);

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleCompleteOrder = (order) => {
    dispatch(setCurrentOrder(order));
    setIsCompleteModalOpen(true);
  };

  const handleViewDetails = (order) => {
    dispatch(setCurrentOrder(order));
    setIsDetailsModalOpen(true);
  };

  const handleCompleteOk = () => {
    const totalPaid = paymentAmounts.reduce((acc, payment) => acc + payment.amount, 0);
    if (totalPaid === currentOrder.totalPrice) {
      dispatch(completeOrder(currentOrder.id));
      setIsCompleteModalOpen(false);
      dispatch(resetPayments());
    } else {
      message.error('Ödenen miktar toplam fiyatla eşleşmiyor!');
    }
  };

  const handleCompleteCancel = () => {
    setIsCompleteModalOpen(false);
    dispatch(resetPayments());
  };

  const handleDetailsCancel = () => {
    setIsDetailsModalOpen(false);
  };

  const handleAddPayment = () => {
    if (paymentAmount) {
      dispatch(addPayment({ id: paymentAmounts.length, amount: Number(paymentAmount) }));
      setPaymentAmount('');
    } else {
      message.error('Lütfen geçerli bir ödeme miktarı girin.');
    }
  };

  const handleEditPayment = (id, amount) => {
    setEditingId(id);
    setEditAmount(amount);
    setIsEditModalOpen(true);
  };

  const handleUpdatePayment = () => {
    dispatch(updatePayment({ id: editingId, amount: Number(editAmount) }));
    setEditingId(null);
    setEditAmount(null);
    setIsEditModalOpen(false);
  };

  const handleDeletePayment = (id) => {
    dispatch(deletePayment(id));
  };

  const handlePaymentKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddPayment();
    }
  };

  const handleEditKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUpdatePayment();
    }
  };

  const paymentColumns = [
    {
      title: 'Ödenen Miktar',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditPayment(record.id, record.amount)}>Düzenle</Button>
          <Button type="link" onClick={() => handleDeletePayment(record.id)}>Sil</Button>
        </Space>
      ),
    },
  ];

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
        <Space size="middle">
          <Button type="link" onClick={() => handleViewDetails(record)}>Detaylar</Button>
          <Button type="link" onClick={() => handleCompleteOrder(record)}>Tamamlandı</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Siparişler</h2>
      <Table
        columns={columns}
        dataSource={orders}
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
        <>
          <Modal
            title="Ödeme Ekranı"
            open={isCompleteModalOpen}
            onOk={handleCompleteOk}
            onCancel={handleCompleteCancel}
            footer={[
              <Button key="cancel" onClick={handleCompleteCancel}>
                İptal
              </Button>,
              <Button key="complete" type="primary" onClick={handleCompleteOk}>
                Tamamlandı
              </Button>,
            ]}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Ödeme miktarı"
                min="0"
                onKeyPress={handlePaymentKeyPress}
              />
              <Button onClick={handleAddPayment}>Öde</Button>
            </div>
            <Table
              columns={paymentColumns}
              dataSource={paymentAmounts.map((payment, index) => ({ ...payment, key: index }))}
              pagination={false}
              style={{ marginTop: '16px' }}
            />
            <div>
              <strong>Toplam Fiyat:</strong> ₺{currentOrder.totalPrice}
            </div>
            <div>
              <strong>Ödenen Toplam Miktar:</strong> ₺{paymentAmounts.reduce((acc, payment) => acc + payment.amount, 0)}
            </div>
          </Modal>

          <Modal
            title="Ödeme Düzenle"
            open={isEditModalOpen}
            onOk={handleUpdatePayment}
            onCancel={() => setIsEditModalOpen(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
                İptal
              </Button>,
              <Button key="save" type="primary" onClick={handleUpdatePayment}>
                Kaydet
              </Button>,
            ]}
          >
            <Input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              min="0"
              onKeyPress={handleEditKeyPress}
            />
          </Modal>

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
        </>
      )}
    </div>
  );
};

export default Orders;
