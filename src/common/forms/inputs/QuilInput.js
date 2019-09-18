import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  clipboard: {
    matchVisual: false,
  },
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'direction': 'rtl' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
  ],
}

export default class QuillInput extends Component {
  handleChange = (value) => {
    this.props.onChange(value)
  }

  render() {
    return (
      <ReactQuill
        {...this.props}
        value={this.props.value}
        theme="snow"
        onChange={this.handleChange}
        modules={modules}
      />
    )
  }
}
