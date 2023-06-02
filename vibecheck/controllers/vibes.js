//! Manages control flow for vibe-related actions
//Todo write controllers
//Todo export titles
const User = require('../models/user')
const Vibe = require('../models/vibe')

async function index (req, res) {
    try {
        const vibes = await Vibe.find({})
        res.render('vibes/index', { title: 'Latest vibes', vibes: vibes })
    } catch (error) {
        // think of best choice here to avoid infinite loop
        // homepage should direct to /vibes/ 
        console.log(error)
        res.redirect('/')
    }
}

async function show (req, res) {
    try {
        const vibe = await Vibe.findById(req.params.id)
        res.render('vibes/show', { title: 'Vibe details', vibe: vibe })
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

function newVibe (req, res) {
    res.render('vibes/new', { title: 'Create new vibe', id: 1234 })
}

async function create (req, res) {
    // Todo save vibe created on vibes/new page
    try {
        console.log('USER ID -->', req.user._id)
        req.body.user = req.user._id;
        const vibe = await Vibe.create(req.body)
        res.redirect(`/vibes/${vibe._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/vibes/new', { error })
    }
    
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