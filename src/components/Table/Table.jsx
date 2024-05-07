import { Table, Button } from 'antd';

const columns = [
     {
          title: 'Masa No.',
          dataIndex: 'tableNo',
          key: 'tableNo',
     },
     {
          title: 'Toplam Fiyat',
          dataIndex: 'totalPrice',
          key: 'totalPrice',
     },
     {
          title: 'Actions',
          key: 'actions',
          // eslint-disable-next-line no-unused-vars
          render: (_text, _record) => (
               <span>
                    <Button type="primary" style={{ marginRight: 8 }}>Detay</Button>
                    <Button type="primary">Tamamlandı</Button>
               </span>
          ),
     },
];

const data = [
     {
          key: '1',
          tableNo: '1',
          totalPrice: '$100',
     },
     {
          key: '2',
          tableNo: '2',
          totalPrice: '$150',
     },
     {
          key: '3',
          tableNo: '3',
          totalPrice: '$120',
     },
];

const TableComponent = () => {
     return (
          <Table columns={columns} dataSource={data} />
     );
};

export default TableComponent;
