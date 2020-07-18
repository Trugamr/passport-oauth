const express = require('express')
const passport = require('passport')

const router = express.Router()

// Auth login
router.get('/login', (req, res) => {
  res.render('login')
})

// Auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
)

// Auth logout
router.get('/logout', (req, res) => {
  res.json({
    logout: 'handle with passport'
  })
})

// Callback route for google to redirect to
router.get('/google/callback', (req, res) => {
  res.json({
    ...req.query
  })
})

module.exports = router
