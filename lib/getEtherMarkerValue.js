import axios from 'axios'
import querystring from 'querystring'

const endpoint = 'https://www.kraken.com/ajax'
const data = querystring.stringify({
  'a': 'fetch',
  'dataflag[acc]': 0,
  'dataflag[pub]': 3,
  'pair': 'ETHUSD',
})
const headers = {
  'x-requested-with': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded',
}

export default function getEtherMarketValue() {
  return axios.post(endpoint, data, {headers})
    .then(result => {
      const {
        last: current,
        high24: high,
        low24: low,
      } = result.data.data.current

      return {current, high, low}
    })
}
