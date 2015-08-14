import React, { Component, PropTypes } from 'react'

// import 'styles/MarketPrice'

export default class MarketPrice extends Component {
  constructor(props) {
    super(props)
  }

  roundToTwoDecimal(value) {
    return +(Math.round(value + 'e+2')  + 'e-2')
  }

  render() {
    const { current, high, low } = this.props.marketValue

    return (
      <div className="market-price">
        The market price is currently <strong>{this.roundToTwoDecimal(current)}</strong>$ per ether,
         and has been <strong>{this.roundToTwoDecimal(high)}</strong>$ as the highest
          and <strong>{this.roundToTwoDecimal(low)}</strong>$ as lowest price the last 24 hours.
      </div>
    )
  }
}

MarketPrice.propTypes = {
  marketValue: PropTypes.object,
}
