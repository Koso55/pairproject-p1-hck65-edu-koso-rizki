const express = require('express')
const Controller = require('../controllers/controller')
const admin = express.Router()



admin.get('/', Controller.showAdminPage)

module.exports = admin