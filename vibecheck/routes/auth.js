const express = require('express')
const router = express.Router()
const passport = require('passport')
const authCtrl = require('../controllers/auth')

//TODO move functions to controller for crispness

// login page
router.get('/auth', authCtrl.login)

// Google OAuth callback route
//Todo manage redirection to appropriate route, depending on how
//Todo auth page was reached. Use req.session info provided by
//Todo express-session
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect: '/vibes',
      //Todo add 'authentication failed' formatting
      failureRedirect: '/auth/login'
    }
  ))

//TODO Add ability to select username
// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email'],
    }))
  
// OAuth logout route
router.get('/logout', function(req, res){
    req.logout(function() {
      res.redirect('/vibes')
    })
  })

module.exports = router