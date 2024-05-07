/* eslint-disable react/prop-types */
import { Layout } from 'antd';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import TableComponent from '../Table/Table';

const { Content } = Layout;

const Dashboard = ({pageTitle}) => {
  let match = useRouteMatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route path={`${match.path}`}>
                <h2>{pageTitle}</h2>
              </Route>
            </Switch>
            <Switch>
              <Route path={`${match.path}/orders`}>
                <div className="breadcrumb">{pageTitle} / Siparişler</div>
                <TableComponent pageTitle={pageTitle} />
              </Route>
              <Route path={`${match.path}/past-orders`}>
                <div className="breadcrumb">{pageTitle} / Geçmiş Siparişler</div>
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
