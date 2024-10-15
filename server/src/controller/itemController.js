import statusCodes from 'http-status-codes';
let itemId = 3; //this is highest itemId goes by default, so we start at 3
const items = [
    { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', genre: 'Rock', release_year: 2002, id: 1 },
    { title: 'Nevermind', artist: 'Nirvana', genre: 'Rock', release_year: 1991, id: 2  },
    { title: 'Blonde', artist: 'Frank Ocean', genre: 'R&B', release_year: 2016, id: 3  }
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
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
        }
        itemId++;
        newItem.id = itemId;
        items.push(newItem);

        res.status(statusCodes.CREATED).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add item' });
    }
};