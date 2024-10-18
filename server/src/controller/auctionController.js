import {getUserByUsername, updateUser} from "./authUserController.js";
import {items} from "./itemController.js";
export function generateRandomEndTime() {
    const now = new Date().getTime();
    const minDuration = 60 * 60 * 1000; // 1 hour
    const maxDuration = 48 * 60 * 60 * 1000; // 48 hours
    let randomDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
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

// Set interval to check auctions every 10 seconds
setInterval(checkAuctions, 10000);