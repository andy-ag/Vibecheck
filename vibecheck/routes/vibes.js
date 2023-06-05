//Todo routing for vibes
const express = require('express')
const router = express.Router()
const vibesCtrl = require('../controllers/vibes')
const vibes = require('../controllers/vibes')
const isLoggedIn = require('../helpers/flow').isLoggedIn

// index
router.get('/', vibesCtrl.index)

// new
router.get('/new', isLoggedIn, vibesCtrl.new)

// edit
router.get('/:id/edit', vibesCtrl.edit)

// show
router.get('/:id', vibesCtrl.show)

// create
router.post('/', vibesCtrl.create)

// remove
router.delete('/:id', vibesCtrl.remove)

// update
router.put('/:id', vibesCtrl.update)

// like
router.put('/:id/like', vibesCtrl.like)

// unlike 
router.put('/:id/unlike', vibesCtrl.unlike)



module.exports = router

