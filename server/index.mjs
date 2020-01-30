import express from 'express'
import next from 'next'
import dotenv from 'dotenv'
import morgan from 'morgan'
import session from 'express-session'
import passport from 'passport'
import neo4j from 'node-neo4j'
import neo4jDriver from 'neo4j-driver'

dotenv.config()
//Might need to change bolt??
export const db = new neo4j('bolt://localhost:7687')
export const driver = neo4jDriver.driver(
  'bolt://localhost:7687',
  neo4jDriver.auth.basic('neo4j', 'bottld')
)
const PORT = process.env.PORT
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser(async (id, done) => {
//   try {
//     // const user = await db.models.user.findByPk(id)
//   } catch (err) {
//     done(err)
//   }
// })

nextApp
  .prepare()
  .then(() => {
    const app = express()
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    // app.use(
    //   session({
    //     secret: process.env.SESSION_SECRET,
    //     // store: ,
    //     resave: false,
    //     saveUninitialized: false,
    //   })
    // )
    // app.use(passport.initialize())
    // app.use(passport.session())

    // API Routes
    // app.use('/auth', )
    // app.use('/api', )

    app.get('/api', (req, res) => {
      const session = driver.session()
      const cypher = 'MATCH (n:Wine) RETURN n LIMIT 25'
      session
        .run(cypher)
        .then(result => {
          res.send(result.records)
        })
        .catch(err => res.status(55).send(err))
        .then(() => session.close())
    })

    //Handles React stuff
    app.get('*', (req, res) => {
      return handle(req, res)
    })

    app.listen(PORT, err => {
      if (err) throw err
      console.log(`Now running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
