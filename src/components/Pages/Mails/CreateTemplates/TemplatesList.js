import React from 'react'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import Spinner from 'components/Spinner'
import TemplatesListImage from './TemplatesListImage'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import { cutString } from 'common/utils/helpers'
import { templatesTitle } from 'common/utils/constants'


export default function TemplatesList({ newDrafts, newDesigned, view, createBlockTemplate, profile }) {
  const language = get(profile, 'data.language', 'en')
  return (
    <div className="mb-5">
      <Spinner show={newDrafts.isLoading} />
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
                      <h5 className="card-title mb-3">{templatesTitle[language][item.subject] || cutString(item.subject, 30)}</h5>
                      <button className="btn btn-success mb-2" onClick={() => createBlockTemplate(item.id)}><FormattedMessage id="common.select" /></button>
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
        !!get(newDrafts, 'data.length') &&
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
                      {
                        view !== 'designed' && !newDrafts.isLoading &&
                        <TemplatesListImage slug={item.layout_slug} />
                      }
                      {
                        view === 'designed' && !newDrafts.isLoading &&
                        <img
                          alt={item.subject}
                          width="130px"
                          src={item.img_thumb}
                        />
                      }
                    </div>
                    <div className="card-body text-center d-flex flex-column bg-light border-top">
                      <h5 className="card-title mb-3">{templatesTitle[language][item.subject] || cutString(item.subject, 30)}</h5>
                      <button className="btn btn-success mb-2" onClick={() => createBlockTemplate(item.id)}><FormattedMessage id="common.select" /></button>
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
    </div>
  )
}
