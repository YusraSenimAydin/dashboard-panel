import { useDispatch, useSelector } from 'react-redux';
import { completeOrder, setCurrentOrder, addPayment, resetPayments } from '../features/orders/ordersSlice';
import { Table, Breadcrumb, Button, Modal, Input, message } from 'antd';
import { useState } from 'react';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const currentOrder = useSelector(state => state.orders.currentOrder);
  const paymentAmounts = useSelector(state => state.orders.paymentAmounts);

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [paymentInputs, setPaymentInputs] = useState([{ id: 1, amount: 0 }]);

  const handleCompleteOrder = (order) => {
    dispatch(setCurrentOrder(order));
    setIsCompleteModalOpen(true);
  };

  const handleViewDetails = (order) => {
    dispatch(setCurrentOrder(order));
    setIsDetailsModalOpen(true);
  };

  const handleCompleteOk = () => {
    const totalPaid = paymentAmounts.reduce((acc, amount) => acc + amount, 0);
    if (totalPaid === currentOrder.totalPrice) {
      dispatch(completeOrder(currentOrder.id));
      setIsCompleteModalOpen(false);
      dispatch(resetPayments());
      setPaymentInputs([{ id: 1, amount: 0 }]);
    } else {
      message.error('Ödenen miktar toplam fiyatla eşleşmiyor!');
    }
  };

  const handleCompleteCancel = () => {
    setIsCompleteModalOpen(false);
    dispatch(resetPayments());
    setPaymentInputs([{ id: 1, amount: 0 }]);
  };

  const handleDetailsCancel = () => {
    setIsDetailsModalOpen(false);
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

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      handleAddPayment(id);
    }
  };

  const handleInputFocus = (id) => {
    setPaymentInputs(
      paymentInputs.map((input) =>
        input.id === id ? { ...input, amount: '' } : input
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
          <Button type="link" onClick={() => handleViewDetails(record)}>Detaylar</Button>
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
            {paymentInputs.map((input) => (
              <div className="flex items-center mb-4" key={input.id}>
                <Input
                  type="number"
                  value={input.amount}
                  onFocus={() => handleInputFocus(input.id)}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, input.id)}
                  placeholder="Ödeme Miktarı"
                  className="mr-2"
                />
                <Button onClick={() => handleAddPayment(input.id)}>Öde</Button>
              </div>
            ))}
            <Button onClick={handleAddInput}>Yeni Ödeme Ekle</Button>
            <div className="mb-4 mt-4">
              <strong>Ödenen Miktarlar:</strong>
              <ul className="list-disc pl-5">
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
