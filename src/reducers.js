export function exchangeRates(state = {}, action) {
  switch (action.type) {
  case 'GET_EXCHANGE_RATE':
    return {
      ...state,
      [action.currency]: action.rate,
    }

  case 'FAILED_TO_GET_EXCHANGE_RATE':
    return state

  default:
    return state
  }
}

export function currency(state = 'NOK', action) {
  switch (action.type) {
  case 'SET_CURRENCY':
    return action.currency
  default:
    return state
  }
}

export function ether(state = null, action) {
  switch (action.type) {
  case 'SET_ETHER':
    return action.ether

  default:
    return state
  }
}

export function marketValue(state = {}, action) {
  switch (action.type) {
  case 'GET_MARKET_VALUE':
    return action.payload

  case 'FAILED_TO_GET_MARKET_VALUE':
    return state

  default:
    return state
  }
}
