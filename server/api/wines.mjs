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
    res.json(records)
  } catch (err) {
    res.status(500).send(err)
  } finally {
    await session.close()
  }
})

router.post('/liked', async (req, res) => {
  const session = driver.session()
  try {
    const likeCypher = `MATCH (w:Wine), (u:User) WHERE u.googleId = '${req.body.user.googleId}' AND w.id = '${req.body.wine.id}' MERGE (u)-[r:LIKED]->(w) RETURN u`
    const triedCypher = `MATCH (w:Wine), (u:User) WHERE u.googleId = '${req.body.user.googleId}' AND w.id = '${req.body.wine.id}' MERGE (u)-[r:TRIED]->(w) RETURN u`
    const record = await session.run(likeCypher)
    const { records } = await session.run(triedCypher)
    res.json(records)
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.delete('/liked', async (req, res) => {
  const session = driver.session()
  try {
    const unlikeCypher = `MATCH (u:User {googleId: '${req.body.user.googleId}'})-[r:LIKED]->(w:Wine {id: '${req.body.wine.id}'}) DELETE r RETURN u`
    const { records } = await session.run(unlikeCypher)
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
    const triedCypher = `MATCH (w:Wine), (u:User) WHERE u.googleId = '${req.body.user.googleId}' AND w.id = '${req.body.wine.id}' MERGE (u)-[r:TRIED]->(w) RETURN u`
    const { records } = await session.run(triedCypher)
    res.json(records)
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

router.delete('/tried', async (req, res) => {
  const session = driver.session()
  try {
    const untriedCypher = `MATCH (u:User {googleId: '${req.body.user.googleId}'})-[r:TRIED]->(w:Wine {id: '${req.body.wine.id}'}) DELETE r RETURN u`
    const { records } = await session.run(untriedCypher)
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
    const cypher = `MATCH (n:Wine), (a:Note) WHERE n.id = '${wineId}' AND a.title IN n.descriptors MERGE (a)-[:FOUND_IN]->(n) RETURN n`
    const cypher2 = `MATCH (w:Wine)<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine) WHERE w.id = '${wineId}' AND w.variety = w2.variety RETURN w, w2 LIMIT 5`
    const cypher3 = `MATCH (w:Wine), (n:Note), (c:Characteristic) WHERE w.id = '${wineId}' AND n.title IN w.descriptors AND (n)-[:ASSOC_WITH]-(c) RETURN c.title, count(c) AS count`
    const { records } = await session.run(cypher)
    const record2 = await session.run(cypher2)
    const record3 = await session.run(cypher3)
    data.push(records)
    data.push(record2.records)
    data.push(record3.records)

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
