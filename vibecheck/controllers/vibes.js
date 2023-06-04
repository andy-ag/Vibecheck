//! Manages control flow for vibe-related actions
//Todo write controllers
//Todo export titles
const user = require('../models/user')
const User = require('../models/user')
const Vibe = require('../models/vibe')

async function index (req, res) {
    try {
        const vibes = await Vibe.find({}).sort({updatedAt: -1}).populate('user')
        res.render('vibes/index', {vibes: vibes })
    } catch (error) {
        // think of best choice here to avoid infinite loop
        // homepage should direct to /vibes/ 
        console.log(error)
        res.redirect('/')
    }
}

async function show (req, res) {
    try {
        const vibe = await Vibe.findById(req.params.id).populate('user')
        res.render('vibes/show', {vibe: vibe, user: res.locals.user})
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

function newVibe (req, res) {
    res.render('vibes/new', { title: 'Create new vibe'})
}

async function create (req, res) {
    // Todo save vibe created on vibes/new page
    try {
        req.body.user = req.user._id;
        const user = await User.findById(req.user._id)
        const vibe = await Vibe.create(req.body)
        user.ownVibes.unshift(vibe._id)
        await user.save()
        res.redirect(`/vibes/${vibe._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/vibes/new', { error })
    }
    
}

async function remove (req, res) {
    try {
        const vibe = await Vibe.findById(req.params.id)
        const user = await User.findById(vibe.user._id)
        if (vibe.user._id.toString() !== res.locals.user._id.toString()) {
            req.method = 'GET'
            return res.redirect('/vibes')
        }
        await user.ownVibes.pull(vibe._id)
        await user.save()
        await vibe.deleteOne()
        req.method = 'GET'
        res.redirect(`/users/${res.locals.user._id}`)
    } catch (error) {
        console.log(error)
        res.redirect(`/vibes/${res.locals.user._id}`)
    }
}

async function update (req, res) {
    try {
        const vibe = await Vibe.findById(req.params.id)
        vibe.name = req.body.name
        vibe.items = req.body.items
        await vibe.save()
        req.method = 'GET'
        res.redirect(`/users/${vibe.user._id}`)
    } catch (error) {
        console.log(error)
        res.redirect(`/vibes`)
    }
}

async function edit (req, res) {
    try {
        const vibe = await Vibe.findById(req.params.id).populate('user')
        if (vibe.user._id.toString() !== res.locals.user._id.toString()) return res.redirect('/vibes')
        res.render('vibes/edit', {vibe: vibe})
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

module.exports = {
    index,
    show,
    new: newVibe,
    create,
    remove,
    update,
    edit
}