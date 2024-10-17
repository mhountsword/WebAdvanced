import statusCodes from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10; // Number of salting rounds for bcrypt
let user_id = 1; // Start user ID after the admin user

// Sample user data with a default admin user and a regular user
const users = [
    {
        username: 'admin',
        email: 'admin@admin',
        hash: '$2a$10$gdtVhj.WfVCVkZbf65wHEup/ZijaBbjZ9B6O3ihG6ncBpnjFGkcYe', // Pre-hashed password for 'admin'
        user_role: 'admin',
        user_id: '0',
        won_auctions: []
    },
    {
        username: 'bobRegular',
        email: 'bob@email.com',
        hash: '$2a$10$xs9pZ5U93a9.q8LaSVXmuOl8ghv/.znZ90b0gCLQ4b/YKGYlgmBzG', // Pre-hashed password
        user_role: 'user',
        user_id: '1',
        won_auctions: []
    }
];

// Register a new user
export const registerNewUser = async (req, res) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;

        // Validate passwords match
        if (password !== passwordConfirm) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Passwords do not match!' });
        }

        // Validate required fields are filled
        if (!username || !email || !password) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Please fill in all forms!' });
        }

        // Check if the email or username already exists
        if (users.find(user => user.email === email) || users.find(user => user.username === username)) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Username or email already exists!' });
        }

        // Hash the password before storing it
        const hash = await bcrypt.hash(password, saltRounds);

        user_id++;
        // Add the new user to the array
        users.push({
            username,
            email,
            hash,
            user_role: 'user',
            user_id: user_id.toString(),
            won_auctions: [] // Initialize with an empty won_auctions array
        });

        console.log(`User ${username} registered successfully!`);
        console.log(users);

        return res.status(statusCodes.OK).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong during registration!' });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (users.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'No users found. Please register.' });
        }

        // Find user by username
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'Invalid username or password.' });
        }

        // Compare entered password with hashed password
        const match = await bcrypt.compare(password, user.hash);
        if (!match) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'Invalid username or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.user_id, username: user.username, userRole: user.user_role },
            'secret-key',
            { expiresIn: '2h' } // Token expiration of 2 hours
        );

        return res.status(statusCodes.OK).json({ message: 'User logged in successfully!', token });
    } catch (error) {
        console.error(error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Login failed due to server error.' });
    }
};

// Logout a user
export const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret-key'); // Validate token

        return res.status(statusCodes.OK).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Logout failed' });
    }
};

// Helper function to get a user by username
export const getUserByUsername = async (username) => {
    return users.find(user => user.username === username);
};

// Helper function to update a user's data
export const updateUser = async (username, updatedData) => {
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData }; // Merge old and new data
        console.log(`User ${username} updated:`, users[userIndex]);
        return users[userIndex];
    } else {
        throw new Error('User not found');
    }
};
