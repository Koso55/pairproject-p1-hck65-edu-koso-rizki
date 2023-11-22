const express = require('express')
const Controller = require('../controllers/controller')
const admin = require('./admin')
const user = require('./user')
const router = express.Router()



router.get('/', Controller.showLandingPage)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginFormPost)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.registerPost)
router.use('/admin', admin)
router.use('/user', user)



module.exports = router