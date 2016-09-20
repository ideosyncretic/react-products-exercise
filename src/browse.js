import React from 'react';
import './browse.css';
import dataSample from './products.json';

const Browse = React.createClass({
  render () {
    return (
      <div className="main">
        <ProductFilterBox data={dataSample} />
        <ProductList data={dataSample} />
      </div>
    )
  }
})

const ProductFilterBox = React.createClass({
  render () {
    return (
      <div className="product-filter-box">
        <ProductFilterList data={this.props.data} />
      </div>
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

const ProductList = React.createClass({
  render () {
    var productCard = this.props.data.products.map(function(product) {
      return (
        <div className="product-list__card">
          <div className="product-info">
            <img src={require('./img/' + product.image)} alt="product" />
            <span className="product-info__name">{product.name}</span>
            <span className="product-info__measurement">{product.measurement}</span>
          </div>
          <div className="product-cta">
            <span className="product-cta__price"><strong>${product.price}</strong></span>
            <button className="product-cta__add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      )
    })
    return (
      <div className="product-list">
        {productCard}
      </div>
    )
  }
})



export { Browse, ProductFilterBox, ProductFilterList, ProductList }
