import express from 'express'
import next from 'next'

const PORT = process.env.PORT || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(PORT, err => {
      if (err) throw err
      console.log(`Now running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
