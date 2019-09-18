import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, change, getFormValues } from 'redux-form'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource, connectFormResource } from 'common/utils/resource'
import { generateSenderOptions } from 'common/utils/helpers'
import ContactPage from './ContactPage'
import API from 'api'


class ContactPageContainer extends Component {

  state = {
    openConfirmation: false,
    removeId: null,
    isAddSubscription: false,
  }

  componentDidMount() {
    this.props.lists.filter()
  }

  confirmDelete = (hash) => {
    const { contact, id } = this.props
    return contact.update({ lists: contact.data.lists.filter(i => i.hash !== hash), id })
    .then(_ => toast.success(<FormattedMessage id="toasters.list.removed" />))
  }

  updateSubscriptions = (lists) => {
    const { contact, id } = this.props
    return contact.update({ lists, id })
  }

  onSubmit = ({ newLists, lists, ...data }) => {
    return this.props.contact.update({ ...data, lists: [...lists, ...this.props.formLists] })
      .then(_ => toast.success(<FormattedMessage id="toasters.contact.edited" />))
      .then(_ => this.props.history.push('/contacts'))
  }
  
  onCreateList = (value) => {
    return API('lists').post({ name: value })
    .then(resp => {
      this.props.change('lists', [...this.props.formLists, {hash: resp.hash, name: resp.name}])
    })
    .then(_ => this.props.lists.fetch())
  }

  reactivateContact = () => {
    return API(`contacts/${this.props.id}/reactivate`).post({})
      .then(_ => this.props.contact.setData({ ...this.props.contact.data, active: true }))
      .then(_ => toast.success(<FormattedMessage id="toasters.contact.reactivated" />))
  }

  isAddSubscriptionTrigger = () => {
    this.setState({ isAddSubscription: !this.state.isAddSubscription })
  }

  componentWillUnmount() {
    this.props.contact.setData(null)
  }

  render() {
    return (
      <ContactPage
        {...this.props}
        {...this.state}
        confirmDelete={this.confirmDelete}
        onCreateList={this.onCreateList}
        isAddSubscriptionTrigger={this.isAddSubscriptionTrigger}
        updateSubscriptions={this.updateSubscriptions}
        onSubmit={this.onSubmit}
        reactivateContact={this.reactivateContact}
      />
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  change: (name, value) => dispatch(change('singleContact', name, value)),
})

export default compose(
  connectResource({
    namespace: 'lists',
    endpoint: 'lists',
    filters: {
      paginate_by: 1000,
    },
    list: true,
    prefetch: false,
  }),
  connect((state, props) => ({
    id: get(props, 'match.params.id'),
    formLists: get(state.resource, 'contact.data.lists'),
  }), mapDispatchToProps),
  connectFormResource({
    namespace: 'contact',
    endpoint: 'contacts/:id?',
    idKey: 'id',
  }),
  connect((state, props) => ({
    initialValues: {
      ...props.initialValues,
    }
  })),
  reduxForm({
    form: 'singleContact',
  })
)(ContactPageContainer)
