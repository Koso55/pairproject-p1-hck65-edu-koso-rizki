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

        } catch (error) {
            res.send(error)
        }
    }

    //USER
    static async redirToUserCourse(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

}


module.exports = Controller