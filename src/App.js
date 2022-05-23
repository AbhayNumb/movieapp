import './App.css';
import Top from './Components/Top.js';
import Banner from './Components/Banner';
import List from './Components/List';
import Favourites from './Components/Favourites';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Top/>
      <Switch>
        <Route path='/' exact render={(props) => (
          <>
            <Banner {...props} />
            <List {...props} />
          </>
        )} />
        <Route path='/favourites' component={Favourites} />
      </Switch>
    </Router>
  );
}

export default App;
