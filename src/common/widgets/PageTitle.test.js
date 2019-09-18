import React from 'react'
import { shallow, mount } from 'enzyme'
import { IntlProvider, addLocaleData } from 'react-intl'

import PageTitle from './PageTitle'
import en from 'react-intl/locale-data/en'
import sv from 'react-intl/locale-data/sv'
import messages from 'i18n'

const locale = 'en'
addLocaleData([...en, ...sv])


it('renders without crashing', () => {
  shallow( <IntlProvider locale={locale} messages={messages[locale]}>
    <PageTitle />
  </IntlProvider>)
})

it("render correct page title", () => {
  mount(<IntlProvider locale={locale} messages={messages[locale]}>
    <PageTitle  title="title.login"/>
  </IntlProvider>)

  expect(document.title).toBe('Login')
})

it("render default page title", () => {
  mount(<IntlProvider locale={locale} messages={messages[locale]}>
    <PageTitle/>
  </IntlProvider>)

  expect(document.title).toBe('Get a Newsletter | App')
})
