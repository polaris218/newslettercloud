import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { PageTitle } from 'common/widgets'


export default class AddForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="container">
        <PageTitle title="title.createSubscriptionForm"/>
        <div className="row mb-4">
          <div className="col">
            <h1><FormattedMessage id="addForm.title" /></h1>
            <p><FormattedMessage id="addForm.question" /></p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card text-center">
              <img
                width="45%"
                className="mx-auto d-block mt-4 mb-3"
                src="/img/to_do_list.svg"
                alt="Card cap"
              />
              <div className="card-body px-4">
                <h3 className="card-title"><FormattedMessage id="addForm.regularForm" /></h3>
                <p className="card-text">
                  <FormattedMessage id="addForm.regularFormText" />
                </p>
                <Link to="/forms/regular/add" className="btn btn-success">
                  <FormattedMessage id="addForm.select" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
