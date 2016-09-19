import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="page">
        <nav>
          <Link to ="/" activeClassName="active"><button>Browse</button></Link>
          <Link to ="/cart" activeClassName="active"><button>Cart</button></Link>
        </nav>

        <div className="main">
        </div>
      </div>
    );
  }
}

export default App;
