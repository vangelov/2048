import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Board from './Board';
import * as actions from '../state/actions';
import './style.css';

class App extends Component {

  componentWillMount() {
    this.props.onWillMount();
  }

  componentDidMount() {
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown);
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onWillMount: () => {
      dispatch(actions.moveInit());
    },
    onKeyUp: () => {
      dispatch(actions.moveUp());
    },
    onKeyRight: () => {
      dispatch(actions.moveRight());
    },
    onKeyDown: () => {
      dispatch(actions.moveDown());
    },
    onKeyLeft: () => {
      dispatch(actions.moveLeft());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
