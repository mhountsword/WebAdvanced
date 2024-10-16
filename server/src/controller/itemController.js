import statusCodes from 'http-status-codes';
let itemId = 3; //this is highest itemId goes by default, so we start at 3
let items = [
    { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', genre: 'Rock', release_year: 2002, id: 1, bids: [] },
    { title: 'Nevermind', artist: 'Nirvana', genre: 'Rock', release_year: 1991, id: 2, bids: []  },
    { title: 'Blonde', artist: 'Frank Ocean', genre: 'R&B', release_year: 2016, id: 3, bids: []  }
];

//items
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
        console.log(req.body);
        // Validation
        if (!newItem.title || !newItem.artist || !newItem.genre) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
        }
        itemId++;
        newItem.id = itemId;
        newItem.bids = [];
        items.push(newItem);

        res.status(statusCodes.CREATED).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add item' });
    }
};

export const editItem = (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    console.log(id);
    // Find the item by its id
    const itemIndex = items.findIndex(item => item.id == id); //type coercion is fine, as id is stored as "2" in array, and is compared to 2, so === will return false
    console.log(itemIndex);
    if (itemIndex !== -1) {
        // Update the item
        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
        res.status(statusCodes.OK).json({ message: 'Item updated successfully', item: items[itemIndex] });
    } else {
        res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
};

export const deleteItem = (req, res) => {
    const { id } = req.params;

    // Find the item by id and filter it out
    const initialLength = items.length;
    items = items.filter(item => item.id != id);

    if (items.length < initialLength) { // To check if its actually been deleted
        res.status(statusCodes.OK).json({ message: 'Item deleted successfully' });
    } else {
        res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
};

//bids
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

    if (!newBid.amount) {
        console.log(newBid.username);
        return res.status(statusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
    }

    const item = items.find(item => item.id == id);
    if (item) {
        item.bids.push(newBid);
        return res.status(statusCodes.CREATED).json(newBid);
    } else {
        console.log("Not found");
        return res.status(statusCodes.NOT_FOUND).json({ message: 'Item not found' });
    }
};

