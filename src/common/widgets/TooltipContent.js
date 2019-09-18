import React, { Component } from 'react'

export default class TooltipContent extends Component {
  state = {
    open: false,
  }

  render() {
    const { children, className, tooltipText, iconType, ...rest } = this.props
    return (
      <span className={`tooltip-content ${iconType ? 'mr-2' : ''}`} {...rest}>
        {children}
        <div className={`tooltip bs-tooltip-top ${className}`} role="tooltip">
          <div className="arrow" />
          <div className="tooltip-inner">
            {tooltipText}
          </div>
        </div>
      </span>
    )
  }
}
