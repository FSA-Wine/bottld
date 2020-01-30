import express from "express";
import { driver } from "../index.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  let session;
  try {
    session = driver.session();
    const cypher = "MATCH (n:Wine) RETURN n LIMIT 100";
    const { records } = await session.run(cypher);
    res.send(records);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await session.close();
  }
});

router.get("/:wineId", async (req, res) => {
  let session;
  try {
    session = driver.session();
    const wineId = req.params.wineId;
    const cypher = `MATCH (n:Wine) WHERE ID(n) = ${wineId} RETURN n`;
    const { records } = await session.run(cypher);
    res.send(records);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await session.close();
  }
});

export default router;
