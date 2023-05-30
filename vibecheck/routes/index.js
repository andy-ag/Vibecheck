const express = require('express')
const router = express.Router()
const usersCtrl = require('../controllers/users')

router.get('/', function(req, res, next) {
  //Todo add dynamic user-id with req.user
  res.render('index', { title: 'Vibecheck', id: 1234 })
})

router.get('/settings', usersCtrl.settings)

module.exports = router
