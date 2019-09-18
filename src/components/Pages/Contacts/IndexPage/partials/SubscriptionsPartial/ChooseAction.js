import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Select from 'react-select'
import ChooseList from 'common/widgets/ChooseList'
import { noop } from 'lib/utils'
import ModalExportSubscription from './ModalExportSubscription'
import ModalActionSubscription from './ModalActionSubscription'
import ModalTrigger from 'modals/ModalTrigger'


const OPTIONS = [
  { label: <FormattedMessage id="contacts.options.choose" />, value: '' },
  { label: <FormattedMessage id="contacts.options.cancel" />, value: 'CANCEL' },
  { label: <FormattedMessage id="common.delete" />, value: 'DELETE' },
  { label: <FormattedMessage id="contacts.action.export" />, value: 'EXPORT' },
  { label: <FormattedMessage id="contacts.options.copy" />, value: 'COPY' },
  { label: <FormattedMessage id="contacts.options.move" />, value: 'MOVE' }
];

export default class ChooseAction extends Component {
  static propTypes = {
    checkedMessage: PropTypes.object,
    checkedSubscriptions: PropTypes.array,
    onSubmit: PropTypes.func,
    selectedLists: PropTypes.array,
    setSelectedLists: PropTypes.func
  }

  static defaultProps = {
    checkedMessage: null,
    checkedSubscriptions: [],
    onSubmit: noop,
    selectedLists: [],
    setSelectedLists: noop
  }

  state = {
    selectedOption: '',
    listChoosed: null,
  }

  onOptionSelect = option => {
    this.setState({ selectedOption: option.value, listChoosed: null })
  }

  onChooseListsChange = val => {
    this.setState({ listChoosed: val })
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
    const checkedSubscriptions = this.props.checkedSubscriptions.length ? this.props.checkedSubscriptions : []
    const count = this.props.checkedSubscriptions && this.props.checkedSubscriptions.length ? this.props.checkedSubscriptions.length: this.props.count
    const showListChooser = this.state.selectedOption === OPTIONS[4].value || this.state.selectedOption === OPTIONS[5].value
    const showButtonIfNotSubscribe = this.state.selectedOption

    return (
      <div className="row">
        <div className="col-3">
        <Select options={OPTIONS} onChange={this.onOptionSelect} value={OPTIONS.find(i => i.value === this.state.selectedOption)} />
        </div>
        {showListChooser ? (
          <div className="col-6">
            <ChooseList
              onChange={this.onChooseListsChange}
              disabled={false}
              placeholder={<FormattedMessage id="contacts.chooseFor" />}
            />
          </div>
        ) : null}

        {showButtonIfNotSubscribe &&  <div className="col-3">
          {showButtonIfNotSubscribe === 'CANCEL' && <ModalTrigger
            component={ModalActionSubscription}
            count={count}
            isLoading={this.props.isLoading}
            subscriptions={checkedSubscriptions}
            action="cancel"
            actiontToast="canceled"
            callBack={this.onSubmitCallback}
            dangerAction={true}
          >
            <button className="btn btn-success" onClick={this.onActionSubmit} disabled={!count}>
              <FormattedMessage id={`subscriptions.${this.props.checkedSubscriptions.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
          {showButtonIfNotSubscribe === 'COPY' && this.state.listChoosed && <ModalTrigger
            component={ModalActionSubscription}
            action="copy"
            actiontToast="copied"
            body={{ list: this.state.listChoosed.hash }}
            count={count}
            isLoading={this.props.isLoading}
            subscriptions={checkedSubscriptions}
            callBack={this.onSubmitCallback}
            confirmBtn={<FormattedMessage id="subscriptions.copy.agree" values={{ count: count }} />}
            cancelBtn={<FormattedMessage id="common.cancel" />}
          >
            <button className="btn btn-success" onClick={this.onActionSubmit} disabled={!count}>
              <FormattedMessage id={`subscriptions.${this.props.checkedSubscriptions.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
          {showButtonIfNotSubscribe === 'MOVE' && this.state.listChoosed && <ModalTrigger
            component={ModalActionSubscription}
            action="move"
            actiontToast="moved"
            body={{ list: this.state.listChoosed.hash }}
            count={count}
            isLoading={this.props.isLoading}
            subscriptions={checkedSubscriptions}
            callBack={this.onSubmitCallback}
            confirmBtn={<FormattedMessage id="subscriptions.move.agree" values={{ count: count }} />}
            cancelBtn={<FormattedMessage id="common.cancel" />}
          >
            <button className="btn btn-success" onClick={this.onActionSubmit} disabled={!count}>
              <FormattedMessage id={`subscriptions.${this.props.checkedSubscriptions.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
          {showButtonIfNotSubscribe === 'DELETE' && <ModalTrigger
            component={ModalActionSubscription}
            count={count}
            action="delete"
            actiontToast="deleted"
            body={{ mock: true }}
            isLoading={this.props.isLoading}
            subscriptions={checkedSubscriptions}
            callBack={this.onSubmitCallback}
            dangerAction={true}
            confirmBtn={<FormattedMessage id="common.delete" />}
            cancelBtn={<FormattedMessage id="common.cancel" />}
          >
            <button className="btn btn-success" onClick={this.onActionSubmit} disabled={!count}>
              <FormattedMessage id={`subscriptions.${this.props.checkedSubscriptions.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
          {showButtonIfNotSubscribe === 'EXPORT' && <ModalTrigger
            component={ModalExportSubscription}
            subscriptions={checkedSubscriptions}
          >
            <button className="btn btn-success" disabled={!count}>
              <FormattedMessage id={`subscriptions.${this.props.checkedSubscriptions.length ? 'checkedBtn' : 'selectedBtn'}`} values={{ count }} />
            </button>
          </ModalTrigger>}
        </div>}
      </div>
    );
  }
}
