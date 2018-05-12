import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Menu } from './Menu';
import Board from './Board';
import * as actions from '../state/actions';
import './style.css';

class App extends Component {

  componentDidMount() {
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown);

    this.props.onDidMount();
  }

  componentWillUnmount() {
    const body = document.querySelector('body');
    body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37

    if (e.keyCode === up) {
      this.props.onKeyUp();
    } else if (e.keyCode === right) {
      this.props.onKeyRight();
    } else if (e.keyCode === down) {
      this.props.onKeyDown();
    } else if (e.keyCode === left) {
      this.props.onKeyLeft();
    }
  }

  render() {
    return (
      <div className="App">
        <h1>2048</h1>
        <Menu />
        <h2>Score: 10</h2>
        <Board />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch(actions.gameNew());
    },
    onKeyUp: () => {
      dispatch(actions.boardMoveUp());
    },
    onKeyRight: () => {
      dispatch(actions.boardMoveRight());
    },
    onKeyDown: () => {
      dispatch(actions.boardMoveDown());
    },
    onKeyLeft: () => {
      dispatch(actions.boardMoveLeft());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
