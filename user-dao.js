const axios = require('axios');



class UserDAO {
    

    async getAllUsers() {

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/_all_docs?include_docs=true';
        console.log(url);
        try{
            
            let result = await axios.get(url, { headers: headers });
            let rows = result.data.rows.filter(obj => !obj.id.includes("_design")).map(obj => obj.doc);
            return rows;        
        }
        catch(err){
            this.handleErrorMessage(err);
        };
    }

    async searchByRole(role){


        let selector = {
            "selector": {
                "role": role                
            }
        };

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/_find';
        console.log(url);
        try{
            
            let result = await axios.post(url,selector, { headers: headers });
            let rows = result.data.docs;
            return rows;        
        }
        catch(err){
            this.handleErrorMessage(err);
        };

    }

    async findOne(userId) {

       
        console.log(userId);

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/' + userId;
        console.log(url);

        try{
            let result = await axios.get(url, { headers: headers });
            return result.data;
        }
        catch(err){
            
            this.handleErrorMessage(err);
        }

    }

    handleErrorMessage(err){
        console.error(err.response.data);
        let errorMessage = err.response.data.error;
        console.log("errorMessage:" + errorMessage);
        if (errorMessage == 'not_found'){
            throw new Error("Id not found")
        }
        else{
            throw new Error(errorMessage);
        }
    }

    async save(user) {

        console.log(user);

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users';
        console.log(url);
        try{
            let result = await axios.post(url,user, { headers: headers });
            return result.data;

        }
        catch(err) {            
            this.handleErrorMessage(err);         
        };
    }

    async delete(user){


        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/'+ user._id + "?rev=" + user._rev;
        console.log(url);
        try{
        let result = await axios.delete(url, { headers: headers });
        return result.data;

        }catch(err ){
            this.handleErrorMessage(err);
        }
    }

    async update(user){

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/'+ user._id + "?rev=" + user._rev;
        console.log(url);
        try{
        let result = await axios.put(url, actualRecord, { headers: headers });
        return result.data;

        }catch(err ){
            this.handleErrorMessage(err);
        }
    }

    /*
    async changePassword(userId, password){

        let user = await this.findOne(userId);        
        let revId = user._rev;

        //update password
        user.password = password;

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/'+ userId + "?rev=" + revId;
        console.log(url);
        try{
        let result = await axios.put(url, user, { headers: headers });
        return result.data;

        }catch(err ){
            this.handleErrorMessage(err);
        }
    }*/
}
exports.UserDAO = UserDAO;
