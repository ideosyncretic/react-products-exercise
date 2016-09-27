import React, { Component } from 'react'
import {Product} from './browse'

class Cart extends Component {

  render () {
    console.log('Cart props' + this.props)
    return (
      <div className='main'>
        {this.props.cart.map(
          function (product) {
            return (
             <Product key={product.image.slice(0,-4)} product={product}/>
            )
          }
        )}
      </div>
    )
  }
}

export { Cart }
