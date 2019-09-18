import React from 'react'
import { FormattedMessage } from 'react-intl'

import Spinner from '../Spinner'


const PageLoading = ({ error, timedOut, pastDelay, retry }) => {
  if (error) {
    // When the loader has errored
    return (
      <div className="container">
        <h3>
          <FormattedMessage id="pageLoading.error" /><button onClick={retry}><FormattedMessage id="common.retry" /></button>
        </h3>
      </div>
    )
  } else if (timedOut) {
    // When the loader has taken longer than the timeout
    return (
      <div className="container">
        <h3>
          <FormattedMessage id="pageLoading.timeOut" /><button onClick={retry}><FormattedMessage id="common.retry" /></button>
        </h3>
      </div>
    )
  } else if (pastDelay) {
    return <Spinner show={true} />// When the loader has taken longer than the delay
  } else {
    return null
  }
}

export default PageLoading
