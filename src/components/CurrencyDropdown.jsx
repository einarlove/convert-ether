import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setCurrency } from '../actions'
import currencyAlias from '../lib/currency-alias.json'
import Dropdown from 'react-lite-dropdown'

import 'styles/CurrencyDropdown'

function getCurrencyAlias(currency) {
  return currencyAlias[currency] || currency
}

const supportedCurrencies = [
  'USD', 'EUR', 'GBP', 'NOK', 'DKK',
]

@connect(state => {
  return {
    currency: state.currency,
  }
})

export default class CurrencyDropdown extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    currency: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  onToggle() {
    this.setState({
      open: !this.state.open,
    })
  }

  onChangeCurrency(currency) {
    this.props.dispatch(setCurrency(currency))
    this.onToggle()
  }

  renderChildren() {
    return supportedCurrencies.map(currency => {
      return (
        <div
          className={currency === this.props.currency && 'is-active'}
          key={currency}
          onClick={this.onChangeCurrency.bind(this, currency)}>
          {currency}
        </div>
      )
    })
  }

  render() {
    return (
      <Dropdown
        name="currency-dropdown"
        defaultText="Select currency"
        displayText={getCurrencyAlias(this.props.currency)}
        show={this.state.open}
        onToggle={::this.onToggle}
        children={::this.renderChildren()}
      />
    )
  }
}
