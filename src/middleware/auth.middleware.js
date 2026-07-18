const jwt = require("jsonwebtoken")
const tokenBlacklist = require("../models/tokenBlacklist.model.js")

async function authUser(req , res , next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized access"
        })
    }

    const isTokenBlacklisted = await tokenBlacklist.findOne({token : token})

    if(isTokenBlacklisted){
        return res.status(401).json({
            message : "Token is invalid"
        })
    }
try{
   const decoded =  jwt.verify(token , process.env.JWT_SECRET)

   req.user = decoded

   next()


} catch(err){
    return res.status(401).json({
        message : "invalid token"
    })
}
}

module.exports = {authUser}