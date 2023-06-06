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
        const vibes = await Vibe.find({user: user._id}).sort({createdAt: -1})
        res.render('users/vibes', {vibes: vibes, vUser: user })
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

async function deleteAccount(req, res) {
    try {
        const user = await User.findById(res.locals.user._id)
        const likedVibes = await Vibe.find({likedBy: res.locals.user._id})
        for (let i=0; i<likedVibes.length; i++) {
            likedVibes[i].likedBy.pull(res.locals.user._id)
            await likedVibes[i].save()
        }
        await Vibe.deleteMany({user: res.locals.user._id})
        await user.deleteOne() 
        req.method = 'GET'
        res.redirect('/vibes')
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

async function liked (req, res) {
    try {
        const user = await User.findById(req.params.id)
        const vibes = await Vibe.find({likedBy: user._id}).populate('user').sort({createdAt: -1})
        res.render('users/liked', {vibes: vibes, vUser: user})
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${res.locals.user._id}`)
    }
}

module.exports = {
    settings,
    vibes,
    deleteAccount,
    liked
}