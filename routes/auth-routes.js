const express = require('express')
const passport = require('passport')

const router = express.Router()

// Auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
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
  req.logout()
  res.redirect('/')
})

// Callback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile')
})

module.exports = router
