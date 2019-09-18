import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { FormattedMessage, injectIntl } from 'react-intl'

import { connectResource, connectFormResource } from 'common/utils/resource'
import { generateAttributes, onSubmitFail } from 'common/utils/helpers'
import AddRegularForm from './AddRegularForm'


class AddRegularFormContainer extends Component {
  state = {
    advanced: false,
  }

  showAdvancedSettings = (e) => {
    e.preventDefault()
    this.setState({ advanced: true })
  }

  onSubmit = (e) => {
    const attributes = Object.entries(e.attributes)
      .filter(([key, value]) => value && key)
      .map(([key, value]) => key)
      if(this.props.id) {
        return this.props.forms.update({...e, attributes})
          .then(_ => this.props.forms.fetch())
          .then(_ => toast.success(<FormattedMessage id="toasters.form.updated" />))
          .then(_ => {
            const offset = document.getElementById('use_subscription_form').offsetTop
            window.scrollTo(0, offset);
          })
      }

      return this.props.forms.create({...e, attributes})
        .then(res => this.props.history.push(`/forms/regular/edit/${res.key}`))
  }

  componentDidMount() {
    if(this.props.id) {
      this.props.forms.fetch()
    }
  }

  componentWillUnmount() {
    this.props.forms.setData(null)
  }

  render() {
    return (
      <AddRegularForm
        {...this.props}
        onSubmit={this.onSubmit}
        advanced={this.state.advanced}
        showAdvancedSettings={this.showAdvancedSettings}
      />
    );
  }
}

export default compose(
  connect((_, props) => ({
    id: get(props.match, 'params.id'),
  })),
  connectFormResource({
    namespace: 'forms',
    endpoint: 'subscription_forms/:key?',
    prefetch: false,
    idKey: 'id',
    list: true,
  }),
  connectResource({
    namespace: 'attributes',
    endpoint: 'attributes',
    list: true,
    async: true,
  }),
  injectIntl,
  connect((state, props) => {
    const data = get(state.resource, 'forms.data') || {}
    return ({
      initialValues: {
        ...data,
        attributes: generateAttributes(get(state.resource, 'attributes.data'), get(state.resource, 'forms.data.attributes')),
        verify_mail_subject: data.verify_mail_subject || props.intl.formatMessage({id: 'forms.input.confirmationMail'}),
        verify_mail_text: data.verify_mail_text || props.intl.formatMessage({id: 'forms.input.message'}),
        button_text: data.button_text || props.intl.formatMessage({id: 'forms.input.subscribe'}),
      }
    })
  }),
  reduxForm({
    form: 'forms',
    onSubmitFail: onSubmitFail,
    enableReinitialize: true,
  })
)(AddRegularFormContainer)
