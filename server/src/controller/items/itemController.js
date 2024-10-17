import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

let items = [
    { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', genre: 'Rock', release_year: 2002, id: uuidv4(), bids: [], endTime: 1000000, finished: false },
    { title: 'Nevermind', artist: 'Nirvana', genre: 'Rock', release_year: 1991, id: uuidv4(), bids: [], endTime: 1000000, finished: false },
    { title: 'Blonde', artist: 'Frank Ocean', genre: 'R&B', release_year: 2016, id: uuidv4(), bids: [], endTime: 1000000, finished: false }
];

export const getItems = () => {
    return items;
};

export const getItemById = (id) => {
    return items.find(item => item.id === id);
};

export const addItem = (newItem) => {
    // Validation
    if (!newItem.title || !newItem.artist || !newItem.genre || !newItem.release_year) {
        throw new Error('Missing required fields');
    }

    newItem.id = uuidv4();
    newItem.bids = [];
    newItem.endTime = generateRandomEndTime();
    newItem.finished = false;
    items.push(newItem);
    return newItem;
};

export const editItem = (id, updatedItem) => {
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
        return items[itemIndex];
    } else {
        throw new Error('Item not found');
    }
};

export const deleteItem = (id) => {
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);

    if (items.length < initialLength) {
        return true; // Indicate successful deletion
    } else {
        throw new Error('Item not found');
    }
};

// Helper function to generate random auction end time
export const generateRandomEndTime = () => {
    const now = new Date().getTime();
    const minDuration = 60 * 60 * 1000; // 1 hour
    const maxDuration = 48 * 60 * 60 * 1000; // 48 hours
    const randomDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
    return new Date(now + randomDuration);
};