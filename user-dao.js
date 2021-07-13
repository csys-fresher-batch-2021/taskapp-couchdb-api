const axios = require('axios');

class UserDAO {
    

    getAllUsers(req, res) {

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/_all_docs?include_docs=true';
        console.log(url);
        axios.get(url, { headers: headers }).then(result => {
            let data = result.data;
            console.log(data);
            let rows = data.rows.filter(obj => !obj.id.includes("_design")).map(obj => obj.doc);
            res.json(rows);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.response);
            res.json(res.response);
        });
    }

    findOne(req, res) {

        let userId = req.params.id;
        console.log(userId);

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/' + userId;
        console.log(url);
        axios.get(url, { headers: headers }).then(result => {
            let data = result.data;
            console.log(data);
            let rows = data;
            res.json(rows);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.response);
            res.json(res.response);
        });
    }

    save(req, res) {

        let user = req.body;
        console.log(user);

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users';
        console.log(url);
        axios.post(url,user, { headers: headers }).then(result => {
            let data = result.data;            
            res.json(data);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.response);
            res.json(res.response);
        });
    }

    delete(req,res){
        let userId = req.params.id;
        let revId = req.query.rev;

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/'+ userId + "?rev=" + revId;
        console.log(url);
        axios.delete(url, { headers: headers }).then(result => {
            let data = result.data;            
            res.json(data);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.response);
            res.json(res.response);
        });
    }
}
exports.UserDAO = UserDAO;
