import express from 'express'
import next from 'next'
import dotenv from 'dotenv'
import morgan from 'morgan'
import session from 'express-session'
import sessionstore from 'sessionstore'
import passport from 'passport'
import neo4j from 'neo4j-driver'

import router from './api'
import auth from './auth/index.mjs'

dotenv.config()
export const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'bottld'))
const PORT = process.env.PORT
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

passport.serializeUser((user, done) => done(null, user.identity.low))
passport.deserializeUser(async (id, done) => {
  const neoSession = driver.session()
  try {
    const cypher = `MATCH (n:User) WHERE ID(n) = ${id} RETURN n`
    const { records } = await neoSession.run(cypher)
    done(null, records[0]._fields[0])
  } catch (err) {
    done(err)
  } finally {
    await neoSession.close()
  }
})

nextApp
  .prepare()
  .then(() => {
    const app = express()
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(
      session({
        store: sessionstore.createSessionStore(),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
      })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    // API Routes
    app.use('/auth', auth)
    app.use('/api', router)

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
