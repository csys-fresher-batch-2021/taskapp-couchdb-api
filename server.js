const express = require('express')
const cors = require('cors');

const dotenv = require('dotenv');
const { UserDAO } = require("./user-dao");
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());
const port = 3000

const userDAO = new UserDAO();
app.get('/api/v1/users', userDAO.getAllUsers);
app.get('/api/v1/users/:id', userDAO.findOne);
app.post('/api/v1/users', userDAO.save);
app.delete('/api/v1/users/:id', userDAO.delete);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))