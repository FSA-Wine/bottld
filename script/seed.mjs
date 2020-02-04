import faker from "faker";
import { driver } from "../server/index.mjs";

const session = driver.session();

const wineSeeder = async () => {
  //Deletes all nodes and relationships
  await session.run("MATCH (n) DETACH DELETE n");
  await session.run("CREATE CONSTRAINT ON (d:Wine) ASSERT d.title IS UNIQUE");
  await session.run(
    "CREATE CONSTRAINT ON (d:Characteristic) ASSERT d.title IS UNIQUE"
  );
  await session.run("CREATE CONSTRAINT ON (d:Note) ASSERT d.title IS UNIQUE");
  await session.run(
    "CREATE CONSTRAINT ON (d:Variety) ASSERT d.title IS UNIQUE"
  );
  await session.run(
    "CREATE CONSTRAINT ON (d:Province) ASSERT d.title IS UNIQUE"
  );
  await session.run(
    "CREATE CONSTRAINT ON (d:Country) ASSERT d.title IS UNIQUE"
  );
  // await session.run("CREATE CONSTRAINT ON (d:User) ASSERT d.name IS UNIQUE");

  // for (let j = 0; j < 100; j++) {
  //   await session.run(
  //     `MERGE (a:User {name: "${faker.name.firstName()} ${faker.name.lastName()}", email: "${faker.internet.email()}", password: "${faker.random.word()}", userId: "${j}"}) RETURN a`
  //   );
  // }

  await session.run(
    `USING PERIODIC COMMIT 5000 LOAD CSV WITH HEADERS FROM 'file:///winemag-data-notes.csv' AS line MERGE (d:Wine {title: line.title}) ON CREATE SET d.country = line.country, d.description = trim(line.description), d.points = toInteger(line.points), d.price = toFloat(line.price), d.province = line.province, d.variety = line.variety, d.winery = line.winery, d.descriptors = split(lTrim(replace(replace(replace(line.normalized_descriptors, '[', ""), ']', ""), "'", "")), ", ")`
  );

  await session.run(
    `LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/RoaldSchuring/wine_recommender/master/descriptor_mapping.csv' AS line MERGE (d:Characteristic {title: line.level_1})`
  );
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/RoaldSchuring/wine_recommender/master/descriptor_mapping.csv' AS line MERGE (d:Note {title: line.level_3}) ON CREATE SET d.level1 = line.level_1`
  );
  // await session.run(
  //   `USING PERIODIC COMMIT 5000 LOAD CSV WITH HEADERS FROM 'file:///winemag-data-notes.csv' AS line MERGE (d:Wine {title: line.title}) ON CREATE SET d.country = line.country, d.description = trim(line.description), d.points = toInteger(line.points), d.price = toFloat(line.price), d.province = line.province, d.variety = line.variety, d.winery = line.winery, d.descriptors = split(line.normalized_descriptors, ',')`
  // );

  ///d.reviewVector = line.review_vector not included in this seed to reduce load time///

  ///CREATES Nodes for Variety, Province and Country from the wine data///
  //Wine Varieties
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'file:///winemag-data-notes.csv' AS line
    FOREACH (x IN CASE WHEN line.variety IS NULL THEN [] ELSE [1] END |
      MERGE (d:Variety {title: line.variety}))`
  );
  //Province
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'file:///winemag-data-notes.csv' AS line
    FOREACH (x IN CASE WHEN line.province IS NULL THEN [] ELSE [1] END |
      MERGE (d:Province {title: line.province}))`
  );
  //Country
  await session.run(
    `LOAD CSV WITH HEADERS FROM 'file:///winemag-data-notes.csv' AS line
    FOREACH (x IN CASE WHEN line.country IS NULL THEN [] ELSE [1] END |
      MERGE (d:Country {title: line.country}))`
  );

  ///Adds Properties WineColor and Lat/Long

  // await session.run(
  //   `LOAD CSV WITH HEADERS FROM 'file:///wine_categories_assigned.csv' AS line MATCH (d:Wine) WHERE d.variety = line.variety`
  // )

  ///Reationships: Wine-to-Note, Note-to-Characteristic, Wine-to-Variety, Wine-to-Province, Wine-to-Country////
  // await session.run(
  //   `MATCH (a:Note), (b:Wine)
  //   WHERE a.title IN b.descriptors
  //   CREATE (a)-[:FOUND_IN]->(b)
  //   RETURN a, b`
  // );

  // CALL apoc.periodic.iterate(
  //   "MATCH (a:Note), (b:Wine) WHERE a.title IN b.descriptors",
  //   "CREATE (a)-[:FOUND_IN]->(b)",
  //   {batchSize: 10000}
  // )

  // await session.run(
  //   `MATCH (a:Note), (b:Wine)
  //   WHERE a.title IN b.descriptors AND a.title = "allspice" MERGE (a)-[:FOUND_IN]->(b) RETURN a, b`
  // );

  await session.run(
    `MATCH (a:Note), (b:Wine)
    WHERE a.title IN b.descriptors AND a.title = "berry" MERGE (a)-[:FOUND_IN]->(b) RETURN a, b`
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

  // for (let i = 0; i < 100; i++) {
  //   await session.run(
  //     `MATCH (a:User), (b:Wine)
  //   WHERE id(b) = ${Math.floor(
  //     Math.random() * 80000
  //   )} AND a.userId = "${Math.floor(Math.random() * 90)}"
  //   MERGE (a)-[:ENJOYED_DRINKING]->(b)
  //   RETURN a, b`
  //   );
  // }

  session.close();
};

const runSeed = async () => {
  console.log("seeding...");
  try {
    await wineSeeder();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await driver.close();
    console.log("db connection closed");
  }
};

runSeed();
