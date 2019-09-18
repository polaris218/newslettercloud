import React from 'react'
import PageHeader from 'components/PageHeader'
import { FormattedMessage } from 'react-intl'

import { TextField } from 'common/forms/fields'
import { required } from 'validations'
import PreviewModal from 'modals/components/PreviewModal'
import arrayOfTabs from './AdvancedTabs'


export default function AdvancedView({
selectTab,
previewUrl,
templateKey,
mailKey,
showModal,
onSubmit,
handleSubmit,
selectedTab,
history,
submitWithRedirect,
submitWithPreview,
submitWithStay,
pathNameItem,
pathNameList,
}) {
  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      {
        pathNameList === 'mails' ?
        <PageHeader
          name={
            <FormattedMessage id={mailKey ? 'draft.editAdvancedDraft' : 'draft.createAdvancedDraft'}>
              {content => <span className="text-capitalize">{content}</span>}
            </FormattedMessage>
          }
        /> :
        <PageHeader
          name={
            <FormattedMessage id={templateKey ? 'template.editAdvancedTemplate' : 'template.createAdvancedTemplate'}>
              {content => <span className="text-capitalize">{content}</span>}
            </FormattedMessage>
          }
        />
      }
      {
        previewUrl && showModal && <PreviewModal
          previewUrl={previewUrl}
          onClose={_ =>  history.push({
            pathname: `/${pathNameItem}/${templateKey}`,
            state: { preview: false }
          })}
        />
      }
      <div className="row mb-4">
        <div className="col-6">
          <TextField name="subject" type="text" label={ <FormattedMessage id="common.inputs.subject" />} required validate={[ required ]} />
        </div>
        <div className="col-6 d-flex align-items-end justify-content-end">
          <button className="btn btn-secondary" onClick={handleSubmit(submitWithPreview)}>
            Save and preview
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="nav gan-nav-tabs mb-5">
            <button onClick={(ev) => { ev.preventDefault(); selectTab(0) }} className={`btn btn-link nav-link ${selectedTab === 0 && 'active'}`}>Visual HTML</button>
            <button onClick={(ev) => { ev.preventDefault(); selectTab(1) }} className={`btn btn-link nav-link ${selectedTab === 1 && 'active'}`}>HTML code</button>
            <button onClick={(ev) => { ev.preventDefault(); selectTab(2) }} className={`btn btn-link nav-link ${selectedTab === 2 && 'active'}`}>Edit CSS</button>
            <button onClick={(ev) => { ev.preventDefault(); selectTab(3) }} className={`btn btn-link nav-link ${selectedTab === 3 && 'active'}`}>Text Message</button>
          </div>
        </div>
      </div>
      {
        arrayOfTabs[selectedTab]
      }
      <div className="row">
        <div className="col-6 pt-3">
          <button className="btn btn-secondary" onClick={handleSubmit(submitWithStay)}>
            Save and stay
          </button>
        </div>
        <div className="col-6 d-flex align-items-end justify-content-end">
          <button
            className="btn btn-link mr-3"
            onClick={(ev) => {
              ev.preventDefault()
              history.push(`/${pathNameList}`)
            }}
          >
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleSubmit(submitWithRedirect)}>
            Save and go
          </button>
        </div>
      </div>
    </form>
  )
}
