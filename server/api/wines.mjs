import express from 'express'
import { driver } from '../index.mjs'
import paginate from './middleware/paginate'

const router = express.Router()

router.get('/', async (req, res) => {
  let session
  try {
    session = driver.session()
    const cypher = req.query.search
      ? `MATCH (n:Wine) WHERE toLower(n.title) STARTS WITH toLower('${req.query.search}') RETURN n`
      : 'MATCH (n:Wine) RETURN n'
    const { records } = await session.run(cypher)
    res.json(paginate(records, req.query.page, req.query.limit))
    res.json(records)
  } catch (err) {
    res.status(500).send(err)
  } finally {
    await session.close()
  }
})

router.get('/:wineId', async (req, res) => {
  let session
  try {
    session = driver.session()
    const wineId = req.params.wineId
    const cypher = `MATCH (n:Wine) WHERE ID(n) = ${wineId} RETURN n`
    const { records } = await session.run(cypher)
    res.send(records)
  } catch (err) {
    res.status(500).send(err)
  } finally {
    await session.close()
  }
})

export default router
