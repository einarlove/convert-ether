import axios from 'axios'
const endpoint = 'https://api.fixer.io/latest?base=NOK'

function convertUSD2NOK(dollars) {
  return axios.get(endpoint)
    .then(result => {
      return Math.round(dollars / result.data.rates.USD)
    })
}

module.exports = convertUSD2NOK
