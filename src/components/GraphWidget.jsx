import React, { Component } from 'react'
import qs from 'qs'

const queryOptions = qs.stringify({
  symbol: 'ETHUSD',
  interval: 'D',
  symboledit: 1,
  toolbarbg: 'f1f3f6',
  hideideas: 1,
  studies: '',
  theme: 'White',
  style: 2,
  timezone: 'exchange',
})

const url = `https://dwq4do82y8xi7.cloudfront.net/widgetembed/?${queryOptions}`

import 'styles/GraphWidget'

export default class GraphWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  onToggle() {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    if (!this.state.visible) {
      return <button onClick={::this.onToggle} className="graph-widget-toggle-button">View graph</button>
    }

    return (
      <iframe src={url} style={{height: '30em'}}/>
    )
  }
}
