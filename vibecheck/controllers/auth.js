//! Manages control flow for authentication-related actions
//Todo write controllers
//Todo export titles

function login (req, res) {
    res.render('auth/login', { title: 'Login', id: 1234 })
}



module.exports = {
    login
}