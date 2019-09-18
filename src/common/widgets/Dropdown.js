import React, { Component } from 'react'

import { FontAwesomeIcon } from 'lib/font-awesome';


export default class Dropdown extends Component {
  state = {
    visible: false,
  }

  toggleDropdown = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { buttonClasses = "btn badge badge-secondary border-0", buttonContent = "", disableButtonIcon } = this.props
    return (
      <div className="dropdown">
        {
          this.state.visible && <div className="dropdown-layout" onClick={this.toggleDropdown} />
        }
        <button className={buttonClasses} type="button" onClick={this.toggleDropdown}>
          {!disableButtonIcon && <FontAwesomeIcon icon="ellipsis-h" />}
          {buttonContent}
        </button>
        <div className={`dropdown-menu ${this.state.visible && 'show'}`} onClick={this.toggleDropdown}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
