const axios = require('axios');

const { UserService } = require("./user-service");
const userService = new UserService();
class UserController {    

    getAllUsers(req, res) {

        
        userService.getAllUsers().then(result => {
            let users = result;
            console.log(users);
            res.json(users);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.json({ erorMessage:  err.message });
        });
    }

    findOne(req, res) {

        let userId = req.params.id;
        console.log(userId);
        userService.findOne(userId).then(result => {
            let user = result;
            console.log(user);            
            res.json(user);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.json({errorMessage: err.message});
        });
    }

    save(req, res) {

        let user = req.body;
        userService.save(user).then(result => {
            let data = result;            
            res.json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.json({errorMessage: err.message});
        });
    }

    changePassword(req, res) {

        let userId = req.params.id;
        let { password} = req.body;

        userService.changePassword(userId, password).then(result => {
            let data = result;            
            res.json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.json({errorMessage: err.message});
        });
    }

    updateUserDetails(req, res) {

        let userId = req.params.id;
        let user = req.body;        
        user._id = userId;

        userService.update(user).then(result => {
            let data = result;            
            res.json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.json({errorMessage: err.message});
        });
    }

    delete(req,res){
        let userId = req.params.id;
        userService.delete(userId).then(result => {
            let data = result;            
            res.json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.json({errorMessage: err.message});
        });
    }
}
exports.UserController = UserController;
