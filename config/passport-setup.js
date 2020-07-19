const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user-model')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

passport.serializeUser((user, done) => {
  // Error, data
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  // Finding user from id
  User.findById(userId)
    .then(user => {
      done(null, user)
    })
    .catch(error => {
      console.log(error)
    })
})

passport.use(
  new GoogleStrategy(
    {
      // Options for google auth
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // Passport callback function
      const { id, displayName } = profile

      User.findOne({ googleId: id }).then(currentUser => {
        if (currentUser) {
          // User already Exits
          console.log('USER ALREADY EXITS', currentUser)
          done(null, currentUser)
        } else {
          // Creating user in db
          const user = new User({
            username: displayName,
            googleId: id
          })

          user
            .save()
            .then(user => {
              console.log('SAVED NEW USER', user)
              done(null, user)
            })
            .catch(error => {
              console.log('FAILED TO SAVE USER', error)
            })
        }
      })
    }
  )
)
