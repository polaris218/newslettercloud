import React, { Component } from 'react'
import ImportFromText from './ImportFromText'
import { reduxForm, change } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { connectResource } from 'common/utils/resource'
import { getColumnsOptions, getColumnsKeys, getAttributesObject } from 'common/utils/helpers'


class ImportFromTextContainer extends Component {
  state = {
    connectFieldsView: false,
    summary: null,
    connectOptions: [],
    connectKeys: [],
  }

  componentWillUnmount() {
    this.props.bulk.setData(null)
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
    let generateData = {
      mode: e.updateContact ? 2 : 1,
      items: this.state.connectKeys.map((i, index) => {
        return {
          email: i[get(e, 'email')],
          first_name: i[get(e, 'first_name')],
          last_name: i[get(e, 'last_name')],
          attributes: getAttributesObject(e.attributes),
          lists: e.lists,
          csv_row_number__: ++index,
        }
      })
    }

    return this.props.bulk.create(generateData)
      .then(res => this.setState({ summary: res }))
      .catch(err => {
        this.setState({ connectFieldsView: false })
        throw err
      })
  }

  render() {
    return <ImportFromText
      {...this.props}
      onSubmit={this.onSubmit}
      onCancel={this.onCancel}
      getColumnsOptions={this.getColumnsOptions}
      {...this.state}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'attributes',
    endpoint: 'attributes',
    list: true,
  }),
  connectResource({
    namespace: 'bulk',
    endpoint: 'contacts/import/bulk',
    async: true,
    prefetch: false,
    form: true,
  }),
  connect(state => ({
    connectValue: get(state.form, 'importFile.values.items'),
  }), dispatch => ({
    resetEmail: () => {
      dispatch(change('importFile', 'email', null))
    },
  })),  
  reduxForm({
    form: 'importFile',
    enableReinitialize: true,
  })
)(ImportFromTextContainer)
