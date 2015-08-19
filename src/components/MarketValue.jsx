import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Loader from './Loader'

import 'styles/MarketValue'

@connect(state => {
  return {
    marketValue: state.marketValue,
  }
})

export default class MarketValue extends Component {
  constructor(props) {
    super(props)
  }

  roundToTwoDecimal(value) {
    return +(Math.round(value + 'e+2')  + 'e-2')
  }

  renderDollar(valuta) {
    return (
      <span>
        <strong>{this.roundToTwoDecimal(valuta)}</strong>
        <span style={{verticalAlign: 'text-top', fontSize: '.6em'}}>$</span>
      </span>
    )
  }

  render() {
    if (!this.props.marketValue.current) {
      return <Loader />
    }

    const { current, high, low } = this.props.marketValue

    return (
      <div className="market-value">
        The market price is currently {this.renderDollar(current)} per ether,
         and has been {this.renderDollar(high)} as the highest
          and {this.renderDollar(low)} as lowest price the <nobr>last 24 hours.</nobr>
      </div>
    )
  }
}

MarketValue.propTypes = {
  marketValue: PropTypes.object,
}
