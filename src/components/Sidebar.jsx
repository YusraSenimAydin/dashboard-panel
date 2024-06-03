import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) => {
    return location.pathname === path
      ? 'block py-2.5 px-4 rounded bg-blue-500 text-white'
      : 'block py-2.5 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-200';
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white">
      <div className="p-4 text-xl font-bold">Emin Usta</div>
      <nav className="mt-10">
        <Link to="/orders" className={linkClass('/orders')}>
          Siparişler
        </Link>
        <Link to="/past-orders" className={linkClass('/past-orders')}>
          Geçmiş Siparişler
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
