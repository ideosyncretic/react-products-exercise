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
      cart: [
        {
          "name": "NutriWell Barley",
          "price": "2.25",
          "brand": "NutriWell",
          "desc": " ",
          "measurement": "1L",
          "image": "product1.jpg"
        },
        {
          "name": "Marigold Uji Cha Momo Green Tea",
          "price": "2.25",
          "brand": "MARIGOLD",
          "desc": "MARIGOLD UJI CHA is the first ready-to-drink pasteurised Japanese green tea in Singapore. Harvested from the cool, misty hills of Uji, Kyoto, premium green tea in MARIGOLD UJI CHA hails from the finest of tea-growing regions. The first exciting flavour, Yuzu Green Tea, is made with pure squeezed yuzu juice, a rare citrus from Japan. MARIGOLD UJI CHA Yuzu Green tea, carefully blended for the most delicate tea drinking experience. Taste the artisan tea that refreshes your senses.",
          "measurement": "1L",
          "image": "product6.jpg"
        }
      ]
    }
  }

  addToCart(){
    console.log('addToCart ran')
  }

  render () {
    return (
      <div className='page'>
        <nav>
          <IndexLink to='/' activeClassName='active'><button>Browse</button></IndexLink>
          <Link to='/cart' activeClassName='active'><button>Cart</button></Link>
        </nav>

        {React.cloneElement(this.props.children, {
          cart: this.state.cart,
          addToCart: this.addToCart.bind(this)
        })}
      </div>
    )
  }
}

export {App, Browse, Cart, Product};
