const express = require('express')
const router = express.Router()
// const passport = require('passport')
const authCtrl = require('../controllers/auth')


router.get('/auth', authCtrl.loginPage)

router.get('/oauth2callback', authCtrl.callback)

router.get('/auth/google', authCtrl.login)

router.get('/logout', authCtrl.logout)

module.exports = router

// //? Graveyard while testing new implementation
// // Google OAuth callback route
// router.get('/oauth2callback', passport.authenticate(
//     'google',
//     {
//       successRedirect: '/vibes',
//       failureRedirect: '/auth/login'
//     }
//   ))

// // Google OAuth login route
// router.get('/auth/google', passport.authenticate('google', {
//       scope: ['profile', 'email'],
//     }))
  
// // OAuth logout route
// router.get('/logout', function(req, res){
//     req.logout(function() {
//       res.redirect('/vibes')
//     })
//   })
