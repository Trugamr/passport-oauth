// Setting environment variables
require('dotenv').config()

// Passport setup
require('./config/passport-setup')

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile.routes')

const app = express()
const port = process.env.PORT || 3000
const {
  MONGO_DB_URI,
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  COOKIE_SESSION_KEY
} = process.env

// Connecting to MongoDB
mongoose
  .connect(MONGO_DB_URI, {
    user: MONGO_DB_USERNAME,
    pass: MONGO_DB_PASSWORD,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(conn => {
    console.log('MongoDB connection success.')
  })
  .catch(error => {
    console.log(error)
  })

// Cookies config
app.use(
  cookieSession({
    maxAge: 86400000,
    keys: [COOKIE_SESSION_KEY]
  })
)

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// View engine setup
app.set('view engine', 'ejs')

// Routes setup
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
