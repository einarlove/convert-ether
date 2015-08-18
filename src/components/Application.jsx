import React, { Component, PropTypes } from 'react'
import ConvertValuta from './ConvertValuta'
import MarketValue from './MarketValue'
import Footer from './Footer'
import { getExhangeRate, getMarketValue, setEther } from '../actions'
import { connect } from 'react-redux'
import Loader from './Loader'

import 'styles/reset'
import 'styles/Application'

@connect(state => {
  return {
    currency: state.currency,
    marketValue: state.marketValue,
  }
})

export default class Application extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    marketValue: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const ether = parseInt(localStorage.getItem('ether'), 10)

    if (ether) {
      this.props.dispatch(setEther(ether))
    }
  }

  componentDidMount() {
    this.props.dispatch(getExhangeRate(this.props.currency))
    this.props.dispatch(getMarketValue())
  }

  render() {
    if (!this.props.marketValue.current) {
      return <Loader label="Fetching ether market value"/>
    }

    return (
      <div className="application">
        <main className="main-content">
          <ConvertValuta onEtherChange={ether => this.props.dispatch(setEther(ether))}/>
          <MarketValue />
        </main>
        <Footer />
      </div>
    )
  }
}
