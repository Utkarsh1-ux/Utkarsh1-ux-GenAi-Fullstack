const {Router} = require('express')
const authController = require("../controllers/auth.controller.js")
const {authUser} = require("../middleware/auth.middleware.js")
const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @desc login a user with email and password
 * @access Public
 */
authRouter.post("/login" , authController.LoginUserController)

/**
 * @route GET /api/auth/logout 
 * @desc clear token from user cookie and add token in the blacklist
 * @access Public
 */
authRouter.get("/logout" , authController.LogoutUserController)

     
/**
 * @route GET /api/auth/get-me
 * @desc get the details of the logged in user
 * @access Private
 */

authRouter.get("/get-me" , authUser , authController.getMeController)


 module.exports = authRouter 