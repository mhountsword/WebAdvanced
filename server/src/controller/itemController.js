import statusCodes from 'http-status-codes';
import { getUserByUsername, updateUser } from './authUserController.js'; // Import functions from your user controller

let itemId = 3; // Start item ID
let items = [
    { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', genre: 'Rock', release_year: 2002, id: 1, bids: [], endTime: 1000000, finished: false },
    { title: 'Nevermind', artist: 'Nirvana', genre: 'Rock', release_year: 1991, id: 2, bids: [], endTime: 1000000, finished: false },
    { title: 'Blonde', artist: 'Frank Ocean', genre: 'R&B', release_year: 2016, id: 3, bids: [], endTime: 1000000, finished: false }
];

// Helper function to generate random auction end time
function generateRandomEndTime() {
    const now = new Date().getTime();
    const minDuration = 60 * 60 * 1000; // 1 hour
    const maxDuration = 48 * 60 * 60 * 1000; // 48 hours
    const randomDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
    return new Date(now + randomDuration);
}

// Periodically check if auctions have ended
const checkAuctions = () => {
    const now = new Date().getTime();

    items.forEach(item => {
        if (now >= item.endTime && !item.finished) {
            handleAuctionEnd(item); // Auction has ended
        }
    });
};

// Function to handle the auction end process
const handleAuctionEnd = async (item) => {
    item.finished = true; // Prevent processing more than once

    // Get the highest bid
    const highestBid = item.bids.reduce((max, bid) => bid.amount > max.amount ? bid : max, { amount: 0 });

    if (highestBid.username) {
        try {
            const winner = await getUserByUsername(highestBid.username); // Fetch the user
            if (winner) {
                winner.won_auctions.push(item.id); // Add the item ID to their won auctions
                await updateUser(winner.username, { won_auctions: winner.won_auctions });
                console.log(`${winner.username} won auction for ${item.title}`);
            }
        } catch (error) {
            console.error('Error updating user after auction:', error);
        }
    } else {
        console.log(`No bids for auction ${item.title}`);
    }

    resetAuction(item);
};

const resetAuction = (item) => {
    item.bids = []; // Clear the bids
    item.endTime = generateRandomEndTime(); // Generate a new random end time
    item.finished = false; // Mark the auction as not finished
    console.log(`Auction for ${item.title} has been reset! New end time is ${item.endTime}`);
};

// Set interval to check auctions every minute
setInterval(checkAuctions, 60 * 1000);

// ITEMS API
export const getItems = (req, res) => {
    try {
        return res.status(statusCodes.OK).json(items);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve items' });
    }
};

export const addItem = (req, res) => {
    try {
        const newItem = req.body;

        // Validation
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
