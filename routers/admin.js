const express = require('express')
const Controller = require('../controllers/controller')
const admin = express.Router()


admin.use((req, res, next) => {
    // console.log(req.session, "SESSION ISADMIN INDEX ROUTERS")
    if (req.session.userId && req.session.role !== "admin") {
        const errorMsg = "Access denied, Only admin can acess the page"
        res.redirect(`/login?err=${errorMsg}`) //ini mau ke login apa gimana?
    } else {
        next()
    }
})

admin.get('/', Controller.showAdminPage) //vv
admin.get('/course', Controller.showAdminCourse) //vv
admin.get('/course/add', Controller.addAdminCourse) //vv
admin.post('/course/add', Controller.addPostAdminCourse) //vv
admin.get('/course/:id/edit', Controller.editAdminCourse) //vv
admin.post('/course/:id/edit', Controller.editPostAdminCourse) //vv
admin.get('/course/:id/delete', Controller.deleteAdminCourse) //vv
admin.get('/course/:courseId', Controller.showDetailCourse) //vv
admin.get('/course/:courseId/detail/add', Controller.addDetailCourse) //vv
admin.post('/course/:courseId/detail/add', Controller.addPostDetailCourse) //vv
admin.get('/course/:courseId/detail/:courseDetailId/delete', Controller.deleteDetailCourse) //vv





module.exports = admin