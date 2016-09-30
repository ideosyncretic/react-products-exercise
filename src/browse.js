import React, { Component } from 'react'
import {Link} from 'react-router'
import './browse.css'

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
        <ProductListContainer products={this.props.products} cart={this.props.cart}
        brand={this.state.brand} price={this.state.price}
        addToCart={this.props.addToCart} removeFromCart={this.props.removeFromCart} />
      </div>
    )
  }
}

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
    {this.props.filters.map(filter => {
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
        {filter.values.map(value => {
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

class ProductListContainer extends Component {
  render() {
    return (
      <div className='product-list-container'>
        <ProductList products={this.props.products} cart={this.props.cart}
          brand={this.props.brand} price={this.props.price} addToCart={this.props.addToCart} removeFromCart={this.props.removeFromCart}/>
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
    // readable variables
    var products = this.props.products
    var brandFilters = self.props.brand
    var priceFilters = self.props.price
    var hasBrandFilter = self.props.brand.length
    var hasPriceFilter = self.props.price.length

    return (
      products.map(
        product => {
          // for rendering Product component
          var displayProduct = <Product key={product.image.slice(0,-4)} product={product} cart={self.props.cart} addToCart={self.props.addToCart} removeFromCart={this.props.removeFromCart}/>

          // finds products with matching brand
          var filterByBrand = brandFilters.indexOf(fixCase(product.brand)) > -1

          function fixCase(value) {
            if (value === value.toUpperCase() || value === value.toLowerCase) {
              value = value.toLowerCase()
              return value.charAt(0).toUpperCase() + value.slice(1)
            }
            else return value
          }

          // finds products with matching price ranges
          var filterByPrice = priceFilters.map(
              price => {
                // separate lower and upper limit
                var range = price.split('-')
                // display product within range (inclusive)
                if (range[0] <= product.price && product.price <= range[1]) {
                  return displayProduct
                }
                return true
              }
            )

          // decision tree
          if (!hasBrandFilter && !hasPriceFilter) {
            return displayProduct
          }
          if (filterByBrand && !hasPriceFilter) {
            return displayProduct
          }
          if (hasPriceFilter && !hasBrandFilter) {
            return filterByPrice
          }
          if (hasBrandFilter && hasPriceFilter) {
            if (filterByBrand) {
              return filterByPrice
            }
          }
          return true
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
    this.cartAction = this.cartAction.bind(this)
  }

  handleClickAdd(e, product){
    e.preventDefault()
    this.props.addToCart(this.props.product)
  }

  handleClickRemove(e, product){
    e.preventDefault()
    this.props.removeFromCart(this.props.product)
  }

  cartAction(product) {
    if (this.props.cart.findIndex(findItem) > -1) {
      return <button className='product-cta__add-to-cart-button' onClick={e => this.handleClickRemove(e, product)}>Remove from cart</button>
    }
    else {
      return <button className='product-cta__add-to-cart-button' onClick={e => this.handleClickAdd(e, product)}>Add to cart</button>
    }

    function findItem (item) {
      // using unique image names sans suffix as makeshift product id
      if (item.image.slice(0,-4) === product.image.slice(0,-4) && item.name === product.name) {
        return item
      }
    }
  }

  render() {
    var product = this.props.product
    return (
      <div className='product' key={product.image.slice(0,-4)}>
        <Link to={`/product/${product.image.slice(0,-4)}`}>
        <div className='product-content'>
          <div className='product-info'>
            <img src={require('./img/' + product.image)} alt='product' />
            <span className='product-info__name'>{product.name}</span>
            <span className='product-info__measurement'>{product.measurement}</span>
          </div>
          <div className='product-cta'>
            <span className='product-cta__price'><strong>${product.price}</strong></span>
            {this.cartAction(product)}
          </div>
        </div>
        </Link>
      </div>
    )
  }
}

export { Browse, Product }
