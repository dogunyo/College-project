const JWT = require('jsonwebtoken');
const createError = require('http-errors');



const User = require('../models/authModel');


module.exports = {
    //giving token to the user
    signAccessToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '10m',
                issuer: 'DogunyoTechCoder.com',
                audience: UserId,
            };
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

//middleware to verify access token
verifyAccessToken: (req, res, next)=>{
    if(!req.helpers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearertoken = authHeader.split(' ');
    const token = bearertoken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
       if(err){
        return next(createError.Unauthorized());
       }
       req.payload = payload;
       next()
    })
},

verifyRefreshToken: (refreshToken)=> {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return reject(createError.Unauthorized());
            }
            const userId = payload.aud; // Corrected `payId` to `payload`
            resolve(userId);
        });
    });

}
};
