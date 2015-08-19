import React, { Component } from 'react'
import analytics from '../utils/analytics'

import 'styles/Footer'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }

  onClick() {
    analytics.track('visits kraken.com')
  }

  render() {
    return (
      <a onClick={this.onClick} className="footer" target="_blank" href="http://kraken.com/charts">
        Market value taken from kraken.com
      </a>
    )
  }
}
