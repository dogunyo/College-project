const Joi = require('joi');

const authaaSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
})

module.exports ={
    authaaSchema
}