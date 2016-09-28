import React, { Component } from 'react'
import {Link} from 'react-router'
var update = require('react-addons-update');
import './browse.css'

/* Browse */

class Browse extends Component {

  constructor() {
    super()
    this.state = {
      activeFilters: {}
    }
    this.setFilters = this.setFilters.bind(this)
    this.addFilterCategory = this.addFilterCategory.bind(this)
  }

  addFilterCategory(filterCategory) {
    console.log('Add filter category running ' + filterCategory)
    var finalFilterCategories = update(this.state.activeFilters, {$merge:
      {[filterCategory]: ['Test']}
    })
    this.setState({
      activeFilters: {finalFilterCategories}
    })
  }

  setFilters(filters) {
    this.setState({activeFilters: filters})
    console.log('active filters: ' + this.state.activeFilters)
  }

  render() {
    return (
      <div className='main'>
        <FilterListContainer filters={this.props.filters} addFilterCategory={this.addFilterCategory} activeFilters={this.state.activeFilters} setFilters={this.setFilters}/>
        <ProductListContainer products={this.props.products} addToCart={this.props.addToCart} />
      </div>
    )
  }
}

/* Product Filter */

class FilterListContainer extends Component {
  render() {
    return (
      <div className='product-filter-container'>
        <FilterList filters={this.props.filters} addFilterCategory={this.props.addFilterCategory} activeFilters={this.props.activeFilters} setFilters={this.props.setFilters}/>
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
        <Filter key={filter.name} category={filter.name} filter={filter} addFilterCategory={self.props.addFilterCategory} activeFilters={self.props.activeFilters} setFilters={self.props.setFilters}/>
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
    var activeFilters = this.props.activeFilters
    var filterValue = event.target.value
    var isChecked = event.target.checked
    if (isChecked) {
      activeFilters.push(filterValue)
    }
    else if (!isChecked) {
      activeFilters.splice(activeFilters.indexOf(filterValue), 1)
    }
    this.props.setFilters(activeFilters)
    console.log(this.props.category)
  }

  componentWillMount() {
    var filterCategory = this.props.category
    this.props.addFilterCategory(filterCategory)
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
        <ProductList products={this.props.products} addToCart={this.props.addToCart}/>
      </div>
    )
  }
}

class ProductList extends Component {

  render() {
    var self = this
    return (
      <div className="product-list">
        {this.props.products.map(
          function (product) {
            return (
             <Product key={product.image.slice(0,-4)} product={product} addToCart={self.props.addToCart}/>
            )
          })
        }
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
      <div className='product-list__card' key={product.image.slice(0,-4)}>
        <Link to={`/product/${product.image.slice(0,-4)}`}>
        <div className='product-info'>
          <img src={require('./img/' + product.image)} alt='product' />
          <span className='product-info__name'>{product.name}</span>
          <span className='product-info__measurement'>{product.measurement}</span>
        </div>
        <div className='product-cta'>
          <span className='product-cta__price'><strong>${product.price}</strong></span>
          <button className='product-cta__add-to-cart-button' onClick={handleClick}>Add to Cart</button>
        </div></Link>
      </div>
    )
  }
}

export { Browse, Product }
