import React from 'react';
import PropTypes from 'prop-types';

export { CardHeaderNav } from './CardHeaderNav';

export const CardHeader = ({ children = null, className = '' }) => {
  return <div className={`card-header ${className}`}>{children}</div>;
};

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export const CardBody = ({ children = null, className = '' }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export const Card = ({ children = null, className = ''}) => {
  return <div className={`card ${className}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export const CardFooter = ({ children = null, className = '' }) => {
  return <div className={`card-footer ${className}`}>{children}</div>;
};

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
