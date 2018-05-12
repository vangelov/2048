import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../state/actions';
import { getBoardSize } from '../../../state/selectors';
import './style.css';

export function SizeLabel(props) {
  const { onSizeChange, size } = props;

  function handleChange(event) {
    onSizeChange(Number(event.target.value));
  }

  return (
    <div className="SizeLabel">
      Size: <input type="number" min="0" onChange={handleChange} value={size} />
    </div>
  );
}

SizeLabel.propTypes = {
  size: PropTypes.number,
  onSizeChange: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    size: getBoardSize(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSizeChange: (value) => {
      dispatch(actions.boardSizeUpdate(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SizeLabel);
