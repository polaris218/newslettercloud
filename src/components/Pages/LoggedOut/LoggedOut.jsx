import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons'


export default function LoggedOut({ posts }) {
  return (
    <section className="container">
      <div className="row mb-3">
        <h1 className="col-12 text-center">
          <span className="ng-scope"><FormattedMessage id="loggedOut.loggedOut" /></span>
        </h1>
        <p className="text-center col-12">
          <FormattedMessage id="loggedOut.thanksForSpendingQualityTime" />
        </p>
      </div>
      <div className="row mb-5 logout-table">
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><FormattedMessage id="loggedOut.latestFromOurBlog" /></h5>
            </div>
            <div className="card-body">
              <div className="blog-list">
                {
                  posts.map(post => (
                    <div className="blog-item" key={post.id}>
                      <div className="blog-item__created">By: {post.author.nickname} - {post.date}</div>
                      <a className="blog-item__heading" href={post.url} target="_blank">{post.title}</a>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><FormattedMessage id="loggedOut.needHelp" /></h5>
            </div>
            <div className="card-body">
              <p className="card-text mb-3">
                <FormattedMessage id="loggedOut.weRegularlyUpdateOurKnowledge" />
              </p>
              <label htmlFor="logout-inpu"><FormattedMessage id="loggedOut.yourVanityUrl" /></label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="eg. Contacts" id="logout-input" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button">></button>
                </div>
              </div>
              <a href={`${process.env.REACT_APP_HELP_LINK}en/`}><FormattedMessage id="loggedOut.orByBrowsing" /></a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><FormattedMessage id="loggedOut.recommendUs" /></h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <FormattedMessage id="loggedOut.weReallyHope" />
              </p>
              <div className="social-list">
                <div className="social-item"><a href={process.env.REACT_APP_FACEBOOK_SHARE_LINK} className="social-link">
                  <span className="icon-sm-width"><FontAwesomeIcon icon={faFacebookF} /></span><FormattedMessage id="loggedOut.recommendUsOnFacebook" />
                </a></div>
                <div className="social-item"><a href={process.env.REACT_APP_TWITTER_SHARE_LINK} className="social-link">
                  <span className="icon-sm-width"><FontAwesomeIcon icon={faTwitter} /></span><FormattedMessage id="loggedOut.recommendUsOnTwitter" />
                </a></div>
                <div className="social-item"><a href={process.env.REACT_APP_GOOGLE_SHARE_LINK} className="social-link">
                  <span className="icon-sm-width"><FontAwesomeIcon icon={faGooglePlusG} /></span><FormattedMessage id="loggedOut.recommendUsOnGoogle" />
                </a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-2 align-items-center justify-content-center">
        <div><FormattedMessage id="loggedOut.secondThoughts" /></div>
        <div>
          <Link className="btn btn-link" to="/auth/signin"><FormattedMessage id="loggedOut.loginAgain" /></Link>
        </div>
      </div>
    </section>
  )
}