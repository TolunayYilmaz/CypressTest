import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  // React Router 5
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.jsx';
import Success from './Success.jsx';
import Error from './Error.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> 
      <Switch>
        <Route exact path="/" component={Login} /> 
        <Route  path="/success" component={Success} /> 
        <Route  path="/error" component={Error} /> 
      </Switch>
    </Router>
  </StrictMode>
);
