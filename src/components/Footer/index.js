import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import './styles.scss'


export default class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6"><FormattedMessage id="footer.text" values={{year:new Date().getFullYear()}}/></div>
            <div className="col-6">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <Link to="/privacy" className="nav-link">
                    <FormattedMessage id="footer.policy" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/terms" className="nav-link">
                    <FormattedMessage id="footer.terms" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
