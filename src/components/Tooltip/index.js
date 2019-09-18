import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export const TooltipPosition = {
  TOP: 'bs-tooltip-top',
  RIGHT: 'bs-tooltip-right',
  BOTTOM: 'bs-tooltip-bottom',
  LEFT: 'bs-tooltip-left'
};

class TooltipComponent extends Component {
  static propTypes = {
    elRect: PropTypes.object,
    position: PropTypes.string,
    content: PropTypes.node,
    show: PropTypes.bool
  };

  static defaultProps = {
    elRect: { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 },
    position: TooltipPosition.TOP,
    content: null,
    show: false
  };

  state = { arrowPosition: {}, tooltipPosition: {}, fadeIn: false };
  inner = React.createRef();
  arrow = React.createRef();

  getArrowPosition = () => {
    const innerWidth = this.inner.current.offsetWidth;
    const innerHeight = this.inner.current.offsetHeight;

    const arrowWidth = this.arrow.current.offsetWidth;
    const arrowHeight = this.arrow.current.offsetHeight;

    switch (this.props.position) {
      case TooltipPosition.RIGHT:
        return {
          bottom: `${(innerHeight >> 1) - (arrowHeight >> 1)}px`,
          left: '0'
        };

      case TooltipPosition.LEFT:
        return {
          right: '0',
          bottom: `${(innerHeight >> 1) - (arrowHeight >> 1)}px`
        };

      case TooltipPosition.BOTTOM:
        return {
          top: '0',
          left: `${(innerWidth >> 1) - (arrowWidth >> 1)}px`
        };

      default:
        // Fallback to TOP position
        return {
          bottom: '0',
          left: `${(innerWidth >> 1) - (arrowWidth >> 1)}px`
        };
    }
  };

  getTooltipPosition = () => {
    const rect = this.props.elRect;
    const inner = this.inner.current;
    const tooltipWidth = inner.parentNode.offsetWidth;
    const tooltipHeight = inner.parentNode.offsetHeight;
    const elWidth = rect.width;
    const elHeight = rect.height;
    const elTop = rect.top + window.scrollY;
    const elLeft = rect.left + window.scrollX;
    const diffX = (tooltipWidth - elWidth) >> 1;
    const diffY = (tooltipHeight - elHeight) >> 1;
    const centerX = elLeft - diffX;
    const centerY = elTop - diffY;

    switch (this.props.position) {
      case TooltipPosition.RIGHT:
        return {
          top: `${centerY}px`,
          left: `${elLeft + elWidth}px`
        };

      case TooltipPosition.LEFT:
        return {
          top: `${centerY}px`,
          left: `${elLeft - tooltipWidth}px`
        };

      case TooltipPosition.BOTTOM:
        return {
          top: `${elTop + elHeight}px`,
          left: `${centerX}px`
        };

      default:
        // Fallback to TOP position
        return {
          top: `${elTop - inner.parentNode.offsetHeight}px`,
          left: `${centerX}px`
        };
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      if (this.props.show) {
        this.setState({
          arrowPosition: this.getArrowPosition(),
          tooltipPosition: this.getTooltipPosition(),
          fadeIn: true
        });
      } else {
        this.setState({ fadeIn: false });
      }
    }
  }

  render() {
    const { position, content } = this.props;

    return this.props.show ? (
      <div className={`tooltip fade ${this.state.fadeIn ? 'show' : ''} ${position}`} style={this.state.tooltipPosition}>
        <div className="tooltip-inner" ref={this.inner}>
          {content}
        </div>
        <div className="arrow" style={this.state.arrowPosition} ref={this.arrow} />
      </div>
    ) : null;
  }
}

export default class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    position: PropTypes.oneOf([
      TooltipPosition.TOP,
      TooltipPosition.RIGHT,
      TooltipPosition.BOTTOM,
      TooltipPosition.LEFT
    ])
  };

  static defaultProps = {
    children: null,
    content: null,
    position: TooltipPosition.TOP
  };

  container = document.getElementById('root');
  el = null;
  state = { show: false, elRect: { left: 0, right: 0, top: 0, bottom: 0 } };

  onMouseOver = () => {
    this.setState({ show: true, elRect: this.el.getBoundingClientRect() });
  };

  onMouseLeave = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
    this.el.addEventListener('mouseover', this.onMouseOver);
    this.el.addEventListener('mouseleave', this.onMouseLeave);
  }

  render() {
    return [
      this.props.children,
      ReactDOM.createPortal(
        <TooltipComponent
          position={this.props.position}
          content={this.props.content}
          elRect={this.state.elRect}
          show={this.state.show}
        />,
        this.container
      )
    ];
  }
}
