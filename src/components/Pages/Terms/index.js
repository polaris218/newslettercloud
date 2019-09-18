import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { PageTitle } from 'common/widgets'


export default class TermsPage extends PureComponent {
  render() {
    return (
      <div className="container-wrap">
        <PageTitle title="title.termsOfUse" />
        <div className="start-hero mb-5">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-5">
                <img alt="upgrade account" src="/img/accept_terms.svg" />
              </div>
              <div className="col-6">
                <h1 className="mb-4"><FormattedMessage id="terms.title" /></h1>
                <p className="lead mb-4"><FormattedMessage id="terms.theseTerms" /></p>
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
                  <p className="font-weight-bold"><FormattedMessage id="terms.theFollowingWords" /></p>
                  <p><FormattedMessage id="terms.content" /></p>
                  <p><FormattedMessage id="terms.originalContent" /></p>
                  <p><FormattedMessage id="terms.meaningThePerson" /></p>
                  <p><FormattedMessage id="terms.serviceMeaningAnyOfTheServices" /></p>
                  <p><FormattedMessage id="terms.siteMeaningTheDomain" /></p>
                  <p><FormattedMessage id="terms.userAccount" /></p>
                </div>
              </div>

              <h2 className="mt-5"><FormattedMessage id="terms.scopeOfTheService" /></h2>
              <p><FormattedMessage id="terms.theServiceIsAnOnlineTool" /></p>
              <p><FormattedMessage id="terms.theUserShallUseTheSite" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.userAccounts" /></h2>
              <p><FormattedMessage id="terms.inOrderToUse" /></p>
              <p><FormattedMessage id="terms.youMustAtAllTimes" /></p>
              <p><FormattedMessage id="terms.theUserAccountMayOnlyBeUsed" /></p>
              <p><FormattedMessage id="terms.theUserAccountHasASubscription" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.contentTitle" /></h2>
              <p><FormattedMessage id="terms.theServiceIncludes" /></p>
              <p><FormattedMessage id="terms.byUploadingContent" /></p>
              <p><FormattedMessage id="terms.youHaveTheResponsibility" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.paymentAndFees" /></h2>
              <p><FormattedMessage id="terms.thePriceForTheService" /></p>
              <p><FormattedMessage id="terms.feesForTheService" /></p>
              <p><FormattedMessage id="terms.theUserWarrants" /></p>
              <p><FormattedMessage id="terms.theUserIsObligated" /></p>
              <p><FormattedMessage id="terms.interestOnOverduePayment" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.affiliateAndPartner" /></h2>
              <p><FormattedMessage id="terms.getANewsletterOffers" /></p>
              <p><FormattedMessage id="terms.theSizeOfTheRemuneration" /></p>
              <p><FormattedMessage id="terms.theRemunerationIsTransferred" /></p>
              <p><FormattedMessage id="terms.theRemunerationIsOnlyTransferred" /></p>
              <p><FormattedMessage id="terms.transferWillOnlyBeMade" /></p>
              <p><FormattedMessage id="terms.getANewsletterReserves" /></p>
              <p><FormattedMessage id="terms.theUserAcknowledges" /></p>
              <ul>
                <li>
                  <all><FormattedMessage id="terms.trafficToTheService" /></all>
                </li>
                <li>
                  <remuneration><FormattedMessage id="terms.thatHasBeenObtained" /></remuneration>
                </li>
                <li>
                  <all><FormattedMessage id="terms.collectionOfData" /></all>
                </li>
              </ul>
              <h2 className="mt-5"><FormattedMessage id="terms.durationAndTermination" /></h2>
              <p><FormattedMessage id="terms.theAgreementShallBeInForce" /></p>
              <p><FormattedMessage id="terms.ifTheUserTerminates" /></p>
              <p><FormattedMessage id="terms.thisAgreementIsConsidered" /></p>
              <p><FormattedMessage id="terms.getANewsletterReservesTheRight" /></p>
              <p><FormattedMessage id="terms.terminationOfThisAgreement" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.useOfData" /></h2>
              <p><FormattedMessage id="terms.getANewsletterMaintains" /></p>
              <p><FormattedMessage id="terms.allInformationThatIsStored" /></p>
              <p><FormattedMessage id="terms.inEventOfTerminationOfTheAgreement" /></p>
              <p><FormattedMessage id="terms.getANewsletterWillAlsoAfterTheTermination" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.personalData" /></h2>
              <p><FormattedMessage id="terms.getANewsletterWillProcessPersonalData" /></p>
              <p><FormattedMessage id="terms.byAcceptingTheAgreement" /> <a href="#en_dataprocessing"><FormattedMessage id="terms.byAcceptingTheAgreement" /></a> <FormattedMessage id="terms.alsoBecomesBinding" /></p>
              <p><FormattedMessage id="terms.furtherInformation" /> <a href="/legal/privacy/">the Privacy Policy.</a></p>
              <h2 className="mt-5"><FormattedMessage id="terms.intellectualProperty" /></h2>
              <p><FormattedMessage id="terms.theServiceAndItsOriginalContent" /></p>
              <p><FormattedMessage id="terms.theSite" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.changesOfTheService" /></h2>
              <p><FormattedMessage id="terms.getANewsletterReservesToModify" /></p>
              <p><FormattedMessage id="terms.weWillMakeReasonableEfforts" /></p>
              <p><FormattedMessage id="terms.getANewsletterReservesTheRightToShutDown" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.limitationOfLiability" /></h2>
              <p><FormattedMessage id="terms.allUseOfTheService" /></p>
              <p><FormattedMessage id="terms.getANewsletterIsNotResponsible" /></p>
              <p><FormattedMessage id="terms.getANewslettersLiability" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.prohibitedUseOfService" /></h2>
              <p><FormattedMessage id="terms.theUserAgreesToUseTheService" /></p>
              <p><FormattedMessage id="terms.youAreNotAllowedToSell" /></p>
              <p><FormattedMessage id="terms.theServiceMayNeverBeUsed" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.changesOfTheAgreement" /></h2>
              <p><FormattedMessage id="terms.getANewsletterMay" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.governingLaw" /></h2>
              <p><FormattedMessage id="terms.theAgreementShall" /></p>
              <p><FormattedMessage id="terms.anyDisputeArising" /></p>
              <p><FormattedMessage id="terms.theAgreementIsTranslated" /></p>
              <h1 className="mt-5" id="en_dataprocessing"><FormattedMessage id="terms.dataProcessingAgreement" /></h1>
              <p><FormattedMessage id="terms.addendumToTheCurrentTerms" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.generalTitle" /></h2>
              <p><FormattedMessage id="terms.theProcessorUndertakesToProcess" /></p>
              <p><FormattedMessage id="terms.itMayBeThatTheUser" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.instructionsFrom" /></h2>
              <p><FormattedMessage id="terms.theProcessorAndAnyPerson" /></p>
              <p><FormattedMessage id="terms.theControllerShallHaveTheRight" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.newFeaturesAffecting" /></h2>
              <p><FormattedMessage id="terms.ifNewFeatures" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.prohibitionAgainstTransfer" /></h2>
              <p><FormattedMessage id="terms.theProcessorShallProcessPersonalData" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.requestsFromAndContacts" /></h2>
              <p><FormattedMessage id="terms.inCaseADataSubject" /></p>
              <p><FormattedMessage id="terms.theProcessorShallWithoutDela" /></p>
              <p><FormattedMessage id="terms.theProcessorShallAgainstReasonable" /></p>
              <h2 className="mt-5"><FormattedMessage id="common.security" /></h2>
              <p><FormattedMessage id="terms.theProcessorShallTakeAppropriate" /></p>
              <p><FormattedMessage id="terms.theProcessorShallForThisPurpose" /></p>
              <p><FormattedMessage id="terms.theProcessorShallTakeAppropriate" /></p>
              <p><FormattedMessage id="terms.theProcessorWarrantsThatAll" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.subProcessors" /></h2>
              <p><FormattedMessage id="terms.theProcessorShallHaveTheRightToUseSubcontractors" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.erasureAndReturning" /></h2>
              <p><FormattedMessage id="terms.theProcessorAndAnyOfItsSub" /></p>
              <p><FormattedMessage id="terms.theControllerAndProcessorAgree" /></p>
              <p><FormattedMessage id="terms.uponRequest" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.liability" /></h2>
              <p><FormattedMessage id="terms.theControllerIsResponsible" /></p>
              <p><FormattedMessage id="terms.theProcessorShallBeLiable" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.termAndTermination" /></h2>
              <p><FormattedMessage id="terms.thisAgreementShallRemain" /></p>
              <p><FormattedMessage id="terms.thePartiesAgree" /></p>
              <h2 className="mt-5"><FormattedMessage id="terms.disputeAndApplicable" /></h2>
              <p><FormattedMessage id="terms.theAgreementShallBeConstrued" /></p>
              <p><FormattedMessage id="terms.anyDisputeArising" /></p>

            </div>
          </div>
        </div>

      </div>
    );
  }
}
