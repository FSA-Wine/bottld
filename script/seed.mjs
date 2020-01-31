import faker from "faker";
import { db, driver } from "../server/index.mjs";

const session = driver.session();

const wineSeeder = async db => {
  //Deletes all nodes and relationships
  await session.run("MATCH (n) DETACH DELETE n");
  await session.run(
    "CREATE CONSTRAINT ON (d:Characteristic) ASSERT d.title IS UNIQUE"
  );
  await session.run("CREATE CONSTRAINT ON (d:Note) ASSERT d.title IS UNIQUE");
  await session.run("CREATE CONSTRAINT ON (d:Wine) ASSERT d.title IS UNIQUE");
  await session.run(
    "CREATE CONSTRAINT ON (d:Variety) ASSERT d.title IS UNIQUE"
  );
  await session.run(
    "CREATE CONSTRAINT ON (d:Province) ASSERT d.title IS UNIQUE"
  );
  await session.run(
    "CREATE CONSTRAINT ON (d:Country) ASSERT d.title IS UNIQUE"
  );
  await session.run("CREATE CONSTRAINT ON (d:User) ASSERT d.name IS UNIQUE");

  // let UserArr =[]
  // for (let j = 0; j < 100; j++) {
  //   UserArr.push({id: j, name: `${faker.name.firstName()} ${faker.name.lastName()}`})
  // }

  // for (let j = 0; j < 100; j++) {
  //   let curName = `${faker.name.firstName()} ${faker.name.lastName()}`;
  //   await session.run(`MERGE (a:User {name: curName}) RETURN a`);
  // }

  await session.run(
    `LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/RoaldSchuring/wine_recommender/master/descriptor_mapping.csv' AS line MERGE (d:Characteristic {title: line.level_1})`
  );
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/RoaldSchuring/wine_recommender/master/descriptor_mapping.csv' AS line MERGE (d:Note {title: line["raw descriptor"]}) ON CREATE SET d.level1 = line.level_1`
  );
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'file:///winemag-data-130k-v2.csv' AS line MERGE (d:Wine {title: line.title}) ON CREATE SET d.country = line.country, d.description = trim(line.description), d.points = toInteger(line.points), d.price = toFloat(line.price), d.province = line.province, d.variety = line.variety, d.winery = line.winery`
  );
  //Wine Varieties
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'file:///winemag-data-130k-v2.csv' AS line
    FOREACH (x IN CASE WHEN line.variety IS NULL THEN [] ELSE [1] END |
      MERGE (d:Variety {title: line.variety}))`
  );
  //Province
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'file:///winemag-data-130k-v2.csv' AS line
    FOREACH (x IN CASE WHEN line.province IS NULL THEN [] ELSE [1] END |
      MERGE (d:Province {title: line.province}))`
  );
  //Country
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'file:///winemag-data-130k-v2.csv' AS line
    FOREACH (x IN CASE WHEN line.country IS NULL THEN [] ELSE [1] END |
      MERGE (d:Country {title: line.country}))`
  );

  await session.run(
    `MATCH (a:Note), (b:Characteristic)
    WHERE a.level1 = b.title
    CREATE (a)-[:ASSOC_WITH]->(b)
    RETURN a, b`
  );
  await session.run(
    `MATCH (a:Wine), (b:Variety)
    WHERE a.variety = b.title
    CREATE (a)-[:VARIETY_OF]->(b)
    RETURN a, b`
  );
  await session.run(
    `MATCH (a:Wine), (b:Province)
    WHERE a.province = b.title
    CREATE (a)-[:GRAPES_FROM]->(b)
    RETURN a, b`
  );
  await session.run(
    `MATCH (a:Wine), (b:Country)
    WHERE a.country = b.title
    CREATE (a)-[:CREATED_IN]->(b)
    RETURN a, b`
  );

  session.close();
  driver.close();
};

const runSeed = async () => {
  console.log("seeding...");
  try {
    await wineSeeder(db);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

runSeed();
