import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'


export default class SupportPage extends PureComponent {
  render() {
    return (
      <div className="container-wrap">
        <div className="start-hero mb-5">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-5">
                <img alt="Support" src="/img/fly.svg" />
              </div>
              <div className="col-6">
                <h1 className="mb-4"><FormattedMessage id="common.support" /></h1>
                <p className="lead mb-4"><FormattedMessage id="supportPage.takeAdvantage" /></p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mb-5">
            <div className="col text-center">
              <h3 className="mt-4"><FormattedMessage id="supportPage.trustInUs" /></h3>
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
                    <p className="font-italic"><FormattedMessage id="theBestThing" /></p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <p className="font-italic"><FormattedMessage id="supportPage.weHaveUsedGan" /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
