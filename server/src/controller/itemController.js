import statusCodes from 'http-status-codes';

import {generateRandomEndTime} from "./auctionController.js";



let itemId = 3; // Start item ID

export let items = [
    { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', genre: 'Rock', release_year: 2002, id: 1, bids: [], endTime: 1000000, finished: false },
    { title: 'Nevermind', artist: 'Nirvana', genre: 'Rock', release_year: 1991, id: 2, bids: [], endTime: 1000000, finished: false },
    { title: 'Blonde', artist: 'Frank Ocean', genre: 'R&B', release_year: 2016, id: 3, bids: [], endTime: 1000000, finished: false }
];

// ITEMS API
export const getItems = (req, res) => {
    try {
        return res.status(statusCodes.OK).json(items);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve items' });
    }
};
export const getItemById = (req, res) => {
    const { id } = req.params;
    const item = items.find(item => item.id == id);
    if (item) {
        return res.status(statusCodes.OK).json(item);
    } else {
        return res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
}
export const addItem = (req, res) => {

    try {
        const newItem = req.body;
        if (!newItem.title || !newItem.artist || !newItem.genre || !newItem.release_year) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
        }
        itemId++;
        newItem.id = itemId;
        newItem.bids = [];
        newItem.endTime = generateRandomEndTime();
        newItem.finished = false;
        items.push(newItem);
        return res.status(statusCodes.CREATED).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add item' });
    }
};

export const editItem = (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const itemIndex = items.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
        return res.status(statusCodes.OK).json({ message: 'Item updated successfully', item: items[itemIndex] });
    } else {
        return res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
};
export const deleteItem = (req, res) => {
    const { id } = req.params;
    const initialLength = items.length;
    items = items.filter(item => item.id != id);

    if (items.length < initialLength) {
        return res.status(statusCodes.OK).json({ message: 'Item deleted successfully' });
    } else {
        return res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
};

// BIDS API
export const getBids = (req, res) => {
    const { id } = req.params;
    const item = items.find(item => item.id == id);
    if (item) {
        return res.status(statusCodes.OK).json(item.bids);
    } else {
        return res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
};
export const addBid = (req, res) => {
    const { id } = req.params;
    const newBid = req.body;
    const highestBid = req.body.highestBid;
    console.log(highestBid);
    // Bid validation
    if (!newBid.amount || newBid.amount <= req.body.highestBid) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: 'Bid must be higher than the current highest bid!' });
    }

    const item = items.find(item => item.id == id);

    if (item) {
        item.bids.push(newBid);
        return res.status(statusCodes.CREATED).json(newBid);
    } else {
        return res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
};