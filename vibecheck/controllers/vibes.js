//! Manages control flow for vibe-related actions
const user = require('../models/user')
const User = require('../models/user')
const Vibe = require('../models/vibe')

async function index (req, res) {
    try {
        const vibes = await Vibe.find({}).sort({createdAt: -1}).populate('user')
        res.render('vibes/index', {vibes: vibes })
    } catch (error) {
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
        const referer = req.headers.referer
        const vibe = await Vibe.findById(req.params.id)
        const vibeid = vibe._id.toString()
        const user = await User.findById(vibe.user._id)
        const likedBy = await User.find({likedVibes: vibe._id})
        if (vibe.user._id.toString() !== res.locals.user._id.toString()) {
            req.method = 'GET'
            return res.redirect(referer)
        }
        await user.ownVibes.pull(vibe._id)
        await user.save()
        // for (let i=0; i<likedBy.length; i++) {
        //     likedBy[i].likedVibes.pull(vibe._id)
        //     await likedBy[i].save()
        // }
        for (let i=0; i<likedBy.length; i++) {
            await User.findOneAndUpdate(
              { _id: likedBy[i]._id },
              { $pull: { likedVibes: vibe._id } }
            )
          }
        await vibe.deleteOne()
        req.method = 'GET'
        // Can't refer back to the vibe page since it has been deleted
        if (referer.includes(vibeid)) {
            res.redirect('/vibes')
        } else {
            res.redirect(referer)
        }
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

async function update (req, res) {
    try {
        const redirectUrl = req.session.ref
        const vibe = await Vibe.findById(req.params.id)
        vibe.name = req.body.name
        vibe.items = req.body.items
        await vibe.save()
        req.method = 'GET'
        res.redirect(redirectUrl)
    } catch (error) {
        console.log(error)
        res.redirect(`/vibes`)
    }
}

async function like (req, res) {
    try {
        const referer = req.headers.referer
        const vibe = await Vibe.findById(req.params.id)
        const user = await User.findById(res.locals.user._id)
        const indexOfUser = vibe.likedBy.indexOf(user._id)
        const indexOfVibe = user.likedVibes.indexOf(vibe._id)
        if (indexOfUser === -1) {
            vibe.likedBy.unshift(user._id)
            await vibe.save()
            user.likedVibes.unshift(vibe._id)
            await user.save() 
            req.method = 'GET'
            return res.redirect(referer)
        } else {
            vibe.likedBy.splice(indexOfUser, 1)
            vibe.save()
            user.likedVibes.splice(indexOfVibe, 1)
            user.save()
            req.method = 'GET'
            return res.redirect(referer)
            }
        }
    catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

async function edit (req, res) {
    try {
        const referer = req.headers.referer
        req.session.ref = referer
        const vibe = await Vibe.findById(req.params.id).populate('user')
        if (vibe.user._id.toString() !== res.locals.user._id.toString()) return res.redirect('/vibes')
        res.render('vibes/edit', {vibe: vibe})
    } catch (error) {
        console.log(error)
        res.redirect('/vibes')
    }
}

async function clone (req, res) {
    try {
        const vibe = await Vibe.findById(req.params.id).populate('user')
        res.render('vibes/clone', {vibe: vibe})
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
    edit,
    like,
    clone
}