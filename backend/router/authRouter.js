const express = require ("express")
const passport = require ("passport")

// const {  loginUsers } = require ('../controller/loginUsers')

//router
const router = express.Router()

//get login users
router.get('/google', passport.authenticate('google'), (req, res) => res.send(200))
router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.send(200))


module.exports = router