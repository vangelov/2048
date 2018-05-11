import React from 'react';

import './style.css';

export default function Button(props) {
  const { label } = props;
  return <div className="Button">{label}</div>
}
