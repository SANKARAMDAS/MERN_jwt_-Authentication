import express from "express";
import {authUser, updateUserProfile, getUserProfile, registerUser, logoutUser} from "../controller/userController.js";
const router = express.Router();
import { protect} from "../middleware/authMiddleware.js";

router.post('/auth', authUser);
router.post('/', registerUser);
    router.post('/logout', logoutUser);
    router.route('/profile').put(protect, updateUserProfile).get(protect, getUserProfile);

export default router;