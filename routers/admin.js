const express = require('express')
const Controller = require('../controllers/controller')
const admin = express.Router()


admin.use((req, res, next) => {
    // console.log(req.session, "SESSION ISADMIN INDEX ROUTERS")
    if(req.session.userId && req.session.role !== "admin"){
        const errorMsg = "Access denied, Only admin can acess the page"
        res.redirect(`/login?err=${errorMsg}`) //ini mau ke login apa gimana?
    } else {
        next()
    }
  })
admin.get('/', Controller.showAdminPage)
admin.get('/course', Controller.showAdminCourse)
admin.get('/course/add', Controller.addAdminCourse)
admin.post('/course/add', Controller.addAdminCourse)
admin.get('/course/:courseId/edit', Controller.editAdminCourse)
admin.post('/course/:courseId/edit', Controller.editAdminCourse)
admin.get('/course/delete', Controller.deleteAdminCourse)




module.exports = admin