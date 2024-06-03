/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Table, Breadcrumb, Button } from 'antd';

const PastOrders = () => {
  const pastOrders = useSelector(state => state.orders.pastOrders);

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
      render: (_text, _record) => (
        <span>
          <Button type="link">Detaylar</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={[{ title: 'Geçmiş Siparişler' }]} />
      <Table columns={columns} dataSource={pastOrders} rowKey="id" />
    </div>
  );
};

export default PastOrders;
