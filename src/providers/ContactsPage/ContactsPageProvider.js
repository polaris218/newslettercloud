import React, { Component } from 'react';
import { ContactsPageContext } from './ContactsPageContext';

const defaultState = {
  isAddContact: false,
  isAddAttribute: false,
  isShowDeleteContacts: false,
  isShowExportContacts: false,
  isShowAddSubscriptions: false,
  isShowCopySubscriptions: false,
  isShowMoveSubscriptions: false,
  isShowCancelSubscriptions: false,
  isShowDeleteSubscriptions: false,
  isShowExportSubscriptions: false
};

export class ContactsPageProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState,
      showAddContact: this.showAddContact,
      showAddAttribute: this.showAddAttribute,
      showDeleteContact: this.showDeleteContact,
      showExportContacts: this.showExportContacts,
      showAddSubscriptions: this.showAddSubscriptions,
      showCopySubscriptions: this.showCopySubscriptions,
      showMoveSubscriptions: this.showMoveSubscriptions,
      showCancelSubscriptions: this.showCancelSubscriptions,
      showDeleteSubscriptions: this.showDeleteSubscriptions,
      showExportSubscriptions: this.showExportSubscriptions,
      closeModal: this.closeModal
    };
  }

  showAddContact = () => {
    this.setState({ isAddContact: true, isAddAttribute: false });
  };

  showAddAttribute = () => {
    this.setState({ isAddContact: false, isAddAttribute: true });
  };

  closeModal = () => {
    this.setState({ ...this.state, ...defaultState });
  };

  showDeleteContact = () => {
    this.setState({ isShowDeleteContacts: true });
  };

  showExportContacts = () => {
    this.setState({ isShowExportContacts: true });
  };

  showAddSubscriptions = () => {
    this.setState({ isShowAddSubscriptions: true });
  };

  showCopySubscriptions = () => {
    this.setState({ isShowCopySubscriptions: true });
  };

  showMoveSubscriptions = () => {
    this.setState({ isShowMoveSubscriptions: true });
  };

  showCancelSubscriptions = () => {
    this.setState({ isShowCancelSubscriptions: true });
  };

  showDeleteSubscriptions = () => {
    this.setState({ isShowDeleteSubscriptions: true });
  };

  showExportSubscriptions = () => {
    this.setState({ isShowExportSubscriptions: true });
  };

  render() {
    return <ContactsPageContext.Provider value={this.state}>{this.props.children}</ContactsPageContext.Provider>;
  }
}
