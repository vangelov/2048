
import React from 'react';

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
