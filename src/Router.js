import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import MainIndex from './App';
export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <MainIndex />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
