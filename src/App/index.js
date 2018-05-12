import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Board from './Board';
import { getScore, getBoardSize, canMakeMoreMoves } from '../state/selectors';
import * as actions from '../state/actions';
import './style.css';

class App extends Component {

  componentWillMount() {
    const { onWillMount, boardSize } = this.props;
    onWillMount(boardSize);
  }

  componentDidMount() {
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    const body = document.querySelector('body');
    body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ keyCode }) => {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    const z = 90;

    if (keyCode === up) {
      this.props.onKeyUp();
    } else if (keyCode === right) {
      this.props.onKeyRight();
    } else if (keyCode === down) {
      this.props.onKeyDown();
    } else if (keyCode === left) {
      this.props.onKeyLeft();
    } else if (keyCode === z) {
      this.props.onKeyZ();
    }
  }

  render() {
    const { score, canMakeMoreMoves } = this.props;

    return (
      <div className="App">
        <h1>2048</h1>
        <Menu />
        <h2>Score: {score} {canMakeMoreMoves ? null : '(Game over)'}</h2>
        <Board />
      </div>
    );
  }
}

App.propTypes = {
  score: PropTypes.number,
  boardSize: PropTypes.number,
  onWillMount: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyRight: PropTypes.func,
  onKeyLeft: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyZ: PropTypes.func,
  canMakeMoreMoves: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    score: getScore(state),
    boardSize: getBoardSize(state),
    canMakeMoreMoves: canMakeMoreMoves(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onWillMount: (boardSize) => {
      dispatch(actions.moveInit({ boardSize, onlyIfNoSavedState: true }));
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
    onKeyZ: () => {
      dispatch(actions.moveUndo())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
