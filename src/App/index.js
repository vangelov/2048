import React, { Component } from 'react';

import { Menu } from './Menu';
import { Board } from './Board';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>2048</h1>
        <Menu />
        <h2>Score: 10</h2>
        <Board board={[[4, 4], [2, 2]]} />
      </div>
    );
  }
}

export default App;
