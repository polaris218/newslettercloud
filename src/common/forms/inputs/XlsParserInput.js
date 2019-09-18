import React, { PureComponent } from 'react'
import XLSX from 'xlsx'
import Dropzone from 'react-dropzone'
import { get, range } from 'lodash'
import { FormattedMessage } from 'react-intl'


export default class XlsParserInput extends PureComponent {
  onDrop = (acceptedFiles, rejectedFiles) => {
    if(rejectedFiles.length) return
    const reader = new FileReader()
    reader.onload = (evt) => {
    const result = evt.target.result
    const workbook = XLSX.read(result, {type:'binary'})
    const wsname = workbook.SheetNames[0]
    const ws = workbook.Sheets[wsname]
    const data = XLSX.utils.sheet_to_json(ws, {header: range(10)})
    const blobData = XLSX.utils.sheet_to_json(ws, {header: 'Name'})
    const csv = XLSX.utils.sheet_to_csv(ws)
    let blob
    if(acceptedFiles[0].type === 'text/csv') {
      blob = new Blob([acceptedFiles[0]], {type : 'text/csv', name: 'test', data: blobData})
    } else {
      blob = new Blob([csv], {type : 'text/csv', name: 'test', data: data})
    }

    const options = Object.entries(data[0])
    const formatOptions = options.map(i => {
      return { value: `${i[1]}`, label: i[1] }
    })

    this.props.onChange({ file: get(acceptedFiles, '[0]'), options: formatOptions, csv: blob })
  }

    reader.readAsBinaryString(get(acceptedFiles, '[0]'))
  }

  render() {
    const fileName = get(this.props, 'value.file.name')
    return (
      <div className="custom-file">
        <Dropzone onDrop={this.onDrop} accept=".xlsx, .xls, .csv">
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <input type="file" className="custom-file-input" id={this.props.name} {...getInputProps()} />
            )
          }}
        </Dropzone>
        <label className={`custom-file-label ${fileName ? 'file-chosen' : ''}`} htmlFor={this.props.name}>
          {fileName || <FormattedMessage id="common.xlsChoose" />}
          <span className="custom-file-btn">{fileName ? <>&#10003; <FormattedMessage id="common.download.fileChoosen" /></> : <FormattedMessage id="common.download.browse" />}</span>
        </label>
      </div>
    )
  }
}
