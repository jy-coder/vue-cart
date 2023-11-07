import express from 'express'

import asyncHandler from '../../utils/asyncHandler'
import UserController from '../controller/userController'

const userRoute = express.Router()

const userController = new UserController()

userRoute.get('/', asyncHandler(userController.userByEmail))

userRoute.get('/:id', asyncHandler(userController.userById))

userRoute.post('/', asyncHandler(userController.createUser))

export default userRoute
