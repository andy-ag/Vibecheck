// Todo routes for login / signup
const express = require('express')
const router = express.Router()
const passport = require('passport')
const authCtrl = require('../controllers/auth')

// login page
router.get('/', authCtrl.login)

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect: '/movies',
      failureRedirect: '/movies'
    }
  ))
    
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email'],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  ))
  
// OAuth logout route
router.get('/logout', function(req, res){
    req.logout(function() {
      res.redirect('/movies')
    })
  })

module.exports = router