//Todo routing for vibes
const express = require('express')
const router = express.Router()
const vibesCtrl = require('../controllers/vibes')
const vibes = require('../controllers/vibes')
const { hasUsername, isLoggedIn } = require('../helpers/flow')

// index
router.get('/', vibesCtrl.index)

// new
router.get('/new', isLoggedIn, hasUsername, vibesCtrl.new)

// edit
router.get('/:id/edit', vibesCtrl.edit)

// clone
router.get('/:id/clone', hasUsername, vibesCtrl.clone)

// show
router.get('/:id', vibesCtrl.show)

// create
router.post('/', vibesCtrl.create)

// remove
router.delete('/:id', vibesCtrl.remove)

// update
router.put('/:id', vibesCtrl.update)

// like
router.put('/:id/like', hasUsername, vibesCtrl.like)




module.exports = router

