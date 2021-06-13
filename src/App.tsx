import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Completion from './components/Completion/Completion';
import { createContext, useState } from 'react';
import GetFile from './components/GetFile/GetFile';
import LastScreen from './components/LastScreen/LastScreen';
export const UserContext = createContext(null);

function App() {
  const [compData, setCompData] = useState({state: false});

  return (
    <UserContext.Provider value={[compData, setCompData]}>
      <Router>
        <Navbar />
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/completion">
            <Completion />
          </Route>

          <Route path="/getfile">
            <GetFile />
          </Route>

          <Route path="/lastscreen">
            <LastScreen />
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
