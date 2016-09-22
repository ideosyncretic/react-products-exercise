import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import './App.css'
import { Browse } from './browse'
import { Cart } from './cart'
import { Product } from './pdp'

class App extends Component {
  render () {
    return (
      <div className='page'>
        <nav>
          <IndexLink to='/' activeClassName='active'><button>Browse</button></IndexLink>
          <Link to='/cart' activeClassName='active'><button>Cart</button></Link>
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export {App, Browse, Cart, Product};
