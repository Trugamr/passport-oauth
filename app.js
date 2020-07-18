// Setting environment variables
require('dotenv').config()

// Passport setup
require('./config/passport-setup')

const express = require('express')
const authRoutes = require('./routes/auth-routes')

const app = express()
const port = process.env.PORT || 3000

// View engine setup
app.set('view engine', 'ejs')

// Routes setup
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
