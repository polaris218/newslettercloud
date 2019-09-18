import React from 'react'
import { ToastContainer } from 'react-toastify'
import { hot } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import sv from 'react-intl/locale-data/sv'
import { compose } from 'redux'
import get from 'lodash/get'

import AppBar from 'components/AppBar'
import Footer from 'components/Footer'
import Authenticate from 'components/Authenticate'
import Routes from './Routes'
import ScrollToTop from 'components/ScrollToTop'
import FeedBackLayout from '../Feedback/FeedBackLayout'
import messages from 'i18n'
import { connectResource } from 'common/utils/resource'


addLocaleData([...en, ...sv])

function App({ store, history, profile }) {
  let locale = get(profile, 'data.language') || 'en'
  return (
    <ConnectedRouter history={history}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <>
          <ScrollToTop>
            <FeedBackLayout>
              <Authenticate>
                <Routes />
              </Authenticate>
            </FeedBackLayout>
          </ScrollToTop>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </>
      </IntlProvider>
    </ConnectedRouter>
  )
}

export default compose(
  hot(module),
  connectResource({
    namespace: 'profile',
    prefetch: false,
  })
)(App)
