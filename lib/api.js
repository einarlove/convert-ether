import express from 'express'
import getEtherMarkerValue from './getEtherMarkerValue'
import convertUSD2NOK from './convertUSD2NOK'

const router = new express.Router()

router.use('/get-ether-in-nok', (req, res) => {
  const ether = req.query.ether

  getEtherMarkerValue().then(marketValue => {
    return convertUSD2NOK(ether * marketValue.current)
      .then(nok => {
        return { ether, nok, marketValue }
      })
  })
  .then(result => {
    res.json(result)
  })
  .catch(console.log)
})

export default router
