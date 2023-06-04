//Todo routing for users
const express = require('express')
const router = express.Router()
const usersCtrl = require('../controllers/users')

// own boards
router.get('/:id', usersCtrl.vibes)

router.get('/:id/settings', usersCtrl.settings)

router.delete('/:id', usersCtrl.deleteAccount)

module.exports = router