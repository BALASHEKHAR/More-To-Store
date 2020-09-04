import React from 'react';/*
import Favourite from './components/favourite';
import Home from './components/Home';
import Settings from './components/Settings';
import ErrorPage404 from './components/ErrorPage404';
import Login from './components/Login';
import Signup from './components/Signup';
import PasswordSent from './components/passwordSent'
import Auth from './components/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
*/
function App() {
  return (
    <div className="App">
    <h1>hi there</h1>
    </div>
     /*<Router>
     <Switch>

      <Route path="/home">
      <Auth>
      <Home/>
      </Auth>
      </Route>

      <Route path="/forget_password">
      <PasswordSent/>
      </Route>

      <Route path="/settings">
      <Settings/>
      </Route>

      <Route path="/favourite">
      <Favourite/>
      </Route>

      <Route exact path="/Login">
      <Auth nonAuth={true}>
      <Login />
      </Auth>
      </Route>
      <Route exact path="/signup">
      <Auth nonAuth={true}>
      <Signup/>
      </Auth>
      </Route>
      <Route path="*" 
      render={()=><ErrorPage404 />}
      />
      </Switch>
     </Router>*/
    
  ); 
}

export default App;
