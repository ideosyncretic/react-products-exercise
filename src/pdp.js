import React, { Component } from 'react'
import {Link, hashHistory} from 'react-router'
import $ from 'jquery'
import dataSample from './products.json'

class Product extends Component {
  componentDidMount() {
  this.setState({
    product: findCurrentProduct(this.props.params)
  })
}

render() {
  return (
    <div>
      <h2>HI
      </h2>
    </div>
  )
}
}

// {sampleData.products.find(function(product){
//   return product.image
// })}

export { Product }
