import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import FeedBackModal from './FeedBackModal'


class FeedBackLayout extends React.Component {

  state = {
    opened: false,
  }

  toggleModal = () => {
    this.setState({ opened: !this.state.opened })
  }

  componentDidUpdate() {
    if(get(this.props, 'location.state.openFeedback')) {
      this.props.history.push({
        state: { openFeedback: false },
      });
      this.setState({
        opened: true,
      })
    }
  }

  render() {
    return (
      <>
        {this.props.children}
        {this.props.token && <button onClick={this.toggleModal} className="btn btn-secondary btn-feedback"><FormattedMessage id="feedback.title" /></button>}
        {this.props.token && this.state.opened && <FeedBackModal
          onClose={this.toggleModal}
        />}
      </>
    )
  }
}

export default withRouter(connect((state) => ({ token: get(state, 'resource.session.data.token') }))(FeedBackLayout))
