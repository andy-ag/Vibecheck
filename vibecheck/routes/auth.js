const express = require('express')
const router = express.Router()
// const passport = require('passport')
const authCtrl = require('../controllers/auth')


router.get('/auth', authCtrl.loginPage)

router.get('/auth/username', authCtrl.usernameSelection)

router.get('/oauth2callback', authCtrl.callback)

router.get('/auth/google', authCtrl.login)

router.get('/logout', authCtrl.logout)

router.post('/auth/username', authCtrl.setUsername)

module.exports = router
