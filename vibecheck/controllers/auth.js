//! Manages control flow for authentication-related actions
//Todo write controllers
//Todo export titles
const passport = require('passport')

function loginPage (req, res) {
    res.render('auth/login', { title: 'Login'})
}

function callback(req, res, next) {
    passport.authenticate(
        'google',
        {
          successRedirect: req.session.originalUrl || '/vibes',
          failureRedirect: '/auth/login',
        }
    )(req, res, next)
}

function login(req, res, next) {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
      })(req, res, next)
}

function logout(req, res) {
    req.logout(() => {
        res.redirect('/vibes')
      })
}

module.exports = {
    loginPage,
    callback,
    login,
    logout
}