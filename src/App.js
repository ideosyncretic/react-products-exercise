import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import './App.css'
import { Browse } from './browse'
import { Cart } from './cart'
import { Product } from './pdp'

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    }
  }

  addToCart(item){
    console.log("Item added:" + item)
  }

  render () {
    return (
      <div className='page'>
        <nav>
          <IndexLink to='/' activeClassName='active'><button>Browse</button></IndexLink>
          <Link to='/cart' activeClassName='active'><button>Cart</button></Link>
        </nav>

        {React.cloneElement(this.props.children, {
          cart: this.state.cart, addToCart: this.addToCart.bind(this)
        } )}
      </div>
    )
  }
}

export {App, Browse, Cart, Product};
