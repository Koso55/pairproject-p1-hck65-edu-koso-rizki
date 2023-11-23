const express = require('express')
const Controller = require('../controllers/controller')
const user = express.Router()

user.get('/', Controller.redirToUserCourse)
user.get('/:id/course', Controller.showCoursePageUser)
user.get('/:id/profile', Controller.showUserProfile)
user.post('/:id/course/:courseId/enroll', Controller.enrollCourseUser)
user.get('/:id/course/mycourse', Controller.showMyCourse)
user.get('/:id/course/mycourse/:courseId', Controller.showCourseDetailUser)
user.get('/:id/course/mycourse/:courseId/viewer', Controller.seeViewer)


module.exports = user