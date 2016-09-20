import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory} from 'react-router';
import {App, Browse} from './App';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Browse}>
      </IndexRoute>
    </Route>
  </Router>,
  document.getElementById('root')
);
