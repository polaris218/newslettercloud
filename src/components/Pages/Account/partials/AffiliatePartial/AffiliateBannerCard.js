import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';


export default class AffiliateBannerCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      code: `<a href="${process.env.REACT_APP_AFFILIATE_LINK}/${props.id}/gan-${props.width}x${props.height}.png/click/"><img src="${process.env.REACT_APP_AFFILIATE_LINK}/${props.id}/gan-${props.width}x${props.height}.png" width="${props.width}px" height="${props.height}px" alt="Verktyg för nyhetsbrev" title="Verktyg för nyhetsbrev"></a>`,
      isVisible: false,
    }
  }

  onChange = (e) => {
    this.setState({ code: e.target.value })
  }

  showCode = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {
    const { width, height } = this.props
    return (
      <div className="card my-3">
        <h5 className="card-header">{width} x {height} px</h5>
        <div className="card-body">
          <div className="text-center mb-3" dangerouslySetInnerHTML={{__html: this.state.code}}></div>
          <div className="text-center">
            <button className="btn btn-outline-secondary" onClick={this.showCode}>
              <FormattedMessage id="affiliate.bannerAndLinks.showCode" />
            </button>
          </div>
            {
              this.state.isVisible && <div className="mt-3"><textarea className="form-control" name="code" rows="5" value={this.state.code} onChange={this.onChange} /></div>
            }
        </div>
      </div>
    )
  }
}
