import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Modal, ModalBody, ModalHeader, ModalFooter } from 'components/Modal'
import Spinner from 'components/Spinner'
import API from 'api'


export default class ExportReportModal extends React.Component{
  state = {
    link: null,
    error: false,
  }

  componentDidMount() {
    return API(`reports/${this.props.id}/${this.props.endpoint ? this.props.endpoint : 'export'}`).post({mock: true}, this.props.params)
      .then(data => this.setState({ link: get(data, 'task_data.download_url'), error: false,  }))
      .catch(err => this.setState({ error: true }))
  }

  render() {
    const props = this.props
    return (
      <Modal onClose={props.onClose} className="confirmation-modal">
        <form onSubmit={props.onSubmit}>
          <ModalBody>
            <h5><FormattedMessage id="contacts.modal.export.header" values={{ count: props.count }} /></h5>
            { !this.state.link && !this.state.error && <>
            <p><FormattedMessage id="contacts.subscriptions.takeAWhile" /></p>
            <div className="position-relative p-3">
              <Spinner show={true} />
            </div>
            </>}
            {
              this.state.error && <p>
                The error occurs and report's data can't be exported.
              </p>
            }
            {
              this.state.link && <>
                <p><FormattedMessage id="contacts.subscriptions.getData" /></p>
                <a href={this.state.link} className="btn btn-success btn-block">
                  <FormattedMessage id="contacts.subscriptions.download" />
                </a>
              </>
            }
          </ModalBody>
          <ModalFooter className="justify-content-end">
            <button type="button" className="btn btn-outline-secondary btn-block" onClick={props.onClose}>
              <FormattedMessage id="common.close" />
            </button>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}
