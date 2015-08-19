import express from 'express'
import api from './lib/api'

const app = express()

app.use(express.static('./public'))
app.use(express.static('./build'))
app.use('/api', api)

if (!module.parent) {
  app.listen(process.env.PORT || 5000)
}

module.exports = app
