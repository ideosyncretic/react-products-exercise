import React, { Component } from 'react'
import {Product} from './browse'

class Cart extends Component {
  render () {
    return (
      <div className='main'>
        {this.props.cart.map(
          function (product) {
            return (
             <Product key={product.image.slice(0,-4)} details={product}/>
            )
          }
        )}
      </div>
    )
  }
}

export { Cart }
