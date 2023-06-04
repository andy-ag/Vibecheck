//! Manages control flow for user-related actions
//Todo write controllers
//Todo export titles
const User = require('../models/user')
const Vibe = require('../models/vibe')

function settings(req, res) {
    res.render('users/settings', { title: 'Settings'})
}

async function vibes(req, res) {
    try {
        const user = await User.findById(req.params.id)
        const vibes = await Vibe.find({user: user._id}).sort({updatedAt: -1})
        res.render('users/vibes', { title: `${user.name}'s Vibes`, vibeuser: user, vibes: vibes })
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

async function deleteAccount(req, res) {
    try {
        const user = await User.findById(res.locals.user._id)
        await Vibe.deleteMany({user: res.locals.user._id})
        await user.deleteOne() 
        req.method = 'GET'
        res.redirect('/vibes')
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

module.exports = {
    settings,
    vibes,
    deleteAccount
}