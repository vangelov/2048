
import React from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';
import './style.css';

export function Board(props) {
  const { board } = props;

  return (
    <table>
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td key={j}>
                <Cell value={value} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    board: state.game.board
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
