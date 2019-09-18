import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import AdvancedView from './AdvancedView'


class AdvancedMailContainer extends Component{

  state = {
    selectedTab: 0,
  }

  componentDidMount() {
    if(this.props.mailKey) {
      this.props.advancedMail.fetch()
        .then(_ => {
          this.props.reset('advancedMail')
        })
    }
  }

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  onSubmit = (data) => {
    return this.props.advancedMail[this.props.action](data)
      .then(response => {
        toast.success(<FormattedMessage id={`toasters.mail.${this.props.action}d`} />)
        return response
      })
  }

  submitWithRedirect = (data) => {
    return this.onSubmit(data)
      .then(_ => this.props.history.push('/mails/drafts'))
  }

  submitWithStay = (data) => {
    return this.onSubmit(data)
      .then(response => {
        this.props.history.push(`/mails/advanced/detail/${response.id}`)
      })
  }

  submitWithPreview = (data) => {
    return this.onSubmit(data)
      .then(response => {
        this.props.history.push({
          pathname: `/mails/advanced/detail/${response.id}`,
          state: { preview: true }
        })
      })
  }

  componentWillUnmount() {
    this.props.advancedMail.setData(null)
  }

  render() {
    return(
      <AdvancedView
        {...this.props}
        selectTab={this.selectTab}
        selectedTab={this.state.selectedTab}
        onSubmit={this.onSubmit}
        submitWithRedirect={this.submitWithRedirect}
        submitWithPreview={this.submitWithPreview}
        submitWithStay={this.submitWithStay}
        pathNameItem="mails/advanced/detail"
        pathNameList="mails"
      />
    )
  }
}

export default compose(
  connect((state, props) => ({ mailKey: get(props, 'match.params.id')} )),
  connectResource({
    namespace: 'advancedMail',
    endpoint: 'mails/drafts/:mailKey?',
    idKey: 'mailKey',
    prefetch: false,
    async: true,
    list: false,
    item: true,
  }),
  connect((state, props) => ({
    initialValues: {
      body: "",
      ...get(state, 'resource.advancedMail.data')
    },
    action: props.mailKey ? 'update' : 'create',
    previewUrl: get(props, 'advancedMail.data.preview_url'),
    showModal: get(props, 'location.state.preview'),
  }), ({ reset })),
  reduxForm({
    form: 'advancedMail',
    enableReinitialize: true,
  })
)(AdvancedMailContainer)
