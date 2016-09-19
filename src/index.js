import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import App from './App';
import './index.css';

var {
  Router,
  Route,
  IndexRoute,
  IndexLink,
  Link
} = ReactRouter

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>,
  document.getElementById('root')
);
