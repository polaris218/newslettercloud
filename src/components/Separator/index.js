import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export default function Separator({ position = 'left', className = '' }) {
  return (
    <div className={`separator ${position} ${className}`}>
      <hr/>
    </div>
  );
}

Separator.propTypes = {
  position: PropTypes.string,
  className: PropTypes.string
};
