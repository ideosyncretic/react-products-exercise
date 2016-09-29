import React, { Component } from 'react'
import {Link} from 'react-router'
// import update from 'react-addons-update'
import './browse.css'

/* Browse */

class Browse extends Component {

  constructor() {
    super()
    this.state = {
      brand: [],
      price: []
    }
    this.setFilters = this.setFilters.bind(this)
  }

  setFilters(category, filters) {
    this.setState({ [category] : filters
    })
    console.log(`Filter by ${category}: ${this.state[category]}`)
  }

  render() {
    return (
      <div className='main'>
        <FilterListContainer filters={this.props.filters} brand={this.state.brand} price={this.state.price} setFilters={this.setFilters}/>
        <ProductListContainer products={this.props.products}
        brand={this.state.brand} price={this.state.price}
        addToCart={this.props.addToCart} />
      </div>
    )
  }
}

/* Product Filter */

class FilterListContainer extends Component {
  render() {
    return (
      <div className='product-filter-container'>
        <FilterList filters={this.props.filters}
          brand={this.props.brand} price={this.props.price} setFilters={this.props.setFilters}/>
      </div>
    )
  }
}

class FilterList extends Component {
  render() {
    var self = this
    return <div className='product-filter-list'>
    {/* render each filter category */}
    {this.props.filters.map(function(filter) {
      return (
        <Filter key={filter.name} category={filter.name} filter={filter} brand={self.props.brand} price={self.props.price} setFilters={self.props.setFilters}/>
      )
    })}</div>
  }
}

class Filter extends Component {

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    var category = this.props.category
    var filterValue = event.target.value
    var isChecked = event.target.checked
    if (isChecked) {
      this.props[category].push(filterValue)
    }
    else if (!isChecked) {
      this.props[category].splice(this.props[category].indexOf(filterValue), 1)
    }
    // pass in category and new value array
    this.props.setFilters(category, this.props[category])
  }

  render() {
    var filter = this.props.filter
    var handleChange = this.handleChange
    return (
      <ul key={filter.name}>
        <h4>{filter.name}</h4>
        {/* render each filter within category */}
        {filter.values.map(function(value) {
          return (
            <li key={value}>
              <label htmlFor={value}>
                <input id={value} type='checkbox' name='field' value={value} onChange={handleChange}/>{value}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }
}

/* Product List (filterable) */

class ProductListContainer extends Component {
  render() {
    return (
      <div className='product-list-container'>
        <ProductList products={this.props.products}
          brand={this.props.brand} price={this.props.price} addToCart={this.props.addToCart}/>
      </div>
    )
  }
}

class ProductList extends Component {

  constructor() {
    super()
    this.filterProducts = this.filterProducts.bind(this)
  }

  filterProducts() {
    var self = this
    var products = this.props.products

    // loop through products, create new array of relevant products

    return (
      products.map(
        function(product) {
          // no filters
          if (!self.props.brand[0] && !self.props.price[0]) {
            return <Product key={product.image.slice(0,-4)} product={product} addToCart={self.props.addToCart}/>
          }
          // with brand filter only
          if (self.props.brand.indexOf(product.brand) !== -1 && !self.props.price[0]) {
            return <Product key={product.image.slice(0,-4)} product={product} addToCart={self.props.addToCart}/>
          }
          // with price filter only
          if (self.props.price[0]) {
            // map through price filters
            return (
              self.props.price.map(
                function(price) {
                  var range = price.split('-')
                  console.log(range)
                  // return product with price in range
                  if (range[0] < product.price && product.price < range[1]) {
                    return <Product key={product.image.slice(0,-4)} product={product} addToCart={self.props.addToCart}/>
                  }
                }
              )
            )
          }
        }
      )
    )
  }

  render() {
    return (
      <div className="product-list">

        {this.filterProducts()}
      </div>
    )
  }
}

class Product extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    event.preventDefault()
    this.props.addToCart(this.props.product)
  }

  render() {
    var product = this.props.product
    var handleClick = this.handleClick
    return (
      <div key={product.image.slice(0,-4)}>
        <Link to={`/product/${product.image.slice(0,-4)}`}>
        <div className='product-list__card'>
          <div className='product-info'>
            <img src={require('./img/' + product.image)} alt='product' />
            <span className='product-info__name'>{product.name}</span>
            <span className='product-info__measurement'>{product.measurement}</span>
          </div>
          <div className='product-cta'>
            <span className='product-cta__price'><strong>${product.price}</strong></span>
            <button className='product-cta__add-to-cart-button' onClick={handleClick}>Add to Cart</button>
          </div>
        </div>
        </Link>
      </div>
    )
  }
}

export { Browse, Product }
