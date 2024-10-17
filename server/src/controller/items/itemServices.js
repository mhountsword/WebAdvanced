import statusCodes from 'http-status-codes';
import * as itemController from './itemController.js'

export const getItems = (req, res) => {
    try {
        const items = itemController.getItems();
        return res.status(statusCodes.OK).json(items);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve items' });
    }
};

export const addItem = (req, res) => {
    try {
        const newItem = itemController.addItem(req.body);
        return res.status(statusCodes.CREATED).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

export const editItem = (req, res) => {
    const { id } = req.params;
    try {
        const updatedItem = itemController.editItem(id, req.body);
        return res.status(statusCodes.OK).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        return res.status(statusCodes.NOT_FOUND).json({ message: error.message });
    }
};

export const deleteItem = (req, res) => {
    const { id } = req.params;
    try {
        itemController.deleteItem(id);
        return res.status(statusCodes.OK).json({ message: 'Item deleted successfully' });
    } catch (error) {
        return res.status(statusCodes.NOT_FOUND).json({ message: error.message });
    }
};

export const getBids = (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        console.log("OK");
        const bids = getBidsForItem(id);
        return res.status(statusCodes.OK).json(bids);
    } catch (error) {
        return res.status(statusCodes.NOT_FOUND).json({ message: error.message });
    }
};

export const addBid = (req, res) => {
    const { id } = req.params;
    try {
        // Assuming you have a way to get the highest bid (e.g., from req.body or another service)
        const highestBid = req.body.highestBid;
        const newBid = addBidToItem(id, req.body, highestBid);
        return res.status(statusCodes.CREATED).json(newBid);
    } catch (error) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

export const getBidsForItem = (itemId) => {
    const items = getItems();
    console.log(items);
    const item = items.find(item => item.id === itemId);
    if (item) {
        return item.bids;
    } else {
        throw new Error('Item not found');
    }
};

export const addBidToItem = (itemId, newBid, highestBid) => {
    if (!newBid.amount || newBid.amount <= highestBid) {
        throw new Error('Bid must be higher than the current highest bid!');
    }

    const items = getItems();
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.bids.push(newBid);
        return newBid;
    } else {
        throw new Error('Item not found');
    }
};