import axios from 'axios'
import boom from 'boom'
const endpoint = 'https://api.fixer.io/latest'

function exhangeRate(from, to = 'USD') {
  if (!from) {
    throw boom.badRequest('missing from parameter')
  }

  if (from === to) {
    return Promise.resolve(1)
  }

  return axios.get(endpoint, {
    params: {
      base: from,
    },
  })
  .catch(error => {
    return boom.wrap(error)
  })
  .then(result => {
    return result.data.rates[to]
  }, () => {
    throw boom.notFound(`${to} exchange rate was not found for ${from}.`)
  })
}

module.exports = exhangeRate
