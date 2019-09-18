import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Select from 'react-select'
import ChooseList from 'common/widgets/ChooseList'
import { noop } from 'lib/utils'
import ModalTrigger from 'modals/ModalTrigger'
import ModalDeleteContact from './ModalDeleteContact'
import ModalExportContact from './ModalExportContact'
import ModalSubscriptions from './ModalSubscriptions'


const OPTIONS = [
  { label: <FormattedMessage id="contacts.action.choose" />, value: '' },
  { label: <FormattedMessage id="contacts.action.export" />, value: 'EXPORT' },
  { label: <FormattedMessage id="contacts.action.delete" />, value: 'DELETE' },
  { label: <FormattedMessage id="contacts.action.addSubscription" />, value: 'ADD_SUBSCRIPTIONS' }
]

export default class ChooseAction extends Component {
  static propTypes = {
    checkedMessage: PropTypes.object,
    checkedContacts: PropTypes.array,
    onSubmit: PropTypes.func,
    selectedLists: PropTypes.array,
    setSelectedLists: PropTypes.func
  }

  static defaultProps = {
    checkedMessage: null,
    checkedContacts: [],
    onSubmit: noop,
    selectedLists: [],
    setSelectedLists: noop
  }

  state = {
    selectedOption: '',
    listsChoosed: [],
  }

  onOptionSelect = option => {
    this.setState({ selectedOption: option.value, listsChoosed: [] });
  }

  onChooseListsChange = arr => {
    this.setState({ listsChoosed: arr })
  }

  onActionSubmit = () => {
    this.props.onSubmit(this.state.selectedOption)
  }

  onSubmitCallback = async () => {
    await this.props.onSubmitCallback()
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.isLoading && this.props.isLoading) {
      this.setState({ selectedOption: '', listsChoosed: [] })
    }
  }

  render() {
    const showListChooser = this.state.selectedOption === OPTIONS[3].value
    const showButtonIfNotSubscribe = this.state.selectedOption
    const checkedContacts = this.props.checkedContacts && this.props.checkedContacts.length ? this.props.checkedContacts : []
    const count = this.props.checkedContacts && this.props.checkedContacts.length ? this.props.checkedContacts.length: this.props.count
    return (
      <div className="row">
       <div className="col-3">
          <Select options={OPTIONS} onChange={this.onOptionSelect} value={OPTIONS.find(i => i.value === this.state.selectedOption)} />
        </div>
        {showListChooser ? (
          <div className="col-6">
            <ChooseList
              onChange={(this.onChooseListsChange)}
              disabled={false}
              placeholder={<FormattedMessage id="contacts.subscriptions.lists" />}
              isMulti={true}
              closeMenuOnSelect={false}
            />
          </div>
        ) : null}
        {showButtonIfNotSubscribe && <div className="col-3">
          {showButtonIfNotSubscribe === 'DELETE' && <ModalTrigger
            component={ModalDeleteContact}
            count={count}
            isLoading={this.props.isLoading}
            contacts={checkedContacts}
            callBack={this.onSubmitCallback}
          >
            <button className="btn btn-success" disabled={!count}>
              <FormattedMessage id={`contacts.${this.props.checkedContacts.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
          {showButtonIfNotSubscribe === 'EXPORT' && <ModalTrigger
            component={ModalExportContact}
            contacts={checkedContacts}
            onHide={this.onSubmitCallback}
          >
            <button className="btn btn-success" disabled={!count}>
              <FormattedMessage id={`contacts.${this.props.checkedContacts.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
          {showButtonIfNotSubscribe === 'ADD_SUBSCRIPTIONS' && !!this.state.listsChoosed.length && <ModalTrigger
            component={ModalSubscriptions}
            count={count}
            isLoading={this.props.isLoading}
            contacts={checkedContacts}
            callBack={this.onSubmitCallback}
            lists={this.state.listsChoosed.map(item => item.hash)}
          >
            <button className="btn btn-success" disabled={!count}>
              <FormattedMessage id={`contacts.${this.props.checkedContacts.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
        </div>}
      </div>
    )
  }
}
