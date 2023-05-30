//! Manages control flow for vibe-related actions
//Todo write controllers
//Todo export titles

function index (req, res) {
    res.render('vibes/index', { title: 'Latest vibes', id: 1234 })
}

function show (req, res) {
    res.render('vibes/show', { title: 'Vibe details', id: 1234 })
}

function newVibe (req, res) {
    res.render('vibes/new', { title: 'Create new vibe', id: 1234 })
}

function create (req, res) {
    // Todo save vibe created on vibes/new page
    res.redirect('users/:id/vibes')
}

function remove (req, res) {
    // Todo delete vibe from vibes/:id or users/:id/vibes
    res.redirect('users/:id/vibes')
}

function update (req, res) {
    // Todo update vibe from show::edit
    res.redirect('vibes/:id', {title: 'Vibe details'})
}


module.exports = {
    index,
    show,
    new: newVibe,
    create,
    remove,
    update
}