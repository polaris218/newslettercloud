import React from 'react'
import 'brace/mode/css'
import 'brace/mode/html'
import 'brace/theme/monokai'

import { AceField, TextareaField, QuillField, TextField } from 'common/forms/fields'
import { required, requiredHtml } from 'validations'


const Quil = () => {
  return (
    <QuillField
      width="100%"
      validate={[ requiredHtml ]}
      name="body"
      className="template-quill"
      onBlur={(ev) => { ev.preventDefault() }}
    />
  )
}

const Html = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <p>
            To add CSS to you mail, add it in the field below. You need to save the mail before the css give any affect. The CSS is added to the head in the mail and you don't need to specify the style-tag, just write the CSS directly.
          </p>
        </div>
      </div>
      <AceField
        name="body"
        mode="html"
        theme="monokai"
        width="100%"
        validate={[ requiredHtml ]}
        onBlur={(ev) => { ev.preventDefault() }}
      />
    </>
  )
}

const Css = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <p>To add CSS to you mail, add it in the field below. You need to save the mail before the css give any affect. The CSS is added to the head in the mail and you don't need to specify the style-tag, just write the CSS directly.</p>
        </div>
      </div>
      <AceField
        name="css"
        mode="css"
        theme="monokai"
        width="100%"
        onBlur={(ev) => { ev.preventDefault() }}
      />
    </>
  )
}

const Plain = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <p>
            As a complement to the newsletter with images, write a version in pure text for those who can't read html messages in their e-mail program. If the text message field is empty, the subscriber gets our standard message and a link to open the mail in their browser.
          </p>
        </div>
      </div>
      <TextareaField
        name="plain_text"
        style={{ height: 500 }}
      />
    </>
  )
}

const arrayOfTabs = [<Quil/>, <Html/>, <Css/>, <Plain/>]

export default arrayOfTabs
