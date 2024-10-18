import express from 'express';

import * as middleware from "../middleware/middleware.js";

import * as itemController from '../controller/itemController.js';

const router = express.Router();

//items
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.post('/', middleware.requireAdmin, itemController.addItem);
router.put('/:id', middleware.requireAdmin, itemController.editItem);
router.delete('/:id', middleware.requireAdmin, itemController.deleteItem);

//bids
router.get('/:id/bids', itemController.getBids);
router.post('/:id/bids', middleware.isLoggedIn, itemController.addBid);
export default router;