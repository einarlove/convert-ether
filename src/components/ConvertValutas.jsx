import React, { Component, PropTypes } from 'react'

// import 'styles/ConvertValutas'

export default class ConvertValutas extends Component {
  constructor(props) {
    super(props)
  }

  onChange(event) {
    const ether = event.currentTarget.value.replace(/[^\+0-9]/g, '')
    this.props.onChangeEther(Number(ether))
  }

  renderEther(ether) {
    return (
      <strong className="ether">
        <input onChange={::this.onChange} value={ether} />
      </strong>
    )
  }

  render() {
    const { ether, convertedValuta } = this.props

    return (
      <div className="convert-valutas">
        Your {this.renderEther(ether)} ether is worth <strong>{convertedValuta}</strong> kr
      </div>
    )
  }
}

ConvertValutas.defaultProps = {
  convertedValuta: 0,
}

ConvertValutas.propTypes = {
  ether: PropTypes.number,
  convertedValuta: PropTypes.number,
  onChangeEther: PropTypes.func.isRequired,
}
