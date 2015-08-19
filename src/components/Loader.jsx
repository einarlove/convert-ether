import React, { Component, PropTypes } from 'react'
import ripple from '../assets/ripple.svg'
import classnames from 'classnames'

import 'styles/Loader'

export default class Loader extends Component {

  static propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    color: 'currentColor',
  }

  constructor(props) {
    super(props)
  }

  render() {
    const className = classnames('loader', this.props.className)

    return (
      <div
        className={className}
        style={{stroke: this.props.color}}>
        <div className="svg-container" dangerouslySetInnerHTML={{__html: ripple}} />
        {this.props.label &&
          <div className="label">
            {this.props.label}
          </div>
        }
      </div>

    )
  }
}
