//! Helper functions for information flow
const User = require('../models/user')

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/auth')
}

function isLoggedInHome(req, res, next) {
    if (!req.isAuthenticated()) return next()
    res.redirect('/vibes')
}

async function hasUsername(req, res, next) {
    req.session.originalUrl = req.originalUrl
    const user = await User.findById(res.locals.user._id)
    if (user.hasUsername === true) return next()
    res.redirect('/auth/username')
}

module.exports = {
    isLoggedIn,
    hasUsername,
    isLoggedInHome
}