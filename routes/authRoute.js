const express = require('express');
const routes = express.Router();
const authController = require('../Controller/authController');
const { authaaSchema } = require('../helpers/validationSchema');


//add user to the db

// routes.post('/Auth', (req,res)=> {
    // res.send({type:'Post Request Done'});
//});
  
  
// routes.post('/addAuth',authController.addAuth)

  routes.post('/registerUser', authController.registerUser)

  routes.post('/login', authController.login)

module.exports = routes;