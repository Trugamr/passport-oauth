const express = require('express')
const router = express.Router()

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If not logged in, redirect
    res.redirect('/auth/login')
  } else {
    next()
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('profile', { user: req.user })
})

module.exports = router
