import React, { Component } from 'react'

import 'styles/Footer'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a className="footer" target="_blank" href="http://kraken.com/charts">
        Market value taken from kraken.com
      </a>
    )
  }
}
