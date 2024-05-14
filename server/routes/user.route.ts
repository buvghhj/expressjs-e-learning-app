import express from 'express'
import { activateUser, deleteUser, getAllUsers, getUserInfor, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updateAvatar, updateUserInfor, updateUserPassword, updateUserRole } from '../controllers/user.controller'
import { authorizeRoles, isAuthenticated } from '../middlewares/auth'

const userRouter = express.Router()

userRouter.post('/registration', registrationUser)

userRouter.post('/activate-user', activateUser)

userRouter.post('/login-user', loginUser)

userRouter.get('/logout-user', updateAccessToken, isAuthenticated, logoutUser)

userRouter.get('/refresh-token', updateAccessToken)

userRouter.get('/me', updateAccessToken, isAuthenticated, getUserInfor)

userRouter.post('/social-auth', socialAuth)

userRouter.put('/update-user-infor', updateAccessToken, isAuthenticated, updateUserInfor)

userRouter.put('/update-user-password', updateAccessToken, isAuthenticated, updateUserPassword)

userRouter.put('/update-user-avatar', updateAccessToken, isAuthenticated, updateAvatar)

userRouter.get('/get-users', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getAllUsers)

userRouter.put('/update-user', updateAccessToken, isAuthenticated, authorizeRoles('admin'), updateUserRole)

userRouter.delete('/delete-user/:id', updateAccessToken, isAuthenticated, authorizeRoles('admin'), deleteUser)

export default userRouter