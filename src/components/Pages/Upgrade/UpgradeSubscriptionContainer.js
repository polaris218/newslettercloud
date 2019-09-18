import React, { Component } from 'react'
import { debounce } from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'

import UpgradeSubscription from './UpgradeSubscription'
import { connectResource, setData } from 'common/utils/resource'


class UpgradeSubscriptionContainer extends Component {
  constructor(props) {
    super(props)
    this.setArticles = debounce(this.setArticles, 500)
    this.state = {
      articles: [],
      period: '1',
      contacts: 100,
      currency: 'SEK',
    }
  }

  selectArticle = async (data, start) => {
    await this.props.setData(
      {
        ...data,
        start
      },
      { resource: { namespace: 'articleData' } }
    )
    if(this.props.address.data.address_1 || this.props.profile.data.different_billing_address) {
      return this.props.history.push('/upgrade/summary')
    }
    return this.props.history.push('/upgrade/information')
  }

  selectPeriod = (e) => {
    this.setState({ period: e }, _ => this.setArticles())
  }

  selectCurrency = (e) => {
    return this.props.profile.update({ currency_code: e })
      .then(_ => this.props.articles.fetch())
      .then(_ => this.setArticles())
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value }, _ => this.setArticles())
  }

  setArticles = () => {
    this.setState({
      articles: this.props.articles.data.filter(i => {
        if(`${i.months}` === this.state.period) {
          if(this.props.profile.data.subscription.is_contact_based) {
            let contacts = this.state.contacts <= 100 ? 100 : this.state.contacts
            return (i.amount_contacts > contacts) && (i.amount_contacts >= contacts)
          } else {
            return (i.amount > this.props.profile.data.subscription.number_of_emails)
          }
        }
      }).filter((_, index) => index <= 4)
    })
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.articles.data && this.props.articles.data) {
      this.setArticles()
    }

    if(!prevProps.profile.data && this.props.profile.data) {
      return this.setState({
        contacts: this.props.profile.data.subscription.max_number_of_contacts || 100,
        period: `${this.props.profile.data.subscription.number_of_months}` || '1',
      })
    }

    if(prevProps.profile.isLoading && !this.props.profile.isLoading) {
      return this.setState({
        currency: this.props.profile.data.currency_code,
      })
    }
  }

  componentWillUnmount() {
    this.props.articles.setData(null)
  }

  render() {
    return <UpgradeSubscription
      {...this.props}
      selectPeriod={this.selectPeriod}
      selectCurrency={this.selectCurrency}
      period={this.state.period}
      contacts={this.state.contacts}
      currency={this.state.currency}
      onChange={this.onChange}
      articlesData={this.state.articles}
      selectArticle={this.selectArticle}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'articles',
    endpoint: 'available_articles',
    filters: { paginate_by: 300 },
    list: true,
    async: true,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    prefetch: false,
  }),
  connectResource({
    namespace: 'address',
    endpoint: 'profile/address',
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'discount',
    endpoint: 'upgrade_discount',
    async: true,
  }),
  connect(null, { setData }),
)(UpgradeSubscriptionContainer)
