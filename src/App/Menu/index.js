import React from 'react';

import './style.css';
import Button from '../__shared__/Button';

export function Menu(props) {
  return (
    <div className="Menu">
      <h1>Test</h1>
      <Button label="New Game" />
      <Button label="Redo" />

      <div>Current score</div>
    </div>
  );
}
