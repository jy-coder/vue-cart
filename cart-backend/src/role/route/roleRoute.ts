import express from 'express'
import asyncHandler from '../../utils/asyncHandler'
import RoleController from '../controller/roleController'

const roleRoute = express.Router()

const roleController = new RoleController()

roleRoute.put('/', asyncHandler(roleController.updateRole))
roleRoute.post('/', asyncHandler(roleController.createRole))
roleRoute.get('/user/:userId', asyncHandler(roleController.getRole))

export default roleRoute
