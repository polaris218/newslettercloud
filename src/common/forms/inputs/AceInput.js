import React, { PureComponent } from 'react'
import AceEditor from 'react-ace'


export default class AceInput extends PureComponent {
  handleChange = (value) => {
    this.props.onChange(value)
  }

  render() {
    return (
      <AceEditor
        {...this.props}
        className={(this.props.meta.error && this.props.meta.touched) ? 'form-control error' : 'form-control'}
        onChange={this.handleChange}
      />
    )
  }
}
