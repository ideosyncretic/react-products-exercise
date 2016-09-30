import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import {App, Browse, Cart, ProductDetail} from './App';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Browse}/>
      <Route path="product/:url" component={ProductDetail}/>
      <Route path="cart" component={Cart}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
