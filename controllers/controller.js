
class Controller {
    //BASE
    static async showLandingPage(req, res) {
        try {
            res.render("landingPage")
        } catch (error) {
            res.send(error)
        }
    }
    static async loginForm(req,res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async loginFormPost(req,res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async registerForm(req,res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async registerPost(req,res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    //ADMIN
    static async showAdminPage(req,res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    //USER
    static async redirToUserCourse(req,res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

}


module.exports = Controller