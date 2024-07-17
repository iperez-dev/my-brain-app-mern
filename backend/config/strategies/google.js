const passport = require ("passport")
const { Strategy } = require ("passport-google-oauth20")

// Environment variables
if( process.env.NODE_ENV != "production" ){
    require("dotenv").config()
}

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    scope: ['email', 'profile'],
}, 
async () => {

} ))