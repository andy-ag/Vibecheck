//! Helped functions for information flow

// For routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    //Todo match path
    res.redirect('/auth/google')
}

module.exports = {
    isLoggedIn,
}