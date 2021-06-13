import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Navbar />
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
