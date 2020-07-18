// Setting environment variables
require('dotenv').config()

// Passport setup
require('./config/passport-setup')

const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth-routes')

const app = express()
const port = process.env.PORT || 3000
const { MONGO_DB_URI, MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env

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
