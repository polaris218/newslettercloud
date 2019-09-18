import React from 'react'
import { FormattedMessage } from 'react-intl'


export default function AuthLayout({ children }) {
  return (
    <div className="container-wrap">
      <div className="start-hero mb-5 container container--auth">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-5">
              <img alt="upgrade account" src="/img/upgrade.svg" />
            </div>
            { children }
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-5">
          <div className="col text-center">
            <h3 className="mt-4"><FormattedMessage id="auth.everyDay" /></h3>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <img alt="" className="d-block mx-auto" width="80%" src="/img/sponsor.png" />
          </div>
          <div className="col">
            <img alt="" className="d-block mx-auto" width="80%" src="/img/sponsor.png" />
          </div>
          <div className="col">
            <img alt="" className="d-block mx-auto" width="80%" src="/img/sponsor.png" />
          </div>
          <div className="col">
            <img alt="" className="d-block mx-auto" width="80%" src="/img/sponsor.png" />
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <div className="card-deck mt-2 mb-4">
              <div className="card">
                <div className="card-body">
                  <i><FormattedMessage id="auth.leftCard" /></i>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <i><FormattedMessage id="auth.rightCard" /></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
