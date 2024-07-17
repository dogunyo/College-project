const User = require('../models/authModel');
const createError = require('http-errors')
const {authaaSchema} = require('../helpers/validationSchema')
const {signAccessToken}= require('../helpers/jwtHelpers')

module.exports = {
    registerUser:async(req,res,next)=>{
        try {
    
          const {email,password}=req.body
          if(!email || !password)throw createError.BadRequest
          
    
            const result = await authaaSchema.validateAsync(req.body)
    
            const Exist = await User.findOne({email:email})
    
          if(Exist) throw createError.Conflict(`${email} is already been registered`)
                const user = new User(result)
            
    //accessTokencode
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser.id)
    
        
        res.send({accessToken});
    }catch (error){
       if(error.isJoi === true)error.status = 422
       next(error)     
    }
    },

    login: async (req, res, next) => {
      try {
        const result = await authaaSchema.validateAsync(req.body);
        const user = await User.findOne({ email: result.email });
        if (!user) {
          throw createError.NotFound('User not registered');
        }
        
        // Additional logic for password validation or authentication if needed
  
        res.send(result); // Send response upon successful login
      } catch (error) {
        if (error.isJoi === true) {
          return next(createError.BadRequest('Invalid username/password'));
        }
        next(error); // Pass the error to the error handling middleware
      }
    }

    }

    

    