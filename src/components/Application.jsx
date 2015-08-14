import React, { Component } from 'react'
import ConvertValutas from './ConvertValutas'
import MarketPrice from './MarketPrice'
import Footer from './Footer'
import axios from 'axios'

import 'styles/reset'
import 'styles/Application'

export default class Application extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ether: Number(localStorage.getItem('ether')),
      convertedValuta: null,
      marketValue: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.getEtherValue()
  }

  getEtherValue() {
    this.setState({
      loading: true,
    })

    axios.get('/api/get-ether-in-nok', {
      params: {
        ether: this.state.ether,
      },
    }).then(result => {
      const { nok: convertedValuta, marketValue } = result.data
      this.setState({ convertedValuta, marketValue, loading: false })
    })
  }

  onEtherChange(ether) {
    this.setState({ ether })
    this.getEtherValue()
    localStorage.setItem('ether', ether)
  }

  render() {
    const {ether, convertedValuta, marketValue} = this.state

    return (
      <div className="Application">
        <ConvertValutas
          ether={ether}
          convertedValuta={convertedValuta}
          onChangeEther={::this.onEtherChange}
        />

        {marketValue &&
          <MarketPrice marketValue={marketValue} />
        }
        <Footer />
      </div>
    )
  }
}
