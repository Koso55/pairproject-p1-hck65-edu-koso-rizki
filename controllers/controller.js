const course = require("../models/course.js");
const { User, Course, UserHasCourse, CourseDetail, UserProfile } = require("../models/index.js")
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
            let sesStat = req.session
            let findUser = await User.loginFormPost(data, sesStat)
            // console.log(findUser.findUser.role, "CONTROLLER")
            // console.log(sesStat, "CONTROLLER")

            if (findUser.validator === true) {
                if (findUser.findUser.role === "user") {
                    return res.redirect(`/user/${findUser.findUser.id}/course`)
                } else if (findUser.findUser.role === "admin") {
                    // console.log("MASUK VALID ADMIN", "CONTROLLEaaaaaR")
                    return res.redirect(`/admin`)
                } else {
                    // console.log("MASUK ERROR", "CONTROLLER")
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
            let gender = ["male", "female"]
            res.render("registerForm", { errorMsg, gender })
        } catch (error) {
            res.send(error)
        }
    }
    static async registerPost(req, res) {
        try {
            const data = req.body
            // console.log(data, "REQ BODY CONTROLLER")
            const { userName, password, confirmPassword, email, parentName, benefactor, phone, idCardNumber, age, gender } = data
            if (userName === "" || password === "" || confirmPassword === "" || email === "" || parentName === "" || phone === "" || idCardNumber === "" || age === "" || gender === "") {
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
                // console.log(error)
                res.send(error)
            }
        }
    }
    static getLogout(req, res) {//PENTING
        try {
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect("/")
                }
            })
        } catch (error) {
            res.send(error)
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
            // console.log(req.session.userId)
            res.redirect(`user/${req.session.userId}/course`)
            // res.send("PAGE NOT FOUND, REDIR TO USER COURSE")
        } catch (error) {
            res.send(error)
        }
    }
    static async showCoursePageUser(req, res) {
        try {
            let userId = req.session.userId
            let instance = await Course.showCoursePageUser()
            let userHasCourses = await User.findUserHasCourse(userId, UserHasCourse, Course)
            res.render("coursePageUser", { userId, instance, userHasCourses })
        } catch (error) {
            res.send(error)
        }
    }
    static async enrollCourseUser(req, res) {
        try {
            const { id, courseId } = req.params
            // console.log(id, courseId)
            await UserHasCourse.enrollCourseUser(courseId, id)
            res.redirect("/user")
        } catch (error) {
            res.send(error)
        }
    }
    static async showMyCourse(req, res) {
        try {
            let userId = req.session.userId
            let instance = await Course.showCoursePageUser()
            let myCourses = await User.findUserHasCourse(userId, UserHasCourse, Course)
            res.render("myCourse", { userId, instance, myCourses })
        } catch (error) {
            res.send(error)
        }
    }





    static async showUserProfile(req, res) {
        try {
            let userId = req.session.userId
            let findUserCourse = await User.findUserHasCourse(userId, UserHasCourse, Course)
            let findUserProfiles = await User.findUserProfile(userId, UserProfile)
            // console.log(findUserProfiles.UserProfile.age)
            res.render("userProfile", { userId, findUserCourse, findUserProfiles })
        } catch (error) {
            res.send(error)
        }
    }
}


module.exports = Controller