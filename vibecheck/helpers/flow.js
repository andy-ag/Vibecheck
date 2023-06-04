//! Helper functions for information flow

function isLoggedIn(req, res, next) {
    req.session.originalUrl = req.originalUrl
    if (req.isAuthenticated()) return next()
    //Todo match path
    res.redirect('/auth/google')
}

module.exports = {
    isLoggedIn
}