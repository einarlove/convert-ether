import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import 'styles/ConvertValuta'

@connect(state => {
  return {
    ether: state.ether,
    currency: state.currency,
    rate: state.exchangeRates[state.currency],
    marketValue: state.marketValue,
  }
})

export default class ConvertValuta extends Component {
  constructor(props) {
    super(props)
  }

  onChange(event) {
    const ether = event.currentTarget.innerText.replace(/[^\+0-9]/g, '')
    this.props.onEtherChange(ether)
  }

  renderEther(ether) {
    return (
      <strong className="ether">
        <div
          className="user-input"
          contentEditable
          onInput={::this.onChange}
          dangerouslySetInnerHTML={{__html: ether}} />
      </strong>
    )
  }

  render() {
    const { ether, rate, marketValue, currency } = this.props
    const convertedValuta = Math.round((ether * marketValue.current) / rate)

    if (!ether) {
      return (
        <div className="convert-valuta">
          How much ether do you got? {this.renderEther(ether)}
        </div>
      )
    }

    return (
      <div className="convert-valuta">
        Your {this.renderEther(ether)} ether is worth <strong>{convertedValuta}</strong> {currency}
      </div>
    )
  }
}

ConvertValuta.propTypes = {
  ether: PropTypes.number,
  rate: PropTypes.number,
  currency: PropTypes.string,
  marketValue: PropTypes.object,
  onEtherChange: PropTypes.func.isRequired,
}
