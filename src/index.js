import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import {App, Browse, Cart, Product} from './App';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Browse}/>
      <Route path="/product/:productId" component={Product}/>
      <Route path="cart" component={Cart}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
