const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

passport.use(
  new GoogleStrategy({
    // Options for google auth
  }),
  () => {
    // Passport callback function
  }
)
