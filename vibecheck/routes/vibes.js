//Todo routing for vibes
const express = require('express')
const router = express.Router()
const vibesCtrl = require('../controllers/vibes')
const vibes = require('../controllers/vibes')

// index
router.get('/', vibesCtrl.index)

// new
router.get('/new', vibesCtrl.new)

// show
router.get('/:id/vibes', vibesCtrl.show)

// create
router.post('/', vibesCtrl.create)

// remove


// update



module.exports = router

