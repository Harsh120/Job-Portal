import './App.css';
import TopNavBar from './Components/TopNavBar/TopNavBar';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom'; 

import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <TopNavBar />
        <Switch> 
          <Route exact path='/' component={Home} />
        </Switch> 
    </div>
  );
}

export default App;
