import express from 'express';

import {requireAdmin} from "../middleware/middleware.js";
import * as itemController from '../controller/itemController.js';

const router = express.Router();


router.get('/', itemController.getItems);
router.post('/', requireAdmin, itemController.addItem);
export default router;