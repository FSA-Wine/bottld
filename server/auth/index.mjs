import express from 'express'
import { driver } from '../index.mjs'
import google from './google'

const router = express.Router()

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  const session = driver.session()
  try {
    if (req.user) {
      const cypher = `MATCH (n:User) WHERE ID(n) = ${req.user.identity.low} RETURN n`
      const { records } = await session.run(cypher)
      res.json(records[0]._fields[0].properties)
    } else res.json({})
  } catch (error) {
    console.error(error)
  } finally {
    await session.close()
  }
})

router.use('/google', google)

export default router
