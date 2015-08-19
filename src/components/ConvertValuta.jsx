import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setEther } from '../actions'
import CurrencyDropdown from './CurrencyDropdown'
import Loader from './Loader'

import 'styles/ConvertValuta'

@connect(state => {
  return {
    ether: state.ether,
    rate: state.exchangeRates[state.currency],
    marketValue: state.marketValue,
  }
})

export default class ConvertValuta extends Component {
  constructor(props) {
    super(props)
  }

  spaceThousands(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009')
  }

  onEtherChange(event) {
    const ether = event.currentTarget.innerText.replace(/[^\+0-9]/g, '')
    this.props.dispatch(setEther(ether))
  }

  renderEther(ether) {
    return (
      <strong className="ether">
        <div
          className="user-input"
          contentEditable
          onInput={::this.onEtherChange}
          dangerouslySetInnerHTML={{__html: ether}} />
      </strong>
    )
  }

  render() {
    const { ether, rate, marketValue } = this.props

    let convertedValuta = Math.round((ether * marketValue.current) / rate)
    convertedValuta = this.spaceThousands(convertedValuta)

    if (!ether) {
      return (
        <div className="convert-valuta">
          Your {this.renderEther(ether)} ether is worth ...
        </div>
      )
    }

    return (
      <div className="convert-valuta">
        Your {this.renderEther(ether)} ether is worth {rate ? <strong>{convertedValuta}</strong> : <Loader className="currency-loader"/>} <CurrencyDropdown />
      </div>
    )
  }
}

ConvertValuta.propTypes = {
  dispatch: PropTypes.func,
  ether: PropTypes.number,
  rate: PropTypes.number,
  currency: PropTypes.string,
  marketValue: PropTypes.object,
}
