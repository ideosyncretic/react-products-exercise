import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory} from 'react-router';
import {App, Browse, Cart, Product} from './App';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Browse}/>
      <Route path="/product/:productId" component={Product}/>
      <Route path="cart" component={Cart}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
