import express from 'express'
import { createUser, loginUser } from '../Controller/Create.js'
import { JwtAuthMiddleware } from '../Middleware/JwtAuth.js'
import { getProfile } from '../Controller/Read.js'
import { updateProfile } from '../Controller/Update.js'

const UserRoutes = express.Router()


UserRoutes.post('/signup', createUser)
UserRoutes.post('/login', loginUser)
UserRoutes.get('/profile', JwtAuthMiddleware, getProfile)
UserRoutes.put('/profile/password', JwtAuthMiddleware, updateProfile)



export default UserRoutes