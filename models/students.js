const mongoose = require('mongoose');
const Schema =mongoose.Schema;



const studentsSchema =new Schema({
    firstname:{
        type : String,
        required:[true,'Firstname is required']
    },
    lastname:{
        type :String,
        required : [true,'Lastname is required']
    },
    gender:{
        type :String
    }
    
});

 const Student = mongoose.model('student', studentsSchema); //=> Create a model that is going to represent our collection in the DB.
 module.exports = Student; //=> here we are exporting this file so that we can use it in other files.//