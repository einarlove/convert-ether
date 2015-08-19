import request from 'axios'

export function getExhangeRate(currency) {
  return dispatch =>
    request.get('/api/exchange-rate', {
      params: {
        from: currency,
      },
    })
    .then(response => {
      dispatch({
        type: 'GET_EXCHANGE_RATE',
        currency: currency,
        rate: response.data.rate,
      })
    })
    .catch(error => {
      dispatch({
        type: 'FAILED_TO_GET_EXCHANGE_RATE',
        error: error.data,
      })
    })
}

export function getMarketValue() {
  return dispatch =>
    request.get('/api/ether-market-value')
    .then(response => {
      dispatch({
        type: 'GET_MARKET_VALUE',
        payload: response.data,
      })
    })
    .catch(error => {
      dispatch({
        type: 'FAILED_TO_GET_MARKET_VALUE',
        error: error.data,
      })
    })
}

export function setEther(ether) {
  localStorage.setItem('ether', ether)

  return {
    type: 'SET_ETHER',
    ether: ether,
  }
}

export function setCurrency(currency) {
  localStorage.setItem('currency', currency)

  return {
    type: 'SET_CURRENCY',
    currency: currency,
  }
}
