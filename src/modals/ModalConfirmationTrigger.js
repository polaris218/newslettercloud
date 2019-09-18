import PropTypes from 'prop-types'
import React, { Component, Children, cloneElement } from 'react'

import ModalConfirmationWrapper from './ModalConfirmationWrapper'


const propTypes = {
  children: PropTypes.object,
}

export default class ModalConfirmationTrigger extends Component {
    state = {
      toggled: false,
    }

    open = (e) => {
      this.setState({ toggled: true })
    }

    close = (e) => {
      this.setState({ toggled: false })
      if(this.props.onHide) {
        this.props.onHide()
      }
    }

    render() {
      const { children } = this.props
      let child = cloneElement(Children.only(children), { onClick: this.open, key: 'modal-control' })
      return [
        child,
        <ModalConfirmationWrapper {...this.props} open={this.state.toggled} onClose={this.close} key='modal-dialog' />,
      ]
    }
}

ModalConfirmationWrapper.propTypes = propTypes
