const express = require('express')
const Controller = require('../controllers/controller')
const admin = express.Router()



admin.get('/', Controller.showAdminPage)
// admin.get('/course', Controller.showAdminCourse)
admin.get('/course', Controller.showAdminCourse)
admin.get('/course/add', Controller.addAdminCourse)
admin.post('/course/add', Controller.addPostAdminCourse)
admin.get('/course/:id/edit', Controller.editAdminCourse)
admin.post('/course/:id/edit', Controller.editPostAdminCourse)
admin.get('/course/:id/delete', Controller.deleteAdminCourse)

admin.get('/course/:courseId', Controller.showDetailCourse)
admin.get('/course/:courseId/detail/add', Controller.addDetailCourse)
admin.post('/course/:courseId/detail/add', Controller.addPostDetailCourse)


admin.get('/course/:courseId/detail/:courseDetailId/delete', Controller.deleteDetailCourse)




module.exports = admin   