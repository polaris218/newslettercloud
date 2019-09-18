import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { PageTitle } from 'common/widgets'


export default class PrivacyPage extends PureComponent {

  render() {
    return (
      <div className="container-wrap">
        <PageTitle title="title.privacyPolicy"/>
        <div className="start-hero mb-5">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-5">
                <img alt="upgrade account" src="/img/flag.svg" />
              </div>
              <div className="col-6">
                <h1 className="mb-4"><FormattedMessage id="privacy.privacyPolicy" /></h1>
                <p className="lead mb-4"><FormattedMessage id="privacy.thisPrivacyPolicy" /></p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row mb-5">

            <div className="col-8 offset-2 mb-4">
              <div className="card bg-light mb-5 mt-3 p-4">
                <div className="card-body">
                  <h2><FormattedMessage id="common.definitions" /></h2>
                  <p className="font-weight-bold"><FormattedMessage id="privacy.theFollowingWords"/></p>
                  <p><FormattedMessage id="privacy.refersToTheCompany"/></p>
                  <p><FormattedMessage id="privacy.refersToAnyOfTheServices"/></p>
                  <p><FormattedMessage id="privacy.refersToTheDomain"/></p>
                  <p><FormattedMessage id="privacy.refersToYou"/></p>
                  <p><FormattedMessage id="privacy.refersToTheRecipients"/></p>
                  <p><FormattedMessage id="privacy.refersToTheList"/></p>
                  <p className="mb-0"><FormattedMessage id="privacy.refersToYouAsEither"/></p>
                </div>
              </div>

              <h2 className="mt-5"><FormattedMessage id="privacy.thePurpose"/></h2>
              <p><FormattedMessage id="privacy.thisPrivacyPolicyIsDesigned"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.informationToTheSubscribers"/></h2>
              <p><FormattedMessage id="privacy.allNewsletters"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.personalData"/></h2>
              <p><FormattedMessage id="privacy.withPersonalData"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.dataCollectedFor"/></h2>
              <p><FormattedMessage id="privacy.whenYouAsAUser"/></p>
              <p><FormattedMessage id="privacy.theUserIsTherefore"/></p>
              <p><FormattedMessage id="privacy.whenYouAdd"/></p>
              <p><FormattedMessage id="privacy.getANewsletterAcknowledges"/></p>
              <p><FormattedMessage id="privacy.getANewsletterUndertakes"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.dataCollectedBy"/></h2>
              <p><FormattedMessage id="privacy.getANewsletterCollect"/></p>
              <p><FormattedMessage id="privacy.weReceiveInformation"/></p>
              <p><FormattedMessage id="privacy.getANewsletterPersonal"/></p>
              <p><FormattedMessage id="privacy.weAlsoCollectYouIPNumber"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.rightToInformation"/></h2>
              <p><FormattedMessage id="privacy.youMayRequest"/></p>
              <p><FormattedMessage id="privacy.youHaveTheRight"/></p>
              <p><FormattedMessage id="privacy.underCertainCircumstances"/></p>
              <p><FormattedMessage id="privacy.ifYouAreUncertain"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.thirdParties"/></h2>
              <p><FormattedMessage id="privacy.getANewsletter"/></p>
              <p><FormattedMessage id="privacy.howeverGetANewsletter"/></p>
              <h2 className="mt-5"><FormattedMessage id="common.security" /></h2>
              <p><FormattedMessage id="privacy.weWillTakeAllSteps"/></p>
              <p><FormattedMessage id="privacy.inTheEvent"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.cookies"/></h2>
              <p><FormattedMessage id="privacy.getANewsletterUsesCookies"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.changes"/></h2>
              <p><FormattedMessage id="privacy.weMayChange"/></p>
              <h2 className="mt-5"><FormattedMessage id="privacy.contact"/></h2>
              <p><FormattedMessage id="privacy.ifYouHaveAnyQuestions"/> <a href="/contact/"><FormattedMessage id="privacy.contactForm"/></a></p>

            </div>
          </div>
        </div>

      </div>
    );
  }
}
