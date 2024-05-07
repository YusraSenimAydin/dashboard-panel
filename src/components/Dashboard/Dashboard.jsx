import { Layout } from 'antd';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import OrdersPage from '../Order/Orders'; 
import PastOrdersPage from '../PastOrders/PastOrders'; 

const { Content } = Layout;


const Dashboard = () => {
  let match = useRouteMatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route exact path={match.path}>
                <h2>Anasayfa</h2>
              </Route>
              <Route path={`${match.path}/orders`}>
                <OrdersPage />
              </Route>
              <Route path={`${match.path}/past-orders`}>
                <PastOrdersPage />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
