import React, { Component } from 'react';
import './browse.css';
import dataSample from './products.json';

const Browse = React.createClass({
  render () {
    return (
      <div className="main">
        <ProductFilterBox data={dataSample} />
        <FilterableProductList />
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

const FilterableProductList = React.createClass({
  render () {
    return (
      <div className="filterable-product-list">
        Test
      </div>
    )
  }
})

export { Browse, ProductFilterBox, ProductFilterList }
