import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Dashboard />} />
      </Switch>
    </Router>
  );
};

export default App;
