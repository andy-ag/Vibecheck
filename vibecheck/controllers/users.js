//! Manages control flow for user-related actions
//Todo write controllers
//Todo export titles

function settings (req, res) {
    res.render('users/settings', { title: 'Settings', id: 1234})
}

function vibes (req, res) {
    res.render('users/vibes', { title: 'User\'s Vibes', id: 1234})
}

module.exports = {
    settings,
    vibes,
}