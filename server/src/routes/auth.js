import express from 'express';
import * as authController from '../controller/authUserController.js'
const router = express.Router();

router.post("/", async (req, res) => {
    // TODO check the credentials and return an appropriate response
    // For testing purposes a dummy token is returned.
    res.json({
        "token": "dummyt0k3nv4lu3!"
    })
});

router.post("/register", authController.registerNewUser);
router.post("/login", authController.loginUser);
export default router;