import PropTypes from 'prop-types'
import React, { Component, Children, cloneElement } from 'react'


const propTypes = {
  children: PropTypes.object,
}

export default class ModalTrigger extends Component {
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
      const { children, component: Component } = this.props
      let child = cloneElement(Children.only(children), { onClick: this.open, key: 'modal-control' })
      return [
        child,
        this.state.toggled && <Component {...this.props} onClose={this.close} key='modal-dialog' />,
      ]
    }
}

ModalTrigger.propTypes = propTypes
