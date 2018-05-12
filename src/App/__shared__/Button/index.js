import React from 'react';

import './style.css';

export default function Button(props) {
  const { label, onClick, enabled } = props;

  function handleClick() {
    onClick();
  }

  let className = 'Button';

  if (!enabled) {
    className += ' Button-Disabled';
  }

  return <div className={className} onClick={handleClick}>{label}</div>
}

Button.defaultProps = {
  enabled: true
};
