import React from 'react';

import './style.css';
import Button from '../__shared__/Button';
import SizeLabel from './SizeLabel';

export function Menu(props) {
  return (
    <div className="Menu">
      <SizeLabel />
      <Button label="New Game" />
      <Button label="Redo" />
    </div>
  );
}
