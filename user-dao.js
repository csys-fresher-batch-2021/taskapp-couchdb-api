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
            console.error(err.response);
            throw new Error(err.response);
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
            console.error(err.response.data);
            throw new Error(err.response.data);
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
            console.log(err.response.data);         
            throw new Error(err.message.data);
         
        };
    }

    async delete(userId){

        let user = await this.findOne(userId);        
        let revId = user._rev;

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/'+ userId + "?rev=" + revId;
        console.log(url);
        try{
        let result = await axios.delete(url, { headers: headers });
        return result.data;

        }catch(err ){
            console.log(err.response.data);
            console.error("Error", err.response);
            throw new Error(err.response.data);
        }
    }

    async update(user){

        let actualRecord = await this.findOne(user._id);        
        let revId = actualRecord._rev;

        //update - name,email,password
        actualRecord.name = user.name;
        actualRecord.email = user.email;
        actualRecord.password = user.password;

        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        const headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
        console.log(headers);

        const url = process.env.DB_URL + '/users/'+ user._id + "?rev=" + revId;
        console.log(url);
        try{
        let result = await axios.put(url, actualRecord, { headers: headers });
        return result.data;

        }catch(err ){
            console.log(err.response.data);
            console.error("Error", err.response);
            throw new Error(err.response.data);
        }
    }

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
            console.log(err.response.data);
            console.error("Error", err.response);
            throw new Error(err.response.data);
        }
    }
}
exports.UserDAO = UserDAO;
