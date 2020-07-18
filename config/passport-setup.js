const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

passport.use(
  new GoogleStrategy(
    {
      // Options for google auth
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    () => {
      // Passport callback function
    }
  )
)
