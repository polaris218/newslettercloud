import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { noop } from '../../lib/utils';
import './styles.scss';

export const alertIntents = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

class AlertItem extends PureComponent {
  static propTypes = {
    intent: PropTypes.oneOf(alertIntents), // color scheme of the alert message
    dismissible: PropTypes.bool, // should alert message have close button
    body: PropTypes.node, // html element or text
    timeout: PropTypes.number, // time in [ms] after which the dialog will be closed automatically
    id: PropTypes.number, // unique message id
    onClose: PropTypes.func // close function which removes alert by given id from AlertProvider
  };

  static defaultProps = {
    body: '',
    intent: alertIntents[0],
    dismissible: false,
    id: 0,
    timeout: 0,
    onClose: noop
  };

  constructor(props) {
    super(props);

    if (props.timeout) {
      setTimeout(() => {
        props.onClose(props.id);
      }, props.timeout);
    }
  }

  shouldComponentUpdate(newProps) {
    return newProps.id !== this.props.id;
  }

  render() {
    const { body, intent, dismissible, id, onClose } = this.props;
    return (
      <div className={`alert alert-${intent} ${dismissible ? 'alert-dismissible' : ''} show`}>
        {body}
        <button
          type="button"
          className="close"
          onClick={() => {
            onClose(id);
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default class Alert extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    removeAlert: PropTypes.func,
    addAlert: PropTypes.func
  };

  static defaultProps = {
    data: [],
    removeAlert: noop,
    addAlert: noop
  };

  render() {
    return (
      <div className="alert-container">
        <TransitionGroup>
          {this.props.data.map(item => (
            <CSSTransition classNames="alert" timeout={{ enter: 300, exit: 300 }} key={item.id}>
              <AlertItem {...item} onClose={this.props.removeAlert} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}
