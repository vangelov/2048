
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Cell from './Cell';
import { getBoard } from '../../state/selectors';
import './style.css';

export function Board(props) {
  const { board } = props;

  return (
    <table className="Board">
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

Board.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  )
};

const mapStateToProps = (state) => {
  return {
    board: getBoard(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
