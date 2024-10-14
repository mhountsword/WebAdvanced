import statusCodes from 'http-status-codes';
let itemId = 3; //as 3 is the highest itemId by default, this starts at 3 and increases every time an item is added
const items = [
    { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', genre: 'Rock', release_date: '', item_id: '1' },
    { title: 'Nevermind', artist: 'Nirvana', genre: 'Rock', release_date: '', item_id: '2'},
    { title: 'Blonde', artist: 'Frank Ocean', genre: 'R&B', release_date: '', item_id: '3'}
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
        itemId++;
        newItem.item_id = itemId;
        items.push(newItem);

        res.status(statusCodes.CREATED).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add item' });
    }
};