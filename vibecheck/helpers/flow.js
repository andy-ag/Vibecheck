//! Helper functions for information flow
const User = require('../models/user')

function isLoggedIn(req, res, next) {
    req.session.originalUrl = req.originalUrl
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
}

async function hasUsername(req, res, next) {
    req.session.originalUrl = req.originalUrl
    const user = await User.findById(res.locals.user._id)
    if (user.hasUsername === true) return next()
    res.redirect('/auth/username')
}

module.exports = {
    isLoggedIn,
    hasUsername
}