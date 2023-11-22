const express = require('express')
const Controller = require('../controllers/controller')
const user = express.Router()



user.get('/', Controller.redirToUserCourse)

module.exports = user