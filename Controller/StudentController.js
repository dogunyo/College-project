const { default: mongoose } = require("mongoose");
const Student = require("../Models/students");
const createError = require("http-errors");

module.exports = {
    addStudent:async(req, res, next)=>{
        // console.log (req.body);
        // res.send(req.body)
        try {
          const student = new Student(req.body)
          const result = await student.save();
          res.send(result)
    
        }catch (error) {
          console.log(error.message);
          if(error.name ==="validationError"){
            next(createError(422, error.message))
            return;
          }
          next(error)
        }
      },
      
      getAllStudents: async(req, res,next)=>{
        Student.find({}).then((student)=>{
          res.send(student);
        });
      },
      
      updateStudent:async(req,res,next)=>{
        try{
          const id = req.params.id;
          const update = req.body;
          const options ={new: true}
          const result = await Student.findByIdAndUpdate(id, update,options)

          res.send(result);
        }catch(error){
          console.log(error.message)
           if(error instanceof mongoose.CastError){
            return next(createError(400, "Invalid student id"));
           }
          // next(error)
        }
      },
      deleteStudent:async(req,res,next)=> {
        try{
            const id = req.params.id;
            const update= req.body;
            const options ={new: true}
            const result = await Student.findByIdAndDelete(id,update,options)
             res.send(result);
        }catch(error){

            console.log(error.message);
        }
    },
    getStudent: async(req,res,next)=>{
      const id =req.params.id;
      try{
        const student = await Student.findById(id)
        if(!student){
          throw(createError(404,"student does not exist"))
        }
        res.send(student)
      }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
          next(createError(400, "Inavalid student id"));
          return;
        }
        next(error);
      }
    }

}