import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory} from 'react-router';
import './App.css';
import { Browse, ProductFilterBox, ProductFilterList } from './browse'

class App extends Component {
  render() {
    return (
      <div className="page">
        <nav>
          <Link to ="/" activeClassName="active"><button>Browse</button></Link>
          <Link to ="/cart" activeClassName="active"><button>Cart</button></Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export {App, Browse};
