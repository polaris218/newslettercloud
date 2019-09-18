import React from 'react'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import Spinner from 'components/Spinner'
import DraftListImage from './DraftListImage'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import { cutString } from 'common/utils/helpers'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { templatesTitle } from 'common/utils/constants'

export default function DraftList({ newDrafts, newDesigned, view, createBlockDraft, advancedDrafts, showAdvancedTrigger,
  showAdvanced, createAdvancedDraft, profile }) {
  const language = get(profile, 'data.language', 'en')
  return (
    <>
      <Spinner show={newDrafts.isLoading || advancedDrafts.isLoading} />
      {
        view === 'public' && !!get(newDesigned, 'data.length') &&
        <>
          <h3 className="mb-3"><FormattedMessage id="mails.designedTemplates" /></h3>
          <div className="row">
            {
              newDesigned.data.map(item => (
                <div className="col-3 mb-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <img
                        alt={item.subject}
                        src={item.img_thumb}
                        width="130px"
                      />
                    </div>
                    <div className="card-body text-center d-flex flex-column bg-light border-top">
                      <h5 className="card-title card-title--drafts mb-3">{templatesTitle[language][item.subject] || cutString(item.subject, 30)}</h5>
                      <button className="btn btn-success mb-2" onClick={() => createBlockDraft(item.id)}><FormattedMessage id="common.select" /></button>
                      <div>
                        <ModalTrigger component={PreviewModal} previewUrl={item.preview_url}>
                          <span className="text-link small link-underline"><FormattedMessage id="common.preview" /></span>
                        </ModalTrigger>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </>
      }
      {
        !!get(newDrafts, 'data.length') && view !== 'advanced' &&
        <>
          {
            view === 'public' &&
            <h3 className="my-3"><FormattedMessage id="mails.standardTemplates" /></h3>
          }
          <div className="row">
            {
              newDrafts.data.map(item => (
                <div className="col-3 mb-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <DraftListImage slug={item.layout_slug} />
                    </div>
                    <div className="card-body text-center d-flex flex-column bg-light border-top">
                      <h5 className="card-title mb-3">{templatesTitle[language][item.subject] || cutString(item.subject, 30)}</h5>
                      <button className="btn btn-success mb-2" onClick={() => createBlockDraft(item.id)}><FormattedMessage id="common.select" /></button>
                      <div>
                        <ModalTrigger component={PreviewModal} previewUrl={item.preview_url}>
                          <span className="text-link small link-underline"><FormattedMessage id="common.preview" /></span>
                        </ModalTrigger>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </>
      }
      {
        view === 'advanced' && !!get(advancedDrafts, 'data.length') &&
        <div>
          <div className="row">
            <div className="col-3 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="builder-icon">{`<>`}</div>
                </div>
                <div className="card-body text-center d-flex flex-column bg-light border-top">
                  <h5 className="card-title mb-3"><FormattedMessage id="templates.startFromScratch" /></h5>
                  <Link className="btn btn-success" to='/mails/advanced/detail'><FormattedMessage id="common.select" /></Link>
                </div>
              </div>
            </div>
            {
              advancedDrafts.data.map(item => (
                <div className="col-3 mb-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <DraftListImage slug="resp_brevhuvudnocolumn" />
                    </div>
                    <div className="card-body text-center d-flex flex-column bg-light border-top">
                      <h5 className="card-title mb-3">{cutString(item.subject, 30)}</h5>
                      <button className="btn btn-success mb-2" onClick={() => createAdvancedDraft(item.id)}><FormattedMessage id="common.select" /></button>
                      <div>
                        <ModalTrigger component={PreviewModal} previewUrl={item.preview_url}>
                          <span className="text-link small link-underline"><FormattedMessage id="common.preview" /></span>
                        </ModalTrigger>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      }
    </>
  )
}
