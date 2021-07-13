const axios = require('axios');

const { UserDAO } = require("./user-dao");
const userDAO = new UserDAO();
class UserController {    

    getAllUsers(req, res) {

        
        userDAO.getAllUsers().then(result => {
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
        userDAO.findOne(userId).then(result => {
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
       userDAO.save(user).then(result => {
            let data = result;            
            res.json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.json({errorMessage: err.message});
        });
    }

    delete(req,res){
        let userId = req.params.id;
        userDAO.delete(userId).then(result => {
            let data = result;            
            res.json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.json({errorMessage: err.message});
        });
    }
}
exports.UserController = UserController;
