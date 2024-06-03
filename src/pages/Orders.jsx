import { useDispatch, useSelector } from 'react-redux';
import { completeOrder, setCurrentOrder, addPayment, resetPayments } from '../features/orders/ordersSlice';
import { Table, Breadcrumb, Button, Modal, Input } from 'antd';
import { useState } from 'react';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const currentOrder = useSelector(state => state.orders.currentOrder);
  const paymentAmounts = useSelector(state => state.orders.paymentAmounts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentInputs, setPaymentInputs] = useState([{ id: 1, amount: 0 }]);

  const handleCompleteOrder = (order) => {
    dispatch(setCurrentOrder(order));
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(completeOrder(currentOrder.id));
    setIsModalOpen(false);
    dispatch(resetPayments());
    setPaymentInputs([{ id: 1, amount: 0 }]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(resetPayments());
    setPaymentInputs([{ id: 1, amount: 0 }]);
  };

  const handleAddPayment = (id) => {
    const input = paymentInputs.find((input) => input.id === id);
    if (input && input.amount > 0) {
      dispatch(addPayment(Number(input.amount)));
      setPaymentInputs(
        paymentInputs.map((input) =>
          input.id === id ? { ...input, amount: 0 } : input
        )
      );
    }
  };

  const handleAddInput = () => {
    setPaymentInputs([
      ...paymentInputs,
      { id: paymentInputs.length + 1, amount: 0 },
    ]);
  };

  const handleInputChange = (id, value) => {
    setPaymentInputs(
      paymentInputs.map((input) =>
        input.id === id ? { ...input, amount: value } : input
      )
    );
  };

  const totalPaid = paymentAmounts.reduce((acc, amount) => acc + amount, 0);

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
        <span>
          <Button type="link">Detaylar</Button>
          <Button type="link" onClick={() => handleCompleteOrder(record)}>Tamamlandı</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={[{ title: 'Siparişler' }]} />
      <Table columns={columns} dataSource={orders} rowKey="id" />

      {currentOrder && (
        <Modal
          title="Ödeme Ekranı"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              İptal
            </Button>,
            <Button key="complete" type="primary" onClick={handleOk}>
              Tamamlandı
            </Button>,
          ]}
        >
          {paymentInputs.map((input) => (
            <div className="flex items-center mb-4" key={input.id}>
              <Input
                type="number"
                value={input.amount}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                placeholder="Ödeme Miktarı"
                className="mr-2"
              />
              <Button onClick={() => handleAddPayment(input.id)}>Öde</Button>
            </div>
          ))}
          <Button onClick={handleAddInput}>Yeni Ödeme Ekle</Button>
          <div className="mb-4 mt-4">
            <strong>Ödenen Miktarlar:</strong>
            <ul>
              {paymentAmounts.map((amount, index) => (
                <li key={index}>₺{amount}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Toplam Fiyat:</strong> ₺{currentOrder.totalPrice}
          </div>
          <div>
            <strong>Ödenen Toplam Miktar:</strong> ₺{totalPaid}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
