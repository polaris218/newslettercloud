import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


export default class PageSubNav extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.object ]),
        link: PropTypes.string
      })
    )
  };

  static defaultProps = {
    links: []
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <nav className="nav gan-nav-tabs mb-5">
            {
              !this.props.children && this.props.links.map(item => (
                <NavLink exact={item.exact} to={item.link} className="nav-link" key={item.name + item.link}>
                  {item.name}
                </NavLink>
              ))
            }
            {this.props.children}
          </nav>
        </div>
      </div>
    );
  }
}
