import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Orders from './pages/Orders';
import PastOrders from './pages/PastOrders';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/past-orders" element={<PastOrders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
