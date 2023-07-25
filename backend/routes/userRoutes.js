import { Router } from "express";
import { authUser,getAllUsers, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleWare/authMiddleware.js";

const router = Router();


router.post('/auth', authUser)
router.post('/', registerUser)
router.get('/', getAllUsers)
router.post('/logout', logoutUser)
router.get('/profile',verifyToken, getUserProfile)
router.put('/profile', verifyToken,updateUserProfile)

export default router;