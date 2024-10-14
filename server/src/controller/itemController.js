import statusCodes from 'http-status-codes';

const items = [
    { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', image: '...', genre: 'Rock' },
    { title: 'Nevermind', artist: 'Nirvana', image: '...', genre: 'Rock' },
    { title: 'Blonde', artist: 'Frank Ocean', image: '...', genre: 'R&B' }
];

export const getItems = (req, res) => {
    try {
        return res.status(statusCodes.OK).json(items);
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve items' });
    }
};

export const addItem = (req, res) => {
    try {
        const newItem = req.body;

        // Validation
        if (!newItem.title || !newItem.artist || !newItem.genre) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        items.push(newItem);

        res.status(statusCodes.CREATED).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add item' });
    }
};