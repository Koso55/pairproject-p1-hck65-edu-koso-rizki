const { User, Course, CourseDetail, UserProfile } = require("../models/index.js")



class Controller {
    //BASE
    static async showLandingPage(req, res) {
        try {
            res.render("landingPage")
        } catch (error) {
            res.send(error)
        }
    }
    static async loginForm(req, res) {
        try {
            res.render("loginForm")
        } catch (error) {
            res.send(error)
        }
    }
    static async loginFormPost(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    static async registerForm(req, res) {
        try {
            let errorMsg = req.query.err
            if (errorMsg) {
                errorMsg = errorMsg.split(",")
            } else {
                errorMsg = []
            }

            res.render("registerForm", { errorMsg })
        } catch (error) {
            res.send(error)
        }
    }
    static async registerPost(req, res) {
        try {
            const data = req.body
            await User.registerPost(data)
            res.redirect("/login")
        } catch (error) {
            if (error.type === "passwordMismatch") {
                res.redirect(`/register?err=${error.message}`)
            } else {
                res.send(error)
            }
        }
    }


    //ADMIN
    static async showAdminPage(req, res) {
        try {
            res.render("ShowAdminPage")
        } catch (error) {
            res.send(error)
        }
    }
    static async showAdminCourse(req, res) {
        try {
            let data = await Course.findAll()
            //res.send(data)
            // res.send("wkwkkw")
            res.render("ShowAdminCourse", { data })
        } catch (error) {
            res.send(error)
        }
    }
    static async addAdminCourse(req, res) {
        try {
            let data = await Course.findAll()
            res.render("addAdminCourse", { data })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async addPostAdminCourse(req, res) {
        try {
            const { name, description } = req.body
            console.log(req.body);
            let data = await Course.create({
                name,
                description
            })
            res.redirect('/admin/course')
        } catch (error) {
            //console.log(error);
            res.send(error.message)
        }

    }
    static async editAdminCourse(req, res) {
        try {
            const { id } = req.params
            let data = await Course.findByPk(id)
            //res.send("data")
            res.render("editAdminCourse", { data })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async editPostAdminCourse(req, res) {
        try {
            const { id } = req.params
            const { name, description } = req.body
            let data = await Course.update({
                name: name,
                description: description
            },
                {
                    where: {
                        id: id
                    },
                }
            )
            res.redirect('/admin/course')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async deleteAdminCourse(req, res) {
        try {
            const { id } = req.params
            let data = await Course.destroy({
                where: {
                    id: id
                }
            })
            res.redirect('/admin/course')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }





    static async showDetailCourse(req, res) {
        try {
            const { courseId } = req.params
            let data = await Course.findByPk(
                courseId, {
                include: {
                    model: CourseDetail
                }
            }
            )
            //res.send(data)
            res.render("showCourseDetail", { data: data })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async addDetailCourse(req, res) {
        try {
            const { courseId } = req.params
            let data = await Course.findByPk(courseId)
            res.render("addCourseDetail", { data: data })
            //res.send(data)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addPostDetailCourse(req, res) {
        try {
            //res.send("data")
            const { courseId } = req.params
            const { name, linkCourse } = req.body
            let data = await CourseDetail.create({
                name, linkCourse, CourseId: courseId
            })
            console.log(data);
            res.redirect(`/admin/course/${courseId}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }


    static async deleteDetailCourse(req, res) {
        try {
            const { courseId, courseDetailId } = req.params
            console.log(courseId)
            let data = await CourseDetail.destroy({
                where: {
                    id: courseDetailId
                }
            })
            //console.log(data);
            res.redirect(`/admin/course/${courseId}`)
            //res.send("CourseDetail")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    //static async 



    //USER
    static async redirToUserCourse(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

}


module.exports = Controller