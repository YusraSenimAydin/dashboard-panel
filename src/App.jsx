import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import OrdersPage from './components/Order/Orders';
import PastOrdersPage from './components/PastOrders/PastOrders'; 

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/orders">
          <Dashboard pageTitle="Siparişler" />
          <OrdersPage />
        </Route>
        <Route path="/past-orders">
          <Dashboard pageTitle="Geçmiş Siparişler" />
          <PastOrdersPage />
        </Route>
        <Route path="/">
          <Dashboard pageTitle="Ana Sayfa" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
