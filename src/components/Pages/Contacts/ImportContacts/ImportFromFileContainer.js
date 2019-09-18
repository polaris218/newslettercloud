import React, { Component } from 'react'
import ImportFromFile from './ImportFromFile'
import { reduxForm, change, getFormValues, SubmissionError } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { connectResource } from 'common/utils/resource'
import { getColumnsOptions, getColumnsKeys, getAttributesObject } from 'common/utils/helpers'
import API from 'api'


class ImportFromFileContainer extends Component {
  state = {
    connectFieldsView: false,
    connectOptions: [],
    connectKeys: [],
    finishImport: false,
    viewSummary: false,
  }

  componentWillUnmount() {
    this.props.files.setData(null)
  }

  componentDidMount() {
    if(this.props.hash) {
      this.props.files.fetch()
        .then(_ => this.setState({ viewSummary: true }))
    }
  }

  onCancel = () => {
    this.setState({
      connectFieldsView: false,
    })
    this.props.resetEmail()
  }

  onSubmit = (e) => {
    if(!this.state.connectFieldsView) {
      this.setState({
        connectOptions: getColumnsOptions(this.props.connectValue),
        connectKeys: getColumnsKeys(this.props.connectValue),
        connectFieldsView: true,
      }, () => {
        const offset = document.getElementById('connect_fields').offsetTop
        window.scrollTo(0, offset * 2);
      })
      this.props.resetEmail()
      return
    }
    
    const generateData = {
      lists: e.lists,
      mode: e.updateContact ? 2 : 1,
    }

    generateData.mapping = {
      attributes: getAttributesObject(e.attributes),
      contact: {
        email: get(e, 'email'),
        first_name: get(e, 'first_name') || undefined,
        last_name: get(e, 'last_name') || undefined,
      },
      mode: e.updateContact ? 2 : 1,
      lists: e.lists
    }

    return this.props.files.create(generateData)
      .then(res => API(`contacts/import/file/${res.hash}`).post({ file: e.file.csv }))
      .then(res => this.setState({ finishImport: true }))
      .catch(err => { throw new SubmissionError(err) })
  }

  render() {
    return <ImportFromFile
      {...this.props}
      onSubmit={this.onSubmit}
      onCancel={this.onCancel}
      getColumnsOptions={this.getColumnsOptions}
      {...this.state}
    />
  }
}

export default compose(
  connect((state, props) => ({
    file: get(getFormValues('importFile')(state), 'file') || { file: {}, options: [], csv: {} },
    hash: get(props, 'match.params.hash'),
  }), dispatch => ({
    resetEmail: () => {
      dispatch(change('importFile', 'email', null))
    },
  })), 
  connectResource({
    namespace: 'attributes',
    endpoint: 'attributes',
    list: true,
    async: true,
  }),
  connectResource({
    namespace: 'files',
    endpoint: 'contacts/import/file',
    async: true,
    idKey: 'hash',
    prefetch: false,
  }), 
  reduxForm({
    form: 'importFile',
    enableReinitialize: true,
  })
)(ImportFromFileContainer)
