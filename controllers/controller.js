const { User, Course, CourseDetail, UserProfile } = require("../models/index.js")
var bcrypt = require('bcryptjs');


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
            let errorMsg = req.query.err
            if (errorMsg) {
                errorMsg = errorMsg.split(",")
            } else {
                errorMsg = []
            }
            res.render("loginForm", { errorMsg })
        } catch (error) {
            res.send(error)
        }
    }
    static async loginFormPost(req, res) {
        try {
            let data = req.body
            let findUser = await User.loginFormPost(data)
            console.log("findUser", "CONTROLLER")
            if (findUser.validator === true) {
                if (findUser.findUser.role === "user") {
                    return res.redirect(`/user/${findUser.findUser.id}/course`)
                } else if (findUser.findUser.role === "admin") {
                    console.log("MASUK VALID ADMIN", "CONTROLLEaaaaaR")
                    return res.redirect(`/admin`)
                } else {
                    console.log("MASUK ERROR", "CONTROLLER")
                    throw {
                        type: "failedLogin",
                        message: "role is not found"
                    }
                }
            } else {
                throw {
                    type: "failedLogin",
                    message: "Invalid username or password"
                }
            }
        } catch (error) {
            let errorMsgSeq = []
            if (error?.type === "failedLogin") {
                res.redirect(`/login?err=${error.message}`)
            } else if (error?.name === "SequelizeValidationError") {
                errorMsgSeq = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/login?err=${errorMsgSeq}`)
            } else {
                res.send(error)
            }
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
            const { userName, password, confirmPassword, email, parentName, benefactor, phone, idCardNumber } = data
            if (userName === "" || password === "" || confirmPassword === "" || email === "" || parentName === "" || phone === "" || idCardNumber === "") {
                throw {
                    type: "fieldError",
                    message: "all fields except benefactor must be filled"
                }
            }
            let newUser = await User.registerPost(data)
            // console.log("BAWAH NEW USER")
            let userId = await User.findUserbyId(newUser)
            // console.log("BAWAHSEARCH")
            let userProfile = await UserProfile.registerPost(data, +userId)
            // console.log("Bawah USER PROFILE")
            res.redirect("/login")
        } catch (error) {
            let errorMsgSeq = []
            if (error?.type === "passwordMismatch") {
                res.redirect(`/register?err=${error.message}`)
            } else if (error?.type === "fieldError") {
                // console.log("nahhhhh")   
                res.redirect(`/register?err=${error.message}`)
            } else if (error?.name === "SequelizeValidationError") {
                errorMsgSeq = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/register?err=${errorMsgSeq}`)
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
            res.send(error)
        }
    }
    static async editAdminCourse(req, res) {
        try {
            const { name, description } = req.body
            let data = await Course.create({
                name,
                description
            })
            res.redirect('/course')
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteAdminCourse(req, res) {
        try {

        } catch (error) {

        }
    }







    //USER
    static async redirToUserCourse(req, res) {
        try {
            res.send("PAGE NOT FOUND, REDIR TO USER COURSE")
        } catch (error) {
            res.send(error)
        }
    }

}


module.exports = Controller