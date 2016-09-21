import React, { Component } from 'react'
import {Link, hashHistory} from 'react-router'
import $ from 'jquery'
import './browse.css'
import Product from './pdp'
import dataSample from './products.json'

class Browse extends Component {
  render() {
    return (
      <div className='main'>
        <ProductFilterContainer />
        <ProductListContainer />
      </div>
    )
  }
}

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
    return <div className='product-filter-list'>{this.props.productFilters.map(function(productFilter) {
      // render each filter category
      return (
        <ul>
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
        </ul>
      )
    })}</div>
  }
}

class ProductListContainer extends Component {
  constructor() {
    super();
    this.state = { products: [] }
  }

  componentDidMount() {
    $.ajax({
      url: "https://raw.githubusercontent.com/sprazzeus/react-products-exercise/development/src/products.json",
      dataType: 'json',
      success: function(data) {
        this.setState({products: data.products});
      }.bind(this)
    });
  }

  render() {
    return (
      <div className='product-list-container'>
        <ProductList products={this.state.products} />
      </div>
    )
  }
}

class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="product-list">
        {this.props.products.map(function(product) {
          return (
            <Link to={`/product/${product.image.slice(0,-4)}`}>
            <div className='product-list__card' key={product.image.slice(0,-4)}>
              <div className='product-info'>
                <img src={require('./img/' + product.image)} alt='product' />
                <span className='product-info__name'>{product.name}</span>
                <span className='product-info__measurement'>{product.measurement}</span>
              </div>
              <div className='product-cta'>
                <span className='product-cta__price'><strong>${product.price}</strong></span>
                <button className='product-cta__add-to-cart-button'>Add to Cart</button>
              </div>
            </div></Link>
            )
          })
        }
    </div>
    )
  }
}

export { Browse }
