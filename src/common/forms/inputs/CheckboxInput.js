import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class CheckboxInput extends PureComponent {
  render() {
    const { value, disabled, required, name, boxLabel, checked, description } = this.props
    return (
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          checked={checked || value === true}
          className="custom-control-input"
          value={value}
          onChange={e => this.props.onChange(e.target.checked)}
          required={required}
          disabled={disabled}
          id={name}
        />
        <label className="custom-control-label" htmlFor={name}>{boxLabel}</label>
        {
          description &&
          <small className="form-text text-muted">{description}</small>
        }
      </div>
    )
  }
}

CheckboxInput.propTypes = {
  inputClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}
