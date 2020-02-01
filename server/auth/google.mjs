import passport from 'passport'
import Google from 'passport-google-oauth'
import dotenv from 'dotenv'
import express from 'express'

import { User } from '../db/index.mjs'

dotenv.config()
const router = express.Router()
const GoogleStrategy = Google.OAuth2Strategy

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  }

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id
    const email = profile.emails[0].value
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName

    User.findOrCreate({
      where: { googleId },
      defaults: { email, firstName, lastName },
    })
      .then(([user]) => done(null, user))
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }))

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  )
}

export default router
