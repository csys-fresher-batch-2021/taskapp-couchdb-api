const express = require('express')
const cors = require('cors');

const dotenv = require('dotenv');
const { UserController } = require("./user-controller");
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());
const port = 3000

const userController = new UserController();
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/search', userController.searchByRole);
app.get('/api/v1/users/:id', userController.findOne);
app.post('/api/v1/users', userController.save);
app.put('/api/v1/users/:id', userController.updateUserDetails);
app.patch('/api/v1/users/:id', userController.changePassword);
app.delete('/api/v1/users/:id', userController.delete);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))