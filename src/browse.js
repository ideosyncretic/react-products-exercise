import React, { Component } from 'react';
import $ from 'jquery';
import './browse.css';
import dataSample from './products.json';

const Browse = React.createClass({
  render() {
    return (
      <div className='main'>
        <ProductFilterContainer />
        <ProductList data={dataSample} />
      </div>
    )
  }
})

class ProductFilterContainer extends Component {
  constructor() {
    super();
    this.state = { productFilters: [] }
  }

  componentDidMount() {
    $.ajax({
      url: "https://raw.githubusercontent.com/sprazzeus/react-products-exercise/development/src/products.json",
      dataType: 'json',
      success: function(data) {
        this.setState({productFilters: data.filters});
      }.bind(this)
    });
  }

  render() {
    return (
      <div className='product-filter-container'>
        <ProductFilterList productFilters={this.state.productFilters} />
      </div>
    )
  }
}

class ProductFilterList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <ul>{this.props.productFilters.map(function(productFilter) {
      // render each filter category
      return (
        <li>
          <h4>{productFilter.name}</h4>
          {productFilter.values.map(function(value) {
            // render each filter within category
            return (
              <li>
                <label for={'option' + value}>
                  <input id={'option' + value} type='checkbox' name='field' value='option'/>{value}
                </label>
              </li>
            )
          })}
        </li>
      )
    })}</ul>
  }
}

const ProductList = React.createClass({
  render() {
    var productCard = this.props.data.products.map(function(product) {
      return (
        <div className='product-list__card'>
          <div className='product-info'>
            <img src={require('./img/' + product.image)} alt='product' />
            <span className='product-info__name'>{product.name}</span>
            <span className='product-info__measurement'>{product.measurement}</span>
          </div>
          <div className='product-cta'>
            <span className='product-cta__price'><strong>${product.price}</strong></span>
            <button className='product-cta__add-to-cart-button'>Add to Cart</button>
          </div>
        </div>
      )
    })
    return (
      <div className='product-list'>
        {productCard}
      </div>
    )
  }
})



export { Browse, ProductFilterContainer, ProductFilterList, ProductList }
