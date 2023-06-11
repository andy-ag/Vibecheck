const express = require('express')
const router = express.Router()
const vibesCtrl = require('../controllers/vibes')
const { hasUsername, isLoggedIn } = require('../helpers/flow')

router.get('/', vibesCtrl.index)

router.get('/new', isLoggedIn, hasUsername, vibesCtrl.new)

router.get('/:id/edit', vibesCtrl.edit)

router.get('/:id/clone', hasUsername, vibesCtrl.clone)

router.get('/:id', vibesCtrl.show)

router.post('/', vibesCtrl.create)

router.delete('/:id', vibesCtrl.remove)

router.put('/:id', vibesCtrl.update)

router.put('/:id/like', hasUsername, vibesCtrl.like)

module.exports = router