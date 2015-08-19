import React, { Component, PropTypes } from 'react'
import fastclick from 'fastclick'
import ConvertValuta from './ConvertValuta'
import MarketValue from './MarketValue'
import Footer from './Footer'
import { getExhangeRate, getMarketValue } from '../actions'
import { connect } from 'react-redux'
import Loader from './Loader'
import analytics from '../utils/analytics'

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

  componentDidMount() {
    fastclick.attach(document.body)

    this.props.dispatch(getExhangeRate(this.props.currency))
    this.props.dispatch(getMarketValue())

    analytics.page('Front page')
  }

  componentWillUpdate(nextProps) {
    if (this.props.currency !== nextProps.currency) {
      this.props.dispatch(getExhangeRate(nextProps.currency))
    }
  }

  render() {
    if (!this.props.marketValue.current || true) {
      return <Loader className="page-loader" label="Fetching ether market value"/>
    }

    return (
      <div className="application">
        <main className="main-content">
          <ConvertValuta />
          <MarketValue />
        </main>
        <Footer />
      </div>
    )
  }
}
