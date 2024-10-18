import express from 'express';
import * as authController from '../controller/authUserController.js'
import * as middleware from "../middleware/middleware.js";
const router = express.Router();

router.post("/register", authController.registerNewUser);
router.post("/login", authController.loginUser);
router.post("/logout", middleware.isLoggedIn, authController.logoutUser);

//get won auctions
router.get('/:username/won-auctions', middleware.isLoggedIn, authController.getWonAuctions);

export default router;