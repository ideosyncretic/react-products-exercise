import React, { Component } from 'react'
import {Product} from './browse'

class Cart extends Component {

  render () {
    return (
      <div className='main'>
        {this.props.cart.map(
          product => {
            return (
             <Product key={product.image.slice(0,-4)} product={product} cart={this.props.cart} addToCart={this.props.addToCart} removeFromCart={this.props.removeFromCart}/>
            )
          }
        )}
      </div>
    )
  }
}

export { Cart }
