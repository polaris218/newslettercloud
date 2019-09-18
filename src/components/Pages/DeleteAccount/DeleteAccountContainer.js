import React, { Component } from 'react'

import DeleteAccount from './DeleteAccount'


class DeleteAccountContainer extends Component {
  state = {
    answer: '',
    nextStep: false,
  }


  selectAnswer = (e) => {
    this.setState({ answer: e.target.value })
  }

  selectNexpStep = () => {
    this.setState({ nextStep: true })
  }

  render() {
    return <DeleteAccount {...this.props} selectAnswer={this.selectAnswer} selectNexpStep={this.selectNexpStep} {...this.state} />
  }
}

export default DeleteAccountContainer
