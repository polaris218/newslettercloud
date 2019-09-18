import React from 'react'
import { Route, Switch } from 'react-router-dom'

import UpgradePage from './UpgradePage'
import PayByCardAccept from './Pays/PayByCardAccept'
import PayByCardCancel from './Pays/PayByCardCancel'
import PayByInvoiceAccept from './Pays/PayByInvoiceAccept'
import NewCreditCard from './Pays/NewCreditCardContainer'


const UpgradeRoutes = () => (
  <Switch>
    <Route exact path="/upgrade/new-credit-card" component={NewCreditCard} />
    <Route exact path="/upgrade/pay-by-invoices/accept" component={PayByInvoiceAccept} />
    <Route exact path="/upgrade/pay-by-card/accept" component={PayByCardAccept} />
    <Route exact path="/upgrade/cancel" component={PayByCardCancel} />
    <Route path="/upgrade" component={UpgradePage} />
  </Switch>
)

export default UpgradeRoutes
