import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import dataSample from './products.json'
import './App.css'
import { Browse } from './browse'
import { Cart } from './cart'
import { ProductDetail } from './pdp'

class App extends Component {
  constructor() {
    super()
    this.state = {
      filters: [],
      products: [],
      cart: []
    }
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  componentWillMount() {
    var filterArray = []
    var productArray = []
    var self = this

    // set filters from local json as app state
    dataSample.filters.map(
      function(filter) {
        // temp valueArray for checking against
        var valueArray = []
        filter.values.map(function(value) {
          // fix case
          function fixCase(value) {
            if (value === value.toUpperCase() || value === value.toLowerCase()) {
              value = value.toLowerCase()
              return value.charAt(0).toUpperCase() + value.slice(1)
            }
            else return value
          }
          // check against temp array
          if (valueArray.indexOf(value) === -1) {
            valueArray.push(fixCase(value))
          }
          return true
        })
        // use cleaned values
        filter.values = valueArray
        // push to final
        filterArray.push(filter)
        self.setState({filters: filterArray})
        return true
      }
    )
    // set products form local json as app state
    dataSample.products.map(
      function(product) {
        product.id = product.image.slice(0,-4) + new Date().getTime()
        productArray.push(product)
        self.setState({products: productArray})
        return true
      }
    )
  }

  // function takes a product object
  addToCart(itemAdded){
    // adds only if not already present in cart
    if (this.state.cart.findIndex(findItem) === -1) {
      var newCart = this.state.cart.splice(0)
      newCart.push(itemAdded)
      this.setState({cart: newCart})
    }

    function findItem (item) {
      if (item.id === itemAdded.id) {
        return item
      }
    }
  }

  // function takes a product object
  removeFromCart(itemRemoved){
    var oldCart = this.state.cart // array
    var newCart = this.state.cart.splice(0) // cloned array

    newCart = newCart.filter(function(item) {
      return item.id !== itemRemoved.id
    }) // remove item from clone array

    this.setState({cart: newCart}) // submit new cart array
  }

  render () {
    return (
      <div className='page'>
        <nav>
          <IndexLink to='/' activeClassName='active'><button>Browse</button></IndexLink>
          <Link to='/cart' activeClassName='active'><button>Cart</button></Link>
        </nav>

        {React.cloneElement(this.props.children, {
          filters: this.state.filters,
          products: this.state.products,
          cart: this.state.cart,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart
        })}
      </div>
    )
  }
}

export {App, Browse, Cart, ProductDetail};
