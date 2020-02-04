import express from "express";
import { driver } from "../index.mjs";
import paginate from "./middleware/paginate";

const router = express.Router();

router.get('/', async (req, res) => {
  const session = driver.session()
  try {
    const cypher = `MATCH (n:Wine) WHERE toLower(n.title) STARTS WITH toLower('${req.query.search}') RETURN n LIMIT 250`
    const { records } = await session.run(cypher)
    res.json(paginate(records, req.query.page, req.query.limit))
    res.json(records)
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await session.close();
  }
});

router.get("/:wineId", async (req, res) => {
  const session = driver.session();
  try {
    let data = [];
    const wineId = req.params.wineId;
    const cypher = `MATCH (n:Wine), (a:Note) WHERE ID(n) = ${wineId} AND a.title IN n.descriptors MERGE (a)-[:FOUND_IN]->(n) RETURN n`;
    const cypher2 = `MATCH (w:Wine)<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine) WHERE ID(w) = ${wineId} AND w.variety = w2.variety RETURN w, w2 LIMIT 5`;
    const cypher3 = `MATCH (w:Wine), (n:Note), (c:Characteristic) WHERE ID(w) = ${wineId} AND n.title IN w.descriptors AND (n)-[:ASSOC_WITH]-(c) RETURN c.title, count(c) AS count`;
    const { records } = await session.run(cypher);
    const record2 = await session.run(cypher2);
    const record3 = await session.run(cypher3);
    data.push(records);
    data.push(record2.records);
    data.push(record3.records);

    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await session.close();
  }
});

export default router;

//creates relationships for the note to wines
// MATCH (a:Note), (b:Wine)
// WHERE a.title IN b.descriptors AND a.title = "berry" MERGE (a)-[:FOUND_IN]->(b) RETURN a, b

///returns related wines//
// MATCH (w:Wine {title: "Veramar 2016 JB Winemaker Series Chardonnay (Virginia)"})<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine) WHERE w.variety = w2.variety RETURN w2.title LIMIT 5

///MATCH (w:Wine)<-[:FOUND_IN]-(:Note)-[:FOUND_IN]->(w2:Wine) WHERE ID(w) = 8 AND w.variety = w2.variety RETURN w2 LIMIT 5///
///this returns all Characteristic Nodes related to the Note nodes found in this Wine

// MATCH (w:Wine), (n:Note), (c:Characteristic) WHERE ID(w) = 8 AND (n)-[:FOUND_IN]->(w) AND (n)-[:ASSOC_WITH]-(c) RETURN c
