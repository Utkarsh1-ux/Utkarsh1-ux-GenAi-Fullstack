const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model.js")

async function authUser(req , res , next){

    let token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message : "Unauthorized access"
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({
            message : "Unauthorized access"
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