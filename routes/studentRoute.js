const express = require('express');
const StudentController = require('../Controller/StudentController')
const {verifyAccessToken} = require('../helpers/jwtHelpers')

const routes = express.Router();

//get a list of students from the database
routes.get('/getAllStudents',StudentController.getAllStudents);

routes.post('/addstudents',StudentController.addStudent);

routes.patch('/updateStudent/:id',StudentController.updateStudent);

routes.delete('/deleteStudent/:id',StudentController.deleteStudent);

routes.get('/getStudent/:id',StudentController.getStudent);

routes.get('/getAllStudents', verifyAccessToken,StudentController.getAllStudents);


module.exports = routes;