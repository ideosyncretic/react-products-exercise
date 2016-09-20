import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory} from 'react-router';
import './App.css';
import dataSample from './products.json'

class App extends Component {
  render() {
    return (
      <div className="page">
        <nav>
          <Link to ="/" activeClassName="active"><button>Browse</button></Link>
          <Link to ="/cart" activeClassName="active"><button>Cart</button></Link>
        </nav>

        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const Browse = React.createClass({
  render () {
    return (
      <div>
        <ProductFilterBox data={dataSample} />
        <FilterableProductList />
      </div>
    )
  }
})

const FilterableProductList = React.createClass({
  render () {
    return (
      <div className="filterable-products-list">
      </div>
    )
  }
})

const ProductFilterBox = React.createClass({
  render () {
    return (
      <ProductFilterList data={this.props.data} />
    )
  }
})

const ProductFilterList = React.createClass({
  render: function() {
    var productFilterCategory = this.props.data.filters.map(function(filter) {
      return (
        <ul>
          <h4>{filter.name}</h4>
          {filter.values.map(function(value) {
            return (
              <li>
                <label for={"option" + value}>
                  <input id={"option" + value} type="checkbox" name="field" value="option"/>{value}
                </label>
              </li>
            )
          })}
        </ul>
      );
    });
    return (
      <form className="productFilterList">
        {productFilterCategory}
      </form>
    );
  }
});

export {App, Browse};
