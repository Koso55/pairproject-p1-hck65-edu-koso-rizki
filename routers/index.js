const express = require('express')
const Controller = require('../controllers/controller')
const admin = require('./admin')
const user = require('./user')
const router = express.Router()



router.get('/', Controller.showLandingPage)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.registerPost)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginFormPost)


router.use((req, res, next) => {
    // console.log(req.session, "SESSION IS LOGGED IN INDEX ROUTERS")
    if(!req.session.userId){
        const errorMsg = "Please login first!"
        res.redirect(`/login?err=${errorMsg}`)
    } else {
        next()
    }
})
router.get('/logout', Controller.getLogout)


router.use('/user', user)

router.use('/admin', admin)




module.exports = router