import statusCodes from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10; //salting rounds for bcrypt
let user_id = 1;
const users = [
    {
    //admin
        username: 'admin',
        email: 'admin@admin',
        hash: '$2a$10$gdtVhj.WfVCVkZbf65wHEup/ZijaBbjZ9B6O3ihG6ncBpnjFGkcYe', //already hashed for continuity's sake
        user_role: 'admin',
        user_id: '0'
    },
    {
        username: 'bobRegular',
        email: 'bob@email.com',
        hash: '$2a$10$xs9pZ5U93a9.q8LaSVXmuOl8ghv/.znZ90b0gCLQ4b/YKGYlgmBzG',
        user_role: 'user',
        user_id: '1'
    }
];
export const registerNewUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const hash = await bcrypt.hash(password, saltRounds);

        //TODO encryption & checks & robust logging
        if(!username || !email || !password) {
            return res.status(statusCodes.BAD_REQUEST);
        }

        if(users.find(user => user.email === email) || users.find(user => user.username === username)){
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'username / email already exists!'});
        }

        user_id++;
        users.push({email: email, hash: hash, user_id: user_id, user_role: 'user', username: username})

        console.log("User ",username, " pushed to array")
        console.log(users);

        return res.status(statusCodes.OK).json({ message: 'User registered successfully!'});
    } catch(error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong!'});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        if(users.length === 0){
            console.log("no users");
            return res.status(statusCodes.NOT_FOUND).json({message: 'No users found. Please register.'});
        }

        const user = users.find(user => user.username === username);
        if(!user){
            return res.status(statusCodes.NOT_FOUND).json({message: 'Invalid username / password.'});
        }

        const match = await bcrypt.compare(password, user.hash);
        if(!match){
            return res.status(statusCodes.NOT_FOUND).json({message: 'Invalid username / password.'});
        }
        //if everything is okay
        console.log("User logged in.");
        const token = jwt.sign(
            { userId: user.user_id, username: user.username, userRole: user.user_role },
            'secret-key',
            { expiresIn: '2h' } // token expiration: 2 hours
        );
        return res.status(statusCodes.OK).json({ message: 'User logged in successfully!', token: token});
    } catch(error) {
        console.log(error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: 'Invalid username / password.'});
    }
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret-key');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed' });
    }
}
