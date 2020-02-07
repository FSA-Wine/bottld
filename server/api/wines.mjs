import express from 'express'
import { driver } from '../index.mjs'
import paginate from './middleware/paginate'

const router = express.Router()

router.get('/', async (req, res) => {
  const session = driver.session()
  try {
    const cypher = `MATCH (n:Wine) WHERE toLower(n.title) CONTAINS toLower('${req.query.search}') RETURN n LIMIT 250`
    const { records } = await session.run(cypher)
    res.json(paginate(records, req.query.page, req.query.limit))
  } catch (err) {
    res.status(500).send(err)
  } finally {
    await session.close()
  }
})

router.get('/recommended', async (req, res) => {
  const session = driver.session()
  try {
    if (req.user) {
      const cypher = `MATCH (u:User {googleId: '${req.user.properties.googleId}'})-[r:LIKED]->(wine)-[r2:SIMILAR]->(w:Wine) WHERE NOT exists((u)-[r]->(w)) RETURN w,u, count(*) AS occurrence ORDER BY occurrence DESC LIMIT 5`
      const { records } = await session.run(cypher)
      res.json(records)
    } else res.json([])
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.get('/liked', async (req, res) => {
  const session = driver.session()
  try {
    const cypher = `MATCH (u:User {googleId: '${req.query.googleId}'})-[r:LIKED]->(Wine) RETURN Wine`
    const { records } = await session.run(cypher)
    res.json(records)
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.get('/tried', async (req, res) => {
  const session = driver.session()
  try {
    const cypher = `MATCH (u:User {googleId: '${req.query.googleId}'})-[r:TRIED]->(Wine) RETURN Wine`
    const { records } = await session.run(cypher)
    res.json(records)
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.post('/liked', async (req, res) => {
  const session = driver.session()
  try {
    const likeCypher = `MATCH (w:Wine), (u:User) WHERE u.googleId = '${req.body.user.googleId}' AND w.id = ${req.body.wine.id.low} MERGE (u)-[r:LIKED]->(w) RETURN w`
    const triedCypher = `MATCH (w:Wine), (u:User) WHERE u.googleId = '${req.body.user.googleId}' AND w.id = ${req.body.wine.id.low} MERGE (u)-[r:TRIED]->(w) RETURN w`
    const record = await session.run(likeCypher)
    const { records } = await session.run(triedCypher)
    res.json(records[0])
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.delete('/liked', async (req, res) => {
  const session = driver.session()
  try {
    const unlikeCypher = `MATCH (u:User {googleId: '${req.body.user.googleId}'})-[r:LIKED]->(w:Wine {id: ${req.body.wine.id.low}}) DELETE r`
    await session.run(unlikeCypher)
    const cypher = `MATCH (u:User {googleId: '${req.body.user.googleId}'})-[r:LIKED]->(Wine) RETURN Wine`
    const { records } = await session.run(cypher)
    res.json(records)
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.post('/tried', async (req, res) => {
  const session = driver.session()
  try {
    const triedCypher = `MATCH (w:Wine), (u:User) WHERE u.googleId = '${req.body.user.googleId}' AND w.id = ${req.body.wine.id.low} MERGE (u)-[r:TRIED]->(w) RETURN w`
    const { records } = await session.run(triedCypher)
    res.json(records[0])
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.delete('/tried', async (req, res) => {
  const session = driver.session()
  try {
    const untriedCypher = `MATCH (u:User {googleId: '${req.body.user.googleId}'})-[relationship]>(w:Wine {id: ${req.body.wine.id.low}}) DELETE relationship`
    await session.run(untriedCypher)
    const cypher = `MATCH (u:User {googleId: '${req.body.user.googleId}'})-[r:TRIED]->(Wine) RETURN Wine`
    const { records } = await session.run(cypher)
    res.json(records)
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.get('/:wineId', async (req, res) => {
  const session = driver.session()
  try {
    let data = []
    const wineId = req.params.wineId
    const cypher = `MATCH (n:Wine) WHERE n.id = ${wineId} RETURN n`

    //Returns the Wine + 5 similar wines
    const cypher2 = `MATCH (w1:Wine {id: ${wineId}})-[:SIMILAR]->(w2) RETURN w2`

    //Returns wine characteristics + # of occurrences
    const cypher3 = `MATCH (w:Wine {id: ${wineId}})-[:FOUND_IN]-(n:Note)-[:ASSOC_WITH]-(c:Characteristic) RETURN c.title, count(c) ORDER BY count(c) DESC LIMIT 6`
    const { records } = await session.run(cypher)
    const record2 = await session.run(cypher2)
    const record3 = await session.run(cypher3)
    data.push(records)
    data.push(record2.records)
    data.push(record3.records)

    // Checks if the current user likes the wine
    if (req.user) {
      const cypher4 = `MATCH (w:Wine {id: ${wineId}})<-[r:LIKED]-(u:User {googleId: '${req.user.properties.googleId}'}) RETURN count(w) > 0 as w`
      const record4 = await session.run(cypher4)
      data.push(record4.records[0]._fields[0])
    } else data.push(false)

    res.send(data)
  } catch (err) {
    res.status(500).send(err)
  } finally {
    await session.close()
  }
})

export default router

//creates relationships for the note to wines
// MATCH (a:Note), (b:Wine)
// WHERE a.title IN b.descriptors AND a.title = "berry" MERGE (a)-[:FOUND_IN]->(b) RETURN a, b

///returns related wines//
// MATCH (w:Wine {title: "Veramar 2016 JB Winemaker Series Chardonnay (Virginia)"})<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine) WHERE w.variety = w2.variety RETURN w2.title LIMIT 5

///MATCH (w:Wine)<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine) WHERE ID(w) = 8 AND w.variety = w2.variety RETURN w2 LIMIT 5///
///this returns all Characteristic Nodes related to the Note nodes found in this Wine

// MATCH (w:Wine), (n:Note), (c:Characteristic) WHERE ID(w) = 8 AND (n)-[:FOUND_IN]->(w) AND (n)-[:ASSOC_WITH]-(c) RETURN c
