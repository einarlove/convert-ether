import React, { Component, PropTypes } from 'react'
import ripple from '../assets/ripple.svg'

// import 'styles/Loader'

export default class Loader extends Component {

  static propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
  }

  static defaultProps = {
    color: 'currentColor',
  }

  style = {
    minHeight: '100vh',
    marginTop: '-10%',
    display: '-webkit-flex',
    WebkitJustifyContent: 'center',
    WebkitAlignItems: 'center',
    WebkitFlexDirection: 'column',
  }

  svgStyle = {
    width: '6em',
  }

  labelStyle = {
    marginTop: '1em',
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className="loader"
        style={{...this.style, stroke: this.props.color}}>
        <div style={this.svgStyle} dangerouslySetInnerHTML={{__html: ripple}} />
        {this.props.label &&
          <div style={this.labelStyle}>{this.props.label}</div>
        }
      </div>

    )
  }
}
