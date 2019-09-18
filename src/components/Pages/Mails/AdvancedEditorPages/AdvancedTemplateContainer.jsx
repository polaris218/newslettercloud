import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import AdvancedView from './AdvancedView'


class AdvancedTemplateContainer extends Component{

  state = {
    selectedTab: 0,
  }

  componentDidMount() {
    if(this.props.templateKey) {
      this.props.advanceTemplate.fetch()
        .then(_ => {
          this.props.reset('advancedTemplate')
        })
    }
  }

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  onSubmit = (data) => {
    return this.props.advanceTemplate[this.props.action](data)
      .then(response => {
        toast.success(<FormattedMessage id={`toasters.template.${this.props.action}d`} />)
        return response
      })
  }

  submitWithRedirect = (data) => {
    return this.onSubmit(data)
      .then(_ => this.props.history.push('/mails/templates'))
  }

  submitWithStay = (data) => {
    return this.onSubmit(data)
      .then(response => {
        this.props.history.push(`/mails/templates/advanced/detail/${response.id}`)
      })
  }

  submitWithPreview = (data) => {
    return this.onSubmit(data)
      .then(response => {
        this.props.history.push({
          pathname: `/mails/templates/advanced/detail/${response.id}`,
          state: { preview: true }
        })
      })
  }

  componentWillUnmount() {
    this.props.advanceTemplate.setData(null)
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
        pathNameItem="mails/templates/advanced/detail"
        pathNameList="mails/templates"
      />
    )
  }
}

export default compose(
  connect((state, props) => ({ templateKey: get(props, 'match.params.id')} )),
  connectResource({
    namespace: 'advanceTemplate',
    endpoint: 'mails/templates/html/:templateKey?',
    idKey: 'templateKey',
    prefetch: false,
    async: true,
    list: false,
    item: true,
  }),
  connect((state, props) => ({
    initialValues: {
      body: "",
      ...get(state, 'resource.advanceTemplate.data')
    },
    action: props.templateKey ? 'update' : 'create',
    previewUrl: get(props, 'advanceTemplate.data.preview_url'),
    showModal: get(props, 'location.state.preview'),
  }), ({ reset })),
  reduxForm({
    form: 'advancedTemplate',
    enableReinitialize: true,
  })
)(AdvancedTemplateContainer)
