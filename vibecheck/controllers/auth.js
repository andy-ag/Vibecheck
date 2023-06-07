//! Manages control flow for authentication-related actions
const passport = require('passport')
const User = require('../models/user')

function loginPage (req, res) {
    res.render('auth/login', { title: 'Login'})
}

function callback(req, res, next) {
    passport.authenticate(
        'google',
        {
          successRedirect: req.session.ref || '/vibes',
          failureRedirect: '/auth/login',
        }
    )(req, res, next)
}

function login(req, res, next) {
    const referer = req.headers.referer
    req.session.ref = referer
    passport.authenticate('google', {
        scope: ['profile', 'email'],
      })(req, res, next)
}

function logout(req, res) {
    req.logout(() => {
        res.redirect('/vibes')
      })
}

function usernameSelection(req, res) {
    res.render('auth/username', {message: ''})
}

async function setUsername(req, res) {
    console.log(req.body.username)
    const user = await User.findById(res.locals.user._id)
    const checkTaken = await User.find({username: req.body.username})
    if (checkTaken.length === 0) {
        user.username = req.body.username
        user.hasUsername = true
        user.save()
        res.render('users/settings', {message: 'Username updated'})
    } else {
        res.render('auth/username', {message: 'This username is already taken'})
    }
    
}

module.exports = {
    loginPage,
    callback,
    login,
    logout,
    usernameSelection,
    setUsername
}