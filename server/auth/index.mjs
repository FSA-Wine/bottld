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
      const cypher = `MATCH (n:User) WHERE n.googleId = '${req.user.properties.googleId}' RETURN n`
      const { records } = await session.run(cypher)
      res.json(records[0]._fields[0].properties)
    } else res.json({})
  } catch (error) {
    console.error(error)
  } finally {
    await session.close()
  }
})

///Basis for multi wine reccommendation by id
// MATCH (a:Wine {id: 8})<-[:FOUND_IN]-(n:Note)-[:FOUND_IN]->(w2:Wine), (b:Wine {id: 87})<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine), (c:Wine {id: 176})<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine) WITH w2, COUNT(*) AS commonNotes RETURN w2, commonNotes ORDER BY commonNotes DESC LIMIT 5

router.use('/google', google)

export default router
