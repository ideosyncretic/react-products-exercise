import React, { Component } from 'react'
import './pdp.css'
import dataSample from './products.json'

class Product extends Component {
  constructor(props) {
      super(props);
      this._findProduct = this._findProduct.bind(this);
      this.state = {
        productId: this.props.params.productId,
        name: '',
        price: '',
        measurement: '',
        desc: '',
        image: ''
      }
  }

  componentWillMount() {
    this._findProduct()
  }

  _findProduct() {
    var currentProduct = this.state.productId
    var result = dataSample.products.find(function(product) {
      return ( product.image === (currentProduct + '.jpg') )
    })
    this.setState({
      name: result.name,
      price: result.price,
      measurement: result.measurement,
      desc: result.desc,
      image: result.image
    })
  }

  render() {
    return (
      <div className="main">
        <div className="product-detail">
          <h2>{this.state.name}</h2>

          <div className="details">
            <div className="details-image">
              <img src={require('./img/' + this.state.image)} alt="product" className="details-image__image" />
            </div>

            <div className="details-text">
              <h2 className="details-text__measurement">1L</h2>
              <h1 className="details-text__price">${this.state.price}</h1>
              <p className="details-text__desc">
                {this.state.desc}
              </p>
              <button className="details-text__add-to-cart-button"><h1>Add To Cart</h1></button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export { Product }
