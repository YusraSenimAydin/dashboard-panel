
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-200 p-4">
        {/* Logo */}
        <div className="text-xl font-bold mb-4">Logo</div>
        {/* Links */}
        <div className="mb-4">
          <Link to="/orders" className="block py-2 text-blue-600 hover:underline">Siparişler</Link>
        </div>
        <div>
          <Link to="/past-orders" className="block py-2 text-blue-600 hover:underline">Geçmiş Siparişler</Link>
        </div>
      </aside>

      {/* Content */}
      <div className="w-3/4 p-4">
        {/* Breadcrumb */}
        <nav className="text-gray-600 text-sm mb-4">Siparişler / Detay</nav>
        
        {/* Orders Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Masa No.</th>
              <th className="border p-2">Toplam Fiyat</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Orders will be listed here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
