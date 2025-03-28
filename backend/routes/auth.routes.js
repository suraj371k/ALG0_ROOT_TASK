import express from 'express'
import { deleteAccount, loginUser, registerUser } from '../controller/auth.controller.js'
const router = express.Router()

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.delete('/delete' , deleteAccount)

export default router;