import express from 'express'
import authMiddleware from '../middlewares/auth'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/users'

const router = express.Router()

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:userId', authMiddleware, getUserById)
router.put('/:userId', authMiddleware, updateUser)
router.delete('/:userId', authMiddleware, deleteUser)

export default router
