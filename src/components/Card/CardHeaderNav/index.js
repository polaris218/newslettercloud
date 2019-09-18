import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, partial } from '../../../lib/utils';

import './styles.scss';

export class CardHeaderNav extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onBtnClick: PropTypes.func
  };

  static defaultProps = {
    items: [],
    className: '',
    onBtnClick: noop
  };

  btnIndex = 0;

  onClick = (event, index) => {
    if (this.btnIndex !== index) {
      this.btnIndex = index;
      this.props.onBtnClick(index);
    }
  };

  render() {
    return (
      <ul className={`card-header-nav ${this.props.className}`}>
        {this.props.items.map((item, index) => (
          <li
            key={item.name}
            className={`noselect ${item.active ? 'active' : ''}`}
            onClick={partial(this.onClick, null, index)}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    );
  }
}
