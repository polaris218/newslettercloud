import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalHeader, ModalFooter } from 'components/Modal'
import { noop } from 'lib/utils'
import Spinner from 'components/Spinner'
import { connectFormResource } from 'common/utils/resource'


class PreviewModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onClose: noop,
  };

  state = {
    isMounted: false,
    isMobileView: false,
    previewUrl: true,
  }

  changeView = (e) => {
    this.setState({ isMobileView: e })
  }

  componentDidMount() {
    if(!this.props.previewUrl) {
      this.props.mails.fetch()
    }
    setTimeout(_ => {
      this.setState({ isMounted: !this.state.isMounted })
    }, 1000)
  }

  componentWillUnmount() {
    this.props.mails.setData(null)
  }

  render() {
    const { onClose, previewUrl, mails } = this.props;
    return (
      <Modal onClose={onClose} className={this.state.isMobileView ? 'preview-modal preview-modal--mobile' : 'preview-modal'}>
        <ModalHeader name={<FormattedMessage id="common.preview" />} onClose={onClose} />
        <nav className="preview-modal__row">
          <button onClick={() => this.changeView(false)} className={`preview-modal__btn nav-link btn-link ${!this.state.isMobileView ? 'active' : 'inactive'}`}><FormattedMessage id="common.desktop" /></button>
          <button onClick={() => this.changeView(true)} className={`preview-modal__btn nav-link btn-link ${this.state.isMobileView ? 'active' : 'inactive'}`}><FormattedMessage id="common.mobile" /></button>
        </nav>
        <iframe
          title={<FormattedMessage id="common.preview" />}
          src={previewUrl || get(mails, 'data.preview_url')}
          frameBorder="0"
          className={this.state.isMounted ? 'preview-modal__frame' : 'preview-modal__frame hidden'}
        />
        <Spinner show={!this.state.isMounted || mails.isLoading} />
        <ModalFooter>
          <button className="btn btn-success" onClick={onClose}>
            <FormattedMessage id="common.ok" />
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default connectFormResource({
  namespace: 'mails',
  endpoint: 'mails/all/:id?',
  idKey: 'id',
  prefetch:false,
  list: true,
  async: true,
})(PreviewModal)
