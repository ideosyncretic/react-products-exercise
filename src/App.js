import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import $ from 'jquery'
import './App.css'
import { Browse } from './browse'
import { Cart } from './cart'
import { Product } from './pdp'

class App extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
      products: [],
      cart: []
    }
    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(itemAdded){
    this.setState((state) => ({ cart: state.cart.concat( itemAdded )}))
    console.log(this.state.cart)
    console.log('addToCart ran!')
  }

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
          addToCart: this.addToCart.bind(this)
        })}
      </div>
    )
  }
}

export {App, Browse, Cart, Product};
