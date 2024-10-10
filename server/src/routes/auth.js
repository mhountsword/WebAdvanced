import express from 'express';
import * as authController from '../controller/authUserController.js'
const router = express.Router();

router.post("/register", authController.registerNewUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

export default router;