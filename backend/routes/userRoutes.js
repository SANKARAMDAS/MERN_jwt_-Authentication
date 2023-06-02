import express from "express";
import {authUser, updateUserProfile, getUserProfile, registerUser, logoutUser} from "../controller/userController.js";
const router = express.Router();

router.post('/auth', authUser);
router.post('/', registerUser);
    router.post('/logout', logoutUser);
    router.route('/profile').put(updateUserProfile).get(getUserProfile);

export default router;