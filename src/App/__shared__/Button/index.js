import React from 'react';

import './style.css';

export default function Button(props) {
  const { label, onClick } = props;

  function handleClick() {
    onClick(); 
  }

  return <div className="Button" onClick={handleClick}>{label}</div>
}
