
import React from 'react';

import Cell from './Cell';
import './style.css';

export function Board(props) {
  return (
    <table>
      <tr>
        <td>
          <Cell value="4" />
        </td>

        <td>
          <Cell value="256" />
        </td>
      </tr>

      <tr>
        <td>
          <Cell />
        </td>

        <td>
          <Cell />
        </td>
      </tr>
    </table>
  );
}
