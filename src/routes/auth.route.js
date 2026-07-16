const {Router} = require('express')
const authController = require("../controllers/auth.controller.js")

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


 module.exports = authRouter 