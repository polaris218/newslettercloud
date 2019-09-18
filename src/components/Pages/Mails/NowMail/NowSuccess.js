import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


export default function NowSuccess(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card text-center">
            <div className="card-body p-5">
              <div className="row">
                <div className="col-10 offset-1">
                  <img width="15%" className="mx-auto d-block mb-4" src="/img/newsletter.svg" />
                  <h2 className="card-title mb-4"><FormattedMessage id="mails.yourNewsletter" /></h2>
                  <p className="card-text mb-4">
                    <FormattedMessage id="mails.weHaveMovedYourMail" />
                  </p>
                  <h5 className="mb-4"><FormattedMessage id="mails.shareOnSocialMedia" /></h5>
                  <div className="mb-4">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${props.nowMail.share_url}`} target="_blank" className="btn btn--facebook"><FormattedMessage id="mails.shareOnFacebook" /></a>
                    <a href={`http://twitter.com/home?status=Check%20out%20our%20newsletter%20at%20${props.nowMail.share_url}`} target="_blank" className="btn btn--twitter mx-3"><FormattedMessage id="mails.shareOnTwitter" /></a>
                    <a href={`https://www.linkedin.com/shareArticle?url=${props.nowMail.share_url}&source=Get a Newsletter`} target="_blank" className="btn btn--linkedin mr-3"><FormattedMessage id="mails.shareOnLinkedIn" /></a>
                    <a href={props.nowMail.share_url} className="btn btn-secondary" target="_blank"><FormattedMessage id="mails.openInNewTab" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
