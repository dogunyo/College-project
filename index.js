require('dotenv').config();
require('./Helpers/init_mongodb');
const express = require('express');
const studentRoute = require('./routes/studentRoute');

const authRoute = require('./routes/authRoute');

const cors = require('cors');

const app = express ();

app.use(cors({
    credentials: true, //Alow credentials
    origin: [
        'http://localhost:3000',
        'http://localhost:4000'
    ]
}))

app.use(express.json());

app.use(studentRoute);

app.use(authRoute);



app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests on: http://localhost:4000');

});

//Handling 404 error
app.use((req, res, next)=>{
    const err = new Error("Not Found");
    err.status = 404
    next(err)
})
 //Error handler 
 app.use((err,req,res ,next)=>{
    res.status(err.status|| 500)
    res.send({
        error:{
            Status:err.Status || 500,
            message: err.message
        }
    })
 })