import express from 'express'
import { User } from '../db'
import google from './google'
import next from 'next'

const router = express.Router()

router.get('/me', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    res.json(user)
  } catch (error) {
    console.error(error)
  }
})

router.use('/google', google)

export default router
