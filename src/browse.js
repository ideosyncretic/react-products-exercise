import React, { Component } from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import './browse.css'

/* Browse */

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      products: []
    }
  }

  /* fetch data */
  componentWillMount() {
    $.ajax({
      url: "https://raw.githubusercontent.com/sprazzeus/react-products-exercise/development/src/products.json",
      dataType: 'json',
      success: function(data) {
        this.setState({
          filters: data.filters,
          products: data.products
        });
      }.bind(this)
    });
  }

  render() {
    return (
      <div className='main'>
        <ProductFilterContainer filters={this.state.filters}/>
        <ProductListContainer products={this.state.products} addToCart={this.props.addToCart} />
      </div>
    )
  }
}

/* Product Filter */

class ProductFilterContainer extends Component {
  render() {
    return (
      <div className='product-filter-container'>
        <ProductFilterList filters={this.props.filters} />
      </div>
    )
  }
}

class ProductFilterList extends Component {
  render() {
    return <div className='product-filter-list'>
    {/* render each filter category */}
    {this.props.filters.map(function(filter) {
      return (
        <ul key={filter.name}>
          <h4>{filter.name}</h4>
          {/* render each filter within category */}
          {filter.values.map(function(value) {
            return (
              <li key={value}>
                <label htmlFor={'option' + value}>
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

/* Product List (filterable) */

class ProductListContainer extends Component {
  render() {
    return (
      <div className='product-list-container'>
        <ProductList products={this.props.products} addToCart={this.props.addToCart}/>
      </div>
    )
  }
}

class ProductList extends Component {

  _addItem(event){
    event.preventDefault()
    alert('Item added!')
  }

  render() {
    var self = this
    return (
      <div className="product-list">
        {this.props.products.map(
          function (product) {
            return (
             <Product key={product.image.slice(0,-4)} details={product} addItem={self._addItem} addToCart={self.props.addToCart}/>
            )
          })
        }
      </div>
    )
  }
}

class Product extends Component {
  render() {
    var details = this.props.details
    var addItem = this.props.addItem
    return (
      <Link to={`/product/${details.image.slice(0,-4)}`}>
      <div className='product-list__card' key={details.image.slice(0,-4)}>
        <div className='product-info'>
          <img src={require('./img/' + details.image)} alt='product' />
          <span className='product-info__name'>{details.name}</span>
          <span className='product-info__measurement'>{details.measurement}</span>
        </div>
        <div className='product-cta'>
          <span className='product-cta__price'><strong>${details.price}</strong></span>
          <button className='product-cta__add-to-cart-button' onClick={addItem}>Add to Cart</button>
        </div>
      </div></Link>
    )
  }
}

export { Browse, Product }
