import express from 'express'
import getEtherMarketValue from './getEtherMarketValue'
import getExchangeRate from './getExchangeRate'
import boom from 'boom'

const router = new express.Router()

router.use('/ether-market-value', (req, res) => {
  getEtherMarketValue().then(marketValue => {
    res.json(marketValue)
  })
})

router.use('/exchange-rate', (req, res, next) => {
  const { from, to } = req.query

  getExchangeRate(from, to).then(rate => {
    res.json({ rate })
  })
  .catch(next)
})

router.use((req, res, next) => {
  next(boom.notFound('No such endpoint'))
})

router.use((err, req, res, next) => {
  const { statusCode, payload } = boom.wrap(err).output
  res.status(statusCode).json(payload)
  next(err)
})

export default router
