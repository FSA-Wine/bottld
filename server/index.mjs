import express from 'express'
import next from 'next'
import dotenv from 'dotenv'
import morgan from 'morgan'
import session from 'express-session'
import passport from 'passport'
import neo4j from 'node-neo4j'

dotenv.config()
//Might need to change bolt??
export const db = new neo4j('bolt://localhost:7687')
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
