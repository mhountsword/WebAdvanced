import express from 'express';
import * as authController from '../controller/users/authUserController.js'
import * as middleware from "../middleware/middleware.js";
const router = express.Router();

router.post("/register", authController.registerNewUser);
router.post("/login", authController.loginUser);
router.post("/logout", middleware.isLoggedIn, authController.logoutUser);

export default router;