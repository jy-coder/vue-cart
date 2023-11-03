import express from 'express'
import asyncHandler from '../utils/asyncHandler'
import AuthController from '../controller/auth/authController'

const authRoute = express.Router()

const authController = new AuthController()

authRoute.post('/login', asyncHandler(authController.login))

authRoute.post('/register', asyncHandler(authController.register))

export default authRoute
