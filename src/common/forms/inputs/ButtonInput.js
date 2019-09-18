import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from 'lib/font-awesome'


export default class ButtonInput extends PureComponent {
  handleChange = (value) => () => {
    this.props.onChange(value)
  }

  render() {
    const { options, disabled } = this.props
    return (
      <div className="btn-group d-flex">
        { options.map(option => (
          <button
            key={option.value}
            onClick={this.handleChange(option.value)}
            className={`btn col ${this.props.value === option.value ? 'btn-success' : 'btn-outline-success' }`}
            disabled={disabled}
          >
            {
              option.icon &&
              <FontAwesomeIcon className="fa-md" icon={option.icon} />
            }
            {option.label}
          </button>
        ))}
      </div>
    )
  }
}
