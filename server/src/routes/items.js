import express from 'express';

import * as middleware from "../middleware/middleware.js";

import * as itemController from '../controller/items/itemController.js';
import * as itemServices from '../controller/items/itemServices.js';

const router = express.Router();

//items
router.get('/', itemController.getItems);
router.post('/', middleware.requireAdmin, itemController.addItem);
router.put('/:id', middleware.requireAdmin, itemController.editItem);
router.delete('/:id', middleware.requireAdmin, itemController.deleteItem);

//bids
router.get('/:id/bids', itemServices.getBids);
router.post('/:id/bids', middleware.isLoggedIn, itemServices.addBid);
export default router;