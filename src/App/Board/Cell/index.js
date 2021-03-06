
import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function Cell(props) {
  const { value } = props;

  return (
    <div className={`Cell Cell-Color-${value}`}>
      <div className="number">{value}</div>
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.number
};
