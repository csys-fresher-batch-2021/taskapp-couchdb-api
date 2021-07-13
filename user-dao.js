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
}
exports.UserDAO = UserDAO;
