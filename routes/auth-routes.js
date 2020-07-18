const express = require('express')

const router = express.Router()

// Auth login
router.get('/login', (req, res) => {
  res.render('login')
})

// Auth with google
router.get('/google', (req, res) => {
  res.json({
    method: 'google'
  })
})

// Auth logout
router.get('/logout', (req, res) => {
  res.json({
    logout: 'handle with passport'
  })
})

module.exports = router
