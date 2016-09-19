import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory} from 'react-router';
import App from './App';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>,
  document.getElementById('root')
);
