import React, { Component } from 'react';

import { Menu } from './Menu';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>2048</h1>
        <Menu />
      </div>
    );
  }
}

export default App;
