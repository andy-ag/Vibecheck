const express = require('express')
const router = express.Router()
const usersCtrl = require('../controllers/users')
const { isLoggedInHome } = require('../helpers/flow')

router.get('/', isLoggedInHome, function(req, res, next) {
  res.render('index')
})

router.get('/settings', usersCtrl.settings)

module.exports = router