const express = require('express')
const Controller = require('../controllers/controller')
const admin = express.Router()



admin.get('/', Controller.showAdminPage)
// admin.get('/course', Controller.showAdminCourse)
// admin.get('/course/add', Controller.addAdminCourse)
// admin.post('/course/add', Controller.addAdminCourse)
// admin.get('/course/:courseId/edit', Controller.editAdminCourse)
// admin.post('/course/:courseId/edit', Controller.editAdminCourse)
// admin.get('/course/delete', Controller.deleteAdminCourse)




module.exports = admin