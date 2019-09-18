import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { noop } from '../../lib/utils';

import './styles.scss';

export const ModalHeader = ({ onClose = noop, name = '', className = '' }) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title">{name}</h5>
      {onClose !== noop ? ( // do not show close button if onClose handler is not attached
        <button type="button" className="close" onClick={onClose}>
          <span>&times;</span>
        </button>
      ) : null}
    </div>
  );
};

ModalHeader.propTypes = {
  onClose: PropTypes.func,
  name: PropTypes.node,
  className: PropTypes.string
};

export const ModalBody = ({ children = null, className = '' }) => (
  <div className={`modal-body ${className}`}>{children}</div>
);
ModalBody.propTypes = { children: PropTypes.node, className: PropTypes.string };

export const ModalFooter = ({ children = null, className = '' }) => (
  <div className={`modal-footer ${className}`}>{children}</div>
);
ModalBody.propTypes = { children: PropTypes.node, className: PropTypes.string };

export class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string
  };

  static defaultProps = { children: null, onClose: noop, className: '', id: '' };

  container = document.getElementById('root');
  state = { show: '' };

  componentDidMount() {
    document.body.classList.add('modal-open');
    setTimeout(() => {
      this.setState({ show: 'show' });
    }, 150);
  }

  // Prevent bubbling event to the parent ".modal" element so
  // it not close modal if onClose() handler is attached
  onDialogClick(event) {
    event.stopPropagation();
  }

  componentWillUnmount() {
    document.body.classList.remove('modal-open');
  }

  render() {
    return ReactDOM.createPortal(
      <div
        className={`modal fade ${this.state.show} ${this.props.className}`}
        tabIndex="-1"
        style={{ display: 'block' }}
        onClick={this.props.onClose}
        id={this.props.id}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" onClick={this.onDialogClick}>
          <div className="modal-content">{this.props.children}</div>
        </div>
      </div>,
      this.container
    );
  }
}
