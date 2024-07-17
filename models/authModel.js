const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')

   // Creating Schema
   const authSchema = new schema ({

    email:{
        type:String,
        required: [true,'Email is required']
    },

    
    password:{
        type:String,
        required: [true,'password is required']
    }


});
authSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()
        }catch(error) {
            next(error)
    }
});

//comparing the entered passwd and the one saved in the DB

authSchema.methods.isValidPassword = async function (password){
    try{
        return await bcrypt.compare(password, this.password)
        }catch(error){
            throw error
        }
    }


const User = mongoose.model('Auth',authSchema); //create a model that is going to represent our collection in the DB.
    module.exports = User; //here we are exporting this file so that we can use it in other files.

   