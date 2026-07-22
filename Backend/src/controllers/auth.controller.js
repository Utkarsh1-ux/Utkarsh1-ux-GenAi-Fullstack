const userModel = require("../models/user.model.js")
const bcrypt  = require("bcryptjs")
const jwt = require ( "jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model.js")
/**
 * @route POST /api/auth/register
 * @desc Register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req , res){
    const {username , email , password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message : "Please provide username, email and password"
        })
}

   const isUserAlreadyExists = await userModel.findOne({
    $or : [{ username} , { email }]
   })

   if(isUserAlreadyExists){
    return res.status(400).json({
        message : "User already exists with the provided username or email"
    })
   }

   const hash = await bcrypt.hash(password , 10)    
   const user = await  userModel.create({
    username,
    email,
    password : hash
   })

   const token = jwt.sign(
    {
        id : user._id , 
        username : user.username
    },
    process.env.JWT_SECRET,
    {expiresIn : "1d"}
   )

   res.cookie("token", token, {
       httpOnly: true,
       secure: true,
       sameSite: "none"
   })


   res. status(201).json({
     message : "User registered succesfully",
     user : {
        id : user._id,
        username : user.username,
        email : user.email
     }
   })
   
}


/**
 * @name LoginUserController
 * @description Login a user , expects email and password onj the request.body
 * @access Public
 */
async function LoginUserController(req ,res) {
    const {email , password } = req.body
    const user = await userModel.findOne({email })

    if(!user){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
         return res.status(400).json({
            message : "Invalid email or password"
    })  
}
   const token = jwt.sign(
    {
        id : user._id , 
        username : user.username
    },
    process.env.JWT_SECRET,
    {expiresIn : "1d"}
   )

   res.cookie("token", token, {
       httpOnly: true,
       secure: true,
       sameSite: "none"
   })
   res.status(200).json({
    message : "User logged in succefully.",
    user:{
         id:user._id,
         username : user.username,
         email:user.email,
    }
   })

}


async function LogoutUserController(req ,res) {
    const token  = req.cookies.token

    if(token){
      await tokenBlacklistModel.create({token}) 
    }
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    res.status(200).json({
        message : "User logged out succesfully"
    })
}

async function getMeController(req , res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
       message : "User details fetched succesfully",
   user: {
        id : user._id,
        username : user.username,
        email : user.email
    
    }
    })
}
module.exports = {registerUserController,   
      LoginUserController,
      LogoutUserController,
        getMeController,
    }