import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { noop } from 'lib/utils'


export const BUTTON_TYPES = ['button', 'reset', 'submit'];

const ButtonSpinner = ({
  spin = false,
  className = '',
  children = null,
  type = BUTTON_TYPES[0],
  onClick = noop,
  disabled = false
}) => {
  return (
    <button type="submit" className={`${className} ${spin ? 'animate' : ''} btn-spinner`} onClick={onClick} disabled={disabled || spin}>
      <span>{children}</span>
    </button>
  );
};

ButtonSpinner.propTypes = {
  spin: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(BUTTON_TYPES),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default ButtonSpinner;
